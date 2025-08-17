"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { projectFilterOptions, sortOptions } from "@/lib/projects-data"
import { Filter, X, Download } from "lucide-react"

export interface ProjectFilters {
  sectors: string[]
  categorization: string[]
  stage: string[]
  department: string[]
  location: string[]
  fundingRange: string[]
}

interface ProjectFiltersProps {
  filters: ProjectFilters
  onFiltersChange: (filters: ProjectFilters) => void
  sortBy: string
  onSortChange: (sort: string) => void
  onExport: () => void
  resultCount: number
}

export function ProjectFiltersComponent({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  onExport,
  resultCount,
}: ProjectFiltersProps) {
  const updateFilter = (category: keyof ProjectFilters, value: string, checked: boolean) => {
    const newFilters = { ...filters }
    if (checked) {
      newFilters[category] = [...newFilters[category], value]
    } else {
      newFilters[category] = newFilters[category].filter((item) => item !== value)
    }
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      sectors: [],
      categorization: [],
      stage: [],
      department: [],
      location: [],
      fundingRange: [],
    })
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0)
  }

  const FilterSection = ({
    title,
    options,
    category,
  }: {
    title: string
    options: string[]
    category: keyof ProjectFilters
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${option}`}
              checked={filters[category].includes(option)}
              onCheckedChange={(checked) => updateFilter(category, option, checked as boolean)}
            />
            <Label htmlFor={`${category}-${option}`} className="text-sm">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {resultCount} project{resultCount !== 1 ? "s" : ""} found
          </div>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onExport} variant="outline" size="sm" className="bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {Object.entries(filters).map(([category, values]) =>
            values.map((value) => (
              <Badge key={`${category}-${value}`} variant="secondary" className="gap-1">
                {value}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter(category as keyof ProjectFilters, value, false)}
                />
              </Badge>
            )),
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          )}
        </div>

        <FilterSection title="Sectors" options={projectFilterOptions.sectors} category="sectors" />
        <Separator />
        <FilterSection title="Stage" options={projectFilterOptions.stage} category="stage" />
        <Separator />
        <FilterSection title="Department" options={projectFilterOptions.department} category="department" />
        <Separator />
        <FilterSection title="Categorization" options={projectFilterOptions.categorization} category="categorization" />
        <Separator />
        <FilterSection title="Location" options={projectFilterOptions.location} category="location" />
        <Separator />
        <FilterSection title="Funding Range" options={projectFilterOptions.fundingRange} category="fundingRange" />
      </div>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" className="w-full bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Project Filters</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full mt-6">
            <div className="space-y-6 pr-4">
              <FilterSection title="Sectors" options={projectFilterOptions.sectors} category="sectors" />
              <Separator />
              <FilterSection title="Stage" options={projectFilterOptions.stage} category="stage" />
              <Separator />
              <FilterSection title="Department" options={projectFilterOptions.department} category="department" />
              <Separator />
              <FilterSection
                title="Categorization"
                options={projectFilterOptions.categorization}
                category="categorization"
              />
              <Separator />
              <FilterSection title="Location" options={projectFilterOptions.location} category="location" />
              <Separator />
              <FilterSection
                title="Funding Range"
                options={projectFilterOptions.fundingRange}
                category="fundingRange"
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
