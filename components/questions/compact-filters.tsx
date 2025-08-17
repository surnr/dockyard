"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { subjects, examTypes, classes, difficulties, questionTypes, years } from "@/lib/questions-data"
import { Filter, X, ChevronDown } from "lucide-react"
import type { QuestionFilters } from "./question-filters"

interface CompactFiltersProps {
  filters: QuestionFilters
  onFiltersChange: (filters: QuestionFilters) => void
  onClearFilters: () => void
}

export function CompactFilters({ filters, onFiltersChange, onClearFilters }: CompactFiltersProps) {
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

  const FilterPopover = ({
    title,
    items,
    selectedItems,
    onToggle,
    colorMap,
  }: {
    title: string
    items: readonly string[]
    selectedItems: string[]
    onToggle: (item: string) => void
    colorMap?: Record<string, string>
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          {title}
          {selectedItems.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {selectedItems.length}
            </Badge>
          )}
          <ChevronDown className="ml-2 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{title}</h4>
          <Separator />
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-${item}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => onToggle(item)}
                />
                <Label htmlFor={`${title}-${item}`} className="text-sm cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-white border rounded-lg">
      <div className="flex items-center gap-2 mr-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <FilterPopover
        title="Subject"
        items={subjects}
        selectedItems={filters.subjects}
        onToggle={(item) => toggleArrayFilter("subjects", item)}
      />

      <FilterPopover
        title="Exam"
        items={examTypes}
        selectedItems={filters.examTypes}
        onToggle={(item) => toggleArrayFilter("examTypes", item)}
      />

      <FilterPopover
        title="Class"
        items={classes.map((c) => `Class ${c}`)}
        selectedItems={filters.classes.map((c) => `Class ${c}`)}
        onToggle={(item) => toggleArrayFilter("classes", item.replace("Class ", ""))}
      />

      <FilterPopover
        title="Difficulty"
        items={difficulties}
        selectedItems={filters.difficulties}
        onToggle={(item) => toggleArrayFilter("difficulties", item)}
      />

      <FilterPopover
        title="Type"
        items={questionTypes}
        selectedItems={filters.questionTypes}
        onToggle={(item) => toggleArrayFilter("questionTypes", item)}
      />

      <FilterPopover
        title="Year"
        items={years.map((y) => y.toString())}
        selectedItems={filters.years}
        onToggle={(item) => toggleArrayFilter("years", item)}
      />

      <FilterPopover
        title="Status"
        items={["Not Attempted", "Correct", "Incorrect", "Bookmarked"]}
        selectedItems={filters.status.map((s) => s.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()))}
        onToggle={(item) =>
          toggleArrayFilter("status", item.toLowerCase().replace(" ", "-").replace("not-attempted", "not-attempted"))
        }
      />

      {getActiveFiltersCount() > 0 && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-9 text-muted-foreground">
            <X className="h-3 w-3 mr-1" />
            Clear All ({getActiveFiltersCount()})
          </Button>
        </>
      )}
    </div>
  )
}
