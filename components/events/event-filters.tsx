"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { eventFilterOptions } from "@/lib/events-data"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"

export interface EventFilters {
  type: string[]
  district: string[]
  sector: string[]
  price: string[]
  dateRange: {
    from?: Date
    to?: Date
  }
}

interface EventFiltersProps {
  filters: EventFilters
  onFiltersChange: (filters: EventFilters) => void
  sortBy: string
  onSortChange: (sort: string) => void
  resultCount: number
}

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "popularity", label: "Popularity" },
  { value: "price", label: "Price" },
  { value: "capacity", label: "Capacity" },
  { value: "recent", label: "Recently Added" },
]

export function EventFiltersComponent({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  resultCount,
}: EventFiltersProps) {
  const updateFilter = (category: keyof Omit<EventFilters, "dateRange">, value: string, checked: boolean) => {
    const newFilters = { ...filters }
    if (checked) {
      newFilters[category] = [...newFilters[category], value]
    } else {
      newFilters[category] = newFilters[category].filter((item) => item !== value)
    }
    onFiltersChange(newFilters)
  }

  const updateDateRange = (range: { from?: Date; to?: Date }) => {
    onFiltersChange({
      ...filters,
      dateRange: range,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      type: [],
      district: [],
      sector: [],
      price: [],
      dateRange: {},
    })
  }

  const getActiveFilterCount = () => {
    const basicFilters = Object.values(filters)
      .filter((f) => Array.isArray(f))
      .reduce((count, filterArray) => count + filterArray.length, 0)
    const dateFilters = filters.dateRange.from || filters.dateRange.to ? 1 : 0
    return basicFilters + dateFilters
  }

  const FilterSection = ({
    title,
    options,
    category,
  }: {
    title: string
    options: string[]
    category: keyof Omit<EventFilters, "dateRange">
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
            <Label htmlFor={`${category}-${option}`} className="text-sm capitalize">
              {option.replace("_", " ")}
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
            {resultCount} event{resultCount !== 1 ? "s" : ""} found
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
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {Object.entries(filters).map(([category, values]) => {
            if (category === "dateRange") {
              if (filters.dateRange.from || filters.dateRange.to) {
                const dateText =
                  filters.dateRange.from && filters.dateRange.to
                    ? `${format(filters.dateRange.from, "MMM dd")} - ${format(filters.dateRange.to, "MMM dd")}`
                    : filters.dateRange.from
                      ? `From ${format(filters.dateRange.from, "MMM dd")}`
                      : filters.dateRange.to
                        ? `Until ${format(filters.dateRange.to, "MMM dd")}`
                        : ""
                return (
                  <Badge key="dateRange" variant="secondary" className="gap-1">
                    {dateText}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateDateRange({})} />
                  </Badge>
                )
              }
              return null
            }
            return (values as string[]).map((value) => (
              <Badge key={`${category}-${value}`} variant="secondary" className="gap-1">
                {value.replace("_", " ")}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter(category as keyof Omit<EventFilters, "dateRange">, value, false)}
                />
              </Badge>
            ))
          })}
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

        {/* Date Range Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Date Range</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange}
                onSelect={(range) => updateDateRange(range || {})}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator />
        <FilterSection title="Event Type" options={eventFilterOptions.type} category="type" />
        <Separator />
        <FilterSection title="Location" options={eventFilterOptions.district} category="district" />
        <Separator />
        <FilterSection title="Sector" options={eventFilterOptions.sector} category="sector" />
        <Separator />
        <FilterSection title="Price" options={eventFilterOptions.price} category="price" />
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
            <SheetTitle>Event Filters</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full mt-6">
            <div className="space-y-6 pr-4">
              {/* Mobile Date Range */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Date Range</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.from ? (
                        filters.dateRange.to ? (
                          <>
                            {format(filters.dateRange.from, "MMM dd")} - {format(filters.dateRange.to, "MMM dd")}
                          </>
                        ) : (
                          format(filters.dateRange.from, "MMM dd")
                        )
                      ) : (
                        <span>Pick dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={filters.dateRange.from}
                      selected={filters.dateRange}
                      onSelect={(range) => updateDateRange(range || {})}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Separator />
              <FilterSection title="Event Type" options={eventFilterOptions.type} category="type" />
              <Separator />
              <FilterSection title="Location" options={eventFilterOptions.district} category="district" />
              <Separator />
              <FilterSection title="Sector" options={eventFilterOptions.sector} category="sector" />
              <Separator />
              <FilterSection title="Price" options={eventFilterOptions.price} category="price" />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
