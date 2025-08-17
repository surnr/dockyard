"use client"

import { useState, useMemo } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchFiltersComponent } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"
import { performSearch, generateActionPlan, generateSuggestions, analyzeIntent } from "@/lib/search-utils"
import type { SearchFilters } from "@/lib/search-utils"
import { Search, Lightbulb, ArrowRight } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    sectors: [],
    categorization: [],
    stage: [],
    department: [],
    type: [],
  })

  // Perform search with debouncing
  const results = useMemo(() => {
    return performSearch(query, filters)
  }, [query, filters])

  // Generate action plan and suggestions
  const actionPlan = useMemo(() => {
    if (query.trim()) {
      return generateActionPlan(query, results)
    }
    return []
  }, [query, results])

  const suggestions = useMemo(() => {
    return generateSuggestions(query)
  }, [query])

  const intent = useMemo(() => {
    if (query.trim()) {
      return analyzeIntent(query)
    }
    return null
  }, [query])

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Search Engine</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find funding, programs, mentors, and opportunities using natural language queries. Ask questions like "Seed
            funding for AI startups in Chennai" or "AgriTech accelerator programs".
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter query (e.g., 'Seed funding for AI startups in Coimbatore')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Try these searches:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Intent Recognition */}
        {intent && query.trim() && (
          <div className="max-w-4xl mx-auto mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Search Intent Detected:</p>
                    <div className="text-sm text-blue-800 space-y-1">
                      {intent.funding && <p>• Looking for funding opportunities</p>}
                      {intent.sector.length > 0 && <p>• Interested in: {intent.sector.join(", ")}</p>}
                      {intent.stage.length > 0 && <p>• Stage: {intent.stage.join(", ")}</p>}
                      {intent.geography.length > 0 && <p>• Location: {intent.geography.join(", ")}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFiltersComponent filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Action Plan */}
            {actionPlan.length > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    Recommended Action Plan
                  </CardTitle>
                  <CardDescription className="text-green-800">
                    Based on your search, here's what we recommend:
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {actionPlan.map((action, index) => (
                      <li key={index} className="text-sm text-green-800">
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            <SearchResults results={results} query={query} />
          </div>
        </div>
      </div>
    </div>
  )
}
