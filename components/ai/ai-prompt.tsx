"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const suggestions = [
  "Find AI/ML funding opportunities",
  "Show me growth stage programs",
  "Connect me with fintech mentors",
  "What are the requirements for TIDCO grants?",
]

export function AIPrompt() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to search with query
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="I am..."
                className="h-14 text-lg pl-4 pr-4 rounded-l-xl border-r-0 focus:ring-0 focus:border-gray-300 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="flex-1 relative">
              <select className="h-14 w-full text-lg px-4 rounded-none border-l-0 border-r-0 focus:ring-0 focus:border-gray-300 bg-gray-50 border-gray-200 appearance-none">
                <option>Looking for...</option>
                <option>Funding</option>
                <option>Mentors</option>
                <option>Programs</option>
                <option>Events</option>
              </select>
            </div>
            <Button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="h-14 px-8 rounded-r-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                "Explore"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
