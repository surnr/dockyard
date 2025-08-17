"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { InlineFilters } from "@/components/questions/inline-filters"
import { QuickFilters } from "@/components/questions/quick-filters"
import { CompactQuestionCard } from "@/components/questions/compact-question-card"
import { MinimalQuestionCard } from "@/components/questions/minimal-question-card"
import { QuestionSolutionDialog } from "@/components/questions/question-solution-dialog"
import { PermissionGuard } from "@/components/permission-guard"
import { UpgradeButton } from "@/components/upgrade-button"
import { useQueryParams } from "@/hooks/use-query-params"
import { mockQuestions, type Question } from "@/lib/questions-data"
import type { QuestionFilters } from "@/components/questions/question-filters"
import { Search, BookOpen, GraduationCap, ArrowUpDown, Download, Filter, Grid, List } from "lucide-react"

const ITEMS_PER_PAGE = 25 // Increased for better density

// Generate more mock questions for pagination demo
const generateMockQuestions = (count: number): Question[] => {
  const baseQuestions = mockQuestions
  const questions: Question[] = []

  for (let i = 0; i < count; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length]
    questions.push({
      ...baseQuestion,
      id: `JEE${2024 - Math.floor(i / 100)}${(i % 1000).toString().padStart(3, "0")}`,
      title: `${baseQuestion.title} (Question ${i + 1})`,
    })
  }

  return questions
}

const allQuestions = generateMockQuestions(1000) // Generate 1000 questions for demo

export default function QuestionsPage() {
  const { updateQuery, getQueryValue, getQueryValues } = useQueryParams()

  // URL-based state management
  const [searchQuery, setSearchQuery] = useState(getQueryValue("search") || "")
  const [currentPage, setCurrentPage] = useState(Number.parseInt(getQueryValue("page") || "1"))
  const [sortBy, setSortBy] = useState(getQueryValue("sort") || "relevance")
  const [viewMode, setViewMode] = useState<"compact" | "minimal">("compact")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([])

  // Filters from URL
  const filters: QuestionFilters = {
    subjects: getQueryValues("subjects"),
    examTypes: getQueryValues("examTypes"),
    classes: getQueryValues("classes"),
    difficulties: getQueryValues("difficulties"),
    questionTypes: getQueryValues("questionTypes"),
    years: getQueryValues("years"),
    chapters: getQueryValues("chapters"),
    status: getQueryValues("status"),
    difficultyRange: [1, 5],
    frequencyRange: [0, 100],
    timeRange: [1, 15],
  }

  // Update URL when filters change
  const updateFilters = (newFilters: QuestionFilters) => {
    updateQuery({
      subjects: newFilters.subjects.length > 0 ? newFilters.subjects : null,
      examTypes: newFilters.examTypes.length > 0 ? newFilters.examTypes : null,
      classes: newFilters.classes.length > 0 ? newFilters.classes : null,
      difficulties: newFilters.difficulties.length > 0 ? newFilters.difficulties : null,
      questionTypes: newFilters.questionTypes.length > 0 ? newFilters.questionTypes : null,
      years: newFilters.years.length > 0 ? newFilters.years : null,
      chapters: newFilters.chapters.length > 0 ? newFilters.chapters : null,
      status: newFilters.status.length > 0 ? newFilters.status : null,
      page: "1", // Reset to first page when filters change
    })
    setCurrentPage(1)
  }

  // Update URL when search changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateQuery({
        search: searchQuery || null,
        page: "1",
      })
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, updateQuery])

  // Update URL when sort changes
  useEffect(() => {
    updateQuery({
      sort: sortBy !== "relevance" ? sortBy : null,
      page: "1",
    })
    setCurrentPage(1)
  }, [sortBy, updateQuery])

  // Update URL when page changes
  useEffect(() => {
    updateQuery({
      page: currentPage > 1 ? currentPage.toString() : null,
    })
  }, [currentPage, updateQuery])

  // Filter and search questions (simulating server-side filtering)
  const { filteredQuestions, totalPages, totalQuestions } = useMemo(() => {
    const filtered = allQuestions.filter((question) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchableText =
          `${question.title} ${question.chapter} ${question.topic} ${question.tags.join(" ")}`.toLowerCase()
        if (!searchableText.includes(query)) return false
      }

      // Apply all filters
      if (filters.subjects.length > 0 && !filters.subjects.includes(question.subject)) return false
      if (filters.examTypes.length > 0 && !filters.examTypes.includes(question.examType)) return false
      if (filters.classes.length > 0 && !filters.classes.includes(question.class)) return false
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(question.difficulty)) return false
      if (filters.questionTypes.length > 0 && !filters.questionTypes.includes(question.questionType)) return false
      if (filters.years.length > 0 && !filters.years.includes(question.year.toString())) return false
      if (filters.status.length > 0) {
        const questionStatus = bookmarkedQuestions.includes(question.id)
          ? "bookmarked"
          : question.status || "not-attempted"
        if (!filters.status.includes(questionStatus)) return false
      }

      return true
    })

    // Sort questions
    switch (sortBy) {
      case "difficulty-asc":
        filtered.sort((a, b) => a.difficultyScore - b.difficultyScore)
        break
      case "difficulty-desc":
        filtered.sort((a, b) => b.difficultyScore - a.difficultyScore)
        break
      case "frequency-desc":
        filtered.sort((a, b) => b.frequency - a.frequency)
        break
      case "year-desc":
        filtered.sort((a, b) => b.year - a.year)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedQuestions = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return {
      filteredQuestions: paginatedQuestions,
      totalPages,
      totalQuestions: filtered.length,
    }
  }, [searchQuery, sortBy, currentPage, bookmarkedQuestions, allQuestions])

  const handleBookmark = (questionId: string) => {
    setBookmarkedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const handleViewDetails = (question: Question) => {
    setSelectedQuestion(question)
    setIsDetailDialogOpen(true)
  }

  const handleQuickFilter = (quickFilters: Record<string, string[]>) => {
    const newFilters = { ...filters }
    Object.entries(quickFilters).forEach(([key, values]) => {
      if (key in newFilters) {
        ;(newFilters as any)[key] = values
      }
    })
    updateFilters(newFilters)
  }

  const clearAllFilters = () => {
    updateQuery({
      subjects: null,
      examTypes: null,
      classes: null,
      difficulties: null,
      questionTypes: null,
      years: null,
      chapters: null,
      status: null,
      search: null,
      sort: null,
      page: null,
    })
    setSearchQuery("")
    setSortBy("relevance")
    setCurrentPage(1)
  }

  const exportQuestions = () => {
    // In a real app, this would trigger a download
    console.log("Exporting questions...")
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterArray) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray.length
      }
      return count
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Jeeify</span>
              </div>
              <Badge variant="secondary" className="hidden sm:flex">
                <BookOpen className="h-3 w-3 mr-1" />
                Questions
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={exportQuestions}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <UpgradeButton variant="outline" size="sm">
                Upgrade to Premium
              </UpgradeButton>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <PermissionGuard requiredPermission="premium_access">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">JEE Question Bank</h1>
              <p className="text-muted-foreground">
                Practice from 1000+ JEE Main & Advanced questions with detailed solutions
              </p>
            </div>

            {/* Quick Filters */}
            <QuickFilters onApplyFilter={handleQuickFilter} activeFilters={filters} />

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Search and Sort Row */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions by topic, chapter, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[200px] h-10">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="difficulty-asc">Difficulty: Easy to Hard</SelectItem>
                        <SelectItem value="difficulty-desc">Difficulty: Hard to Easy</SelectItem>
                        <SelectItem value="frequency-desc">High Frequency First</SelectItem>
                        <SelectItem value="year-desc">Latest First</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode Toggle */}
                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === "compact" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("compact")}
                        className="h-10 px-3 rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "minimal" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("minimal")}
                        className="h-10 px-3 rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Inline Filters */}
                <InlineFilters filters={filters} onFiltersChange={updateFilters} onClearFilters={clearAllFilters} />
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, totalQuestions)}</span> of{" "}
                  <span className="font-medium">{totalQuestions}</span> questions
                </p>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary">
                    <Filter className="h-3 w-3 mr-1" />
                    {getActiveFiltersCount()} filters active
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Questions List */}
            {filteredQuestions.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-medium">No questions found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters to find more questions.
                    </p>
                  </div>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            ) : viewMode === "compact" ? (
              <div className="space-y-3">
                {filteredQuestions.map((question) => (
                  <CompactQuestionCard
                    key={question.id}
                    question={{
                      ...question,
                      isBookmarked: bookmarkedQuestions.includes(question.id),
                    }}
                    onBookmark={handleBookmark}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  {filteredQuestions.map((question) => (
                    <MinimalQuestionCard
                      key={question.id}
                      question={{
                        ...question,
                        isBookmarked: bookmarkedQuestions.includes(question.id),
                      }}
                      onBookmark={handleBookmark}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </PermissionGuard>

        {/* Question Solution Dialog */}
        <QuestionSolutionDialog
          question={selectedQuestion}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          onBookmark={handleBookmark}
        />
      </main>
    </div>
  )
}
