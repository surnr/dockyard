"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subjects, examTypes, classes, difficulties, questionTypes, years, chapters } from "@/lib/questions-data"
import { X, Filter } from "lucide-react"

export interface QuestionFilters {
  subjects: string[]
  examTypes: string[]
  classes: string[]
  difficulties: string[]
  questionTypes: string[]
  years: number[]
  chapters: string[]
  difficultyRange: [number, number]
  frequencyRange: [number, number]
  timeRange: [number, number]
  status: string[]
}

interface QuestionFiltersProps {
  filters: QuestionFilters
  onFiltersChange: (filters: QuestionFilters) => void
  onClearFilters: () => void
  isCollapsed?: boolean
}

export function QuestionFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
  isCollapsed,
}: QuestionFiltersProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const updateFilter = (key: keyof QuestionFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: keyof QuestionFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const getActiveFiltersCount = () => {
    return (
      filters.subjects.length +
      filters.examTypes.length +
      filters.classes.length +
      filters.difficulties.length +
      filters.questionTypes.length +
      filters.years.length +
      filters.chapters.length +
      filters.status.length
    )
  }

  if (isCollapsed) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            {getActiveFiltersCount() > 0 && <Badge variant="secondary">{getActiveFiltersCount()}</Badge>}
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subject Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Subject</Label>
          <div className="space-y-2">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={filters.subjects.includes(subject)}
                  onCheckedChange={() => toggleArrayFilter("subjects", subject)}
                />
                <Label htmlFor={`subject-${subject}`} className="text-sm">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Exam Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Exam Type</Label>
          <div className="space-y-2">
            {examTypes.map((examType) => (
              <div key={examType} className="flex items-center space-x-2">
                <Checkbox
                  id={`exam-${examType}`}
                  checked={filters.examTypes.includes(examType)}
                  onCheckedChange={() => toggleArrayFilter("examTypes", examType)}
                />
                <Label htmlFor={`exam-${examType}`} className="text-sm">
                  {examType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Class Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Class</Label>
          <div className="flex gap-2">
            {classes.map((cls) => (
              <div key={cls} className="flex items-center space-x-2">
                <Checkbox
                  id={`class-${cls}`}
                  checked={filters.classes.includes(cls)}
                  onCheckedChange={() => toggleArrayFilter("classes", cls)}
                />
                <Label htmlFor={`class-${cls}`} className="text-sm">
                  Class {cls}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Difficulty</Label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={filters.difficulties.includes(difficulty)}
                  onCheckedChange={() => toggleArrayFilter("difficulties", difficulty)}
                />
                <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Question Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Question Type</Label>
          <div className="space-y-2">
            {questionTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.questionTypes.includes(type)}
                  onCheckedChange={() => toggleArrayFilter("questionTypes", type)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Year Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Year</Label>
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                updateFilter("years", [])
              } else {
                const year = Number.parseInt(value)
                toggleArrayFilter("years", year.toString())
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Chapter Filter */}
        {filters.subjects.length === 1 && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Chapter</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {chapters[filters.subjects[0] as keyof typeof chapters]?.map((chapter) => (
                  <div key={chapter} className="flex items-center space-x-2">
                    <Checkbox
                      id={`chapter-${chapter}`}
                      checked={filters.chapters.includes(chapter)}
                      onCheckedChange={() => toggleArrayFilter("chapters", chapter)}
                    />
                    <Label htmlFor={`chapter-${chapter}`} className="text-sm">
                      {chapter}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Status Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Status</Label>
          <div className="space-y-2">
            {["not-attempted", "correct", "incorrect", "bookmarked"].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.status.includes(status)}
                  onCheckedChange={() => toggleArrayFilter("status", status)}
                />
                <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                  {status.replace("-", " ")}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Frequency Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Frequency: {filters.frequencyRange[0]}% - {filters.frequencyRange[1]}%
          </Label>
          <Slider
            value={filters.frequencyRange}
            onValueChange={(value) => updateFilter("frequencyRange", value as [number, number])}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Time Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Time to Solve: {filters.timeRange[0]} - {filters.timeRange[1]} min
          </Label>
          <Slider
            value={filters.timeRange}
            onValueChange={(value) => updateFilter("timeRange", value as [number, number])}
            max={15}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
