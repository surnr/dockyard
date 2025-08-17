"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Target, Clock, TrendingUp, BookOpen, Star } from "lucide-react"

interface QuickFilter {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  filters: Record<string, string[]>
  color: string
}

interface QuickFiltersProps {
  onApplyFilter: (filters: Record<string, string[]>) => void
  activeFilters: Record<string, string[]>
}

export function QuickFilters({ onApplyFilter, activeFilters }: QuickFiltersProps) {
  const quickFilters: QuickFilter[] = [
    {
      id: "high-frequency",
      label: "High Frequency",
      description: "Questions that appear frequently in JEE",
      icon: TrendingUp,
      filters: { subjects: ["Physics", "Chemistry", "Mathematics"] },
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "easy-start",
      label: "Easy Start",
      description: "Perfect for building confidence",
      icon: Star,
      filters: { difficulties: ["Easy"] },
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      id: "quick-solve",
      label: "Quick Solve",
      description: "Questions solved in 2-3 minutes",
      icon: Clock,
      filters: { subjects: ["Mathematics"] },
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    {
      id: "jee-main-focus",
      label: "JEE Main Focus",
      description: "Essential questions for JEE Main",
      icon: Target,
      filters: { examTypes: ["JEE Main"] },
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      id: "advanced-challenge",
      label: "Advanced Challenge",
      description: "Tough questions for JEE Advanced",
      icon: Zap,
      filters: { examTypes: ["JEE Advanced"], difficulties: ["Hard"] },
      color: "bg-red-100 text-red-700 border-red-200",
    },
    {
      id: "revision-mode",
      label: "Revision Mode",
      description: "Previously attempted questions",
      icon: BookOpen,
      filters: { status: ["correct", "incorrect"] },
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    },
  ]

  const isFilterActive = (filter: QuickFilter) => {
    return Object.entries(filter.filters).some(([key, values]) => {
      const activeValues = activeFilters[key] || []
      return values.some((value) => activeValues.includes(value))
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Quick Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {quickFilters.map((filter) => {
              const Icon = filter.icon
              const active = isFilterActive(filter)
              return (
                <Button
                  key={filter.id}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => onApplyFilter(filter.filters)}
                  className={cn(
                    "h-auto p-2 flex flex-col items-center gap-1 text-center min-h-[60px]",
                    !active && filter.color,
                  )}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" />
                  <div className="space-y-0.5 min-w-0 w-full">
                    <div className="text-xs font-medium leading-tight truncate">{filter.label}</div>
                    <div className="text-xs opacity-75 leading-tight line-clamp-2 hidden sm:block">
                      {filter.description}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
