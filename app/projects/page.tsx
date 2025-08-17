"use client"

import { useState, useMemo } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { ProjectFiltersComponent, type ProjectFilters } from "@/components/projects/project-filters"
import { ProjectCard } from "@/components/projects/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { projectsData, exportProjectsToCSV, getFundingRangeValue } from "@/lib/projects-data"
import { Search, Grid, List } from "lucide-react"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ProjectFilters>({
    sectors: [],
    categorization: [],
    stage: [],
    department: [],
    location: [],
    fundingRange: [],
  })
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Set<string>>(new Set())

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let results = [...projectsData]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.entity.toLowerCase().includes(query) ||
          project.sectors.some((sector) => sector.toLowerCase().includes(query)) ||
          project.categorization.some((cat) => cat.toLowerCase().includes(query)),
      )
    }

    // Apply filters
    if (filters.sectors.length > 0) {
      results = results.filter((project) => project.sectors.some((sector) => filters.sectors.includes(sector)))
    }

    if (filters.categorization.length > 0) {
      results = results.filter((project) => project.categorization.some((cat) => filters.categorization.includes(cat)))
    }

    if (filters.stage.length > 0) {
      results = results.filter((project) => project.stage.some((stage) => filters.stage.includes(stage)))
    }

    if (filters.department.length > 0) {
      results = results.filter((project) => filters.department.includes(project.department))
    }

    if (filters.location.length > 0) {
      results = results.filter((project) => project.location.some((loc) => filters.location.includes(loc)))
    }

    if (filters.fundingRange.length > 0) {
      results = results.filter((project) => {
        if (!project.fundingAmount) return false
        const amount = project.fundingAmount.toLowerCase()
        return filters.fundingRange.some((range) => {
          switch (range) {
            case "Under ₹10L":
              return amount.includes("5l") || amount.includes("2l")
            case "₹10L - ₹50L":
              return amount.includes("10l") || amount.includes("25l") || amount.includes("50l")
            case "₹50L - ₹1Cr":
              return amount.includes("75l") || amount.includes("1cr")
            case "₹1Cr - ₹5Cr":
              return amount.includes("1.5cr") || amount.includes("2cr")
            case "Above ₹5Cr":
              return false // No projects in this range in mock data
            default:
              return false
          }
        })
      })
    }

    // Apply sorting
    switch (sortBy) {
      case "popularity":
        results.sort((a, b) => b.popularity - a.popularity)
        break
      case "deadline":
        results.sort((a, b) => {
          if (!a.applicationDeadline && !b.applicationDeadline) return 0
          if (!a.applicationDeadline) return 1
          if (!b.applicationDeadline) return -1
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
        })
        break
      case "funding":
        results.sort((a, b) => {
          const aAmount = getFundingRangeValue(a.fundingAmount || "")
          const bAmount = getFundingRangeValue(b.fundingAmount || "")
          return bAmount - aAmount
        })
        break
      case "recent":
        results.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        break
      case "success_rate":
        results.sort((a, b) => b.successRate - a.successRate)
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    // Update bookmark status
    return results.map((project) => ({
      ...project,
      isBookmarked: bookmarkedProjects.has(project.id),
    }))
  }, [searchQuery, filters, sortBy, bookmarkedProjects])

  const handleBookmark = (projectId: string) => {
    const newBookmarks = new Set(bookmarkedProjects)
    if (newBookmarks.has(projectId)) {
      newBookmarks.delete(projectId)
    } else {
      newBookmarks.add(projectId)
    }
    setBookmarkedProjects(newBookmarks)
  }

  const handleExport = () => {
    exportProjectsToCSV(filteredAndSortedProjects)
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Projects Directory</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover funding opportunities, accelerator programs, and government schemes for startups in Tamil Nadu.
            Filter by sector, stage, and requirements to find the perfect match for your startup.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, programs, or entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <ProjectFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onExport={handleExport}
              resultCount={filteredAndSortedProjects.length}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAndSortedProjects.length} of {projectsData.length} projects
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Projects Grid/List */}
            {filteredAndSortedProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  {searchQuery || Object.values(filters).some((f) => f.length > 0)
                    ? "No projects match your search criteria"
                    : "No projects available"}
                </div>
                {(searchQuery || Object.values(filters).some((f) => f.length > 0)) && (
                  <div className="space-y-2">
                    <p className="text-sm">Try:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Using different keywords</li>
                      <li>• Removing some filters</li>
                      <li>• Checking your spelling</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                {filteredAndSortedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onBookmark={handleBookmark} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
