"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { subjects, examTypes, classes, difficulties, questionTypes, years } from "@/lib/questions-data"
import { ChevronDown, X } from "lucide-react"
import type { QuestionFilters } from "./question-filters"

interface InlineFiltersProps {
  filters: QuestionFilters
  onFiltersChange: (filters: QuestionFilters) => void
  onClearFilters: () => void
}

export function InlineFilters({ filters, onFiltersChange, onClearFilters }: InlineFiltersProps) {
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
      filters.status.length
    )
  }

  const FilterButton = ({
    title,
    items,
    selectedItems,
    onToggle,
    getDisplayName,
  }: {
    title: string
    items: readonly string[] | readonly number[]
    selectedItems: string[]
    onToggle: (item: string) => void
    getDisplayName?: (item: string | number) => string
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          {title}
          {selectedItems.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
              {selectedItems.length}
            </Badge>
          )}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3" align="start">
        <div className="space-y-2">
          <div className="font-medium text-sm">{title}</div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {items.map((item) => {
              const itemStr = item.toString()
              return (
                <div key={itemStr} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${title}-${itemStr}`}
                    checked={selectedItems.includes(itemStr)}
                    onCheckedChange={() => onToggle(itemStr)}
                    className="h-3 w-3"
                  />
                  <Label htmlFor={`${title}-${itemStr}`} className="text-xs cursor-pointer">
                    {getDisplayName ? getDisplayName(item) : itemStr}
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterButton
        title="Subject"
        items={subjects}
        selectedItems={filters.subjects}
        onToggle={(item) => toggleArrayFilter("subjects", item)}
      />

      <FilterButton
        title="Exam"
        items={examTypes}
        selectedItems={filters.examTypes}
        onToggle={(item) => toggleArrayFilter("examTypes", item)}
      />

      <FilterButton
        title="Class"
        items={classes}
        selectedItems={filters.classes}
        onToggle={(item) => toggleArrayFilter("classes", item)}
        getDisplayName={(item) => `Class ${item}`}
      />

      <FilterButton
        title="Difficulty"
        items={difficulties}
        selectedItems={filters.difficulties}
        onToggle={(item) => toggleArrayFilter("difficulties", item)}
      />

      <FilterButton
        title="Type"
        items={questionTypes}
        selectedItems={filters.questionTypes}
        onToggle={(item) => toggleArrayFilter("questionTypes", item)}
      />

      <FilterButton
        title="Year"
        items={years}
        selectedItems={filters.years}
        onToggle={(item) => toggleArrayFilter("years", item)}
      />

      <FilterButton
        title="Status"
        items={["not-attempted", "correct", "incorrect", "bookmarked"]}
        selectedItems={filters.status}
        onToggle={(item) => toggleArrayFilter("status", item)}
        getDisplayName={(item) => {
          const statusMap: Record<string, string> = {
            "not-attempted": "Not Attempted",
            correct: "Correct",
            incorrect: "Incorrect",
            bookmarked: "Bookmarked",
          }
          return statusMap[item] || item
        }}
      />

      {getActiveFiltersCount() > 0 && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 text-xs text-muted-foreground">
          <X className="h-3 w-3 mr-1" />
          Clear ({getActiveFiltersCount()})
        </Button>
      )}
    </div>
  )
}
