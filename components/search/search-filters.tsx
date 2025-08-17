"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { filterOptions } from "@/lib/search-data"
import type { SearchFilters } from "@/lib/search-utils"
import { Filter, X } from "lucide-react"

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export function SearchFiltersComponent({ filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (category: keyof SearchFilters, value: string, checked: boolean) => {
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
      type: [],
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
    category: keyof SearchFilters
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
                  onClick={() => updateFilter(category as keyof SearchFilters, value, false)}
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

        <FilterSection title="Type" options={filterOptions.type} category="type" />
        <Separator />
        <FilterSection title="Sectors" options={filterOptions.sectors} category="sectors" />
        <Separator />
        <FilterSection title="Stage" options={filterOptions.stage} category="stage" />
        <Separator />
        <FilterSection title="Department" options={filterOptions.department} category="department" />
        <Separator />
        <FilterSection title="Categorization" options={filterOptions.categorization} category="categorization" />
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
            <SheetTitle>Search Filters</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full mt-6">
            <div className="space-y-6 pr-4">
              <FilterSection title="Type" options={filterOptions.type} category="type" />
              <Separator />
              <FilterSection title="Sectors" options={filterOptions.sectors} category="sectors" />
              <Separator />
              <FilterSection title="Stage" options={filterOptions.stage} category="stage" />
              <Separator />
              <FilterSection title="Department" options={filterOptions.department} category="department" />
              <Separator />
              <FilterSection title="Categorization" options={filterOptions.categorization} category="categorization" />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
