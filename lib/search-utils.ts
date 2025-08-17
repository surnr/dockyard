import Fuse from "fuse.js"
import { type SearchResult, allData } from "./search-data"

// Fuse.js configuration for intelligent search
const fuseOptions = {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "sectors", weight: 0.2 },
    { name: "categorization", weight: 0.1 },
    { name: "focusAreas", weight: 0.2 },
    { name: "entity", weight: 0.1 },
    { name: "provider", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
}

const fuse = new Fuse(allData, fuseOptions)

export interface SearchFilters {
  sectors: string[]
  categorization: string[]
  stage: string[]
  department: string[]
  type: string[]
}

export interface SearchIntent {
  funding: boolean
  sector: string[]
  stage: string[]
  geography: string[]
  type: string[]
}

// Analyze search intent from natural language query
export function analyzeIntent(query: string): SearchIntent {
  const lowerQuery = query.toLowerCase()

  const intent: SearchIntent = {
    funding: false,
    sector: [],
    stage: [],
    geography: [],
    type: [],
  }

  // Detect funding intent
  if (
    lowerQuery.includes("funding") ||
    lowerQuery.includes("investment") ||
    lowerQuery.includes("seed") ||
    lowerQuery.includes("venture")
  ) {
    intent.funding = true
  }

  // Detect sectors
  const sectorKeywords = {
    ai: ["AI/ML"],
    "artificial intelligence": ["AI/ML"],
    "machine learning": ["AI/ML"],
    health: ["HealthTech"],
    medical: ["HealthTech"],
    agriculture: ["AgriTech"],
    farming: ["AgriTech"],
    fintech: ["FinTech"],
    finance: ["FinTech"],
    education: ["EdTech"],
    learning: ["EdTech"],
    clean: ["CleanTech"],
    green: ["CleanTech"],
    rural: ["Rural Tech"],
  }

  Object.entries(sectorKeywords).forEach(([keyword, sectors]) => {
    if (lowerQuery.includes(keyword)) {
      intent.sector.push(...sectors)
    }
  })

  // Detect stages
  const stageKeywords = {
    idea: ["Ideation"],
    early: ["Ideation", "MVP"],
    mvp: ["MVP"],
    prototype: ["MVP", "Product Development"],
    growth: ["Growth"],
    scale: ["Growth"],
  }

  Object.entries(stageKeywords).forEach(([keyword, stages]) => {
    if (lowerQuery.includes(keyword)) {
      intent.stage.push(...stages)
    }
  })

  // Detect geography
  const geoKeywords = ["chennai", "coimbatore", "madurai", "salem", "trichy", "tamil nadu"]
  geoKeywords.forEach((geo) => {
    if (lowerQuery.includes(geo)) {
      intent.geography.push(geo)
    }
  })

  return intent
}

// Generate step-by-step action plan based on search results
export function generateActionPlan(query: string, results: SearchResult[]): string[] {
  const intent = analyzeIntent(query)
  const actions: string[] = []

  if (intent.funding && results.some((r) => r.type === "project" || r.type === "investor")) {
    actions.push("1. Review funding programs and eligibility criteria")
    actions.push("2. Prepare your pitch deck and business plan")
    actions.push("3. Apply to relevant funding programs")
    actions.push("4. Connect with mentors for guidance")
  }

  if (results.some((r) => r.type === "service")) {
    actions.push("1. Explore available services and support")
    actions.push("2. Book consultation sessions")
  }

  if (results.some((r) => r.type === "startup")) {
    actions.push("1. Connect with similar startups for collaboration")
    actions.push("2. Join relevant startup communities")
  }

  if (actions.length === 0) {
    actions.push("1. Explore the search results below")
    actions.push("2. Contact relevant entities for more information")
    actions.push("3. Create a support ticket for personalized assistance")
  }

  return actions
}

// Perform intelligent search with filters
export function performSearch(query: string, filters: SearchFilters) {
  let results: SearchResult[] = []

  if (query.trim()) {
    // Use Fuse.js for fuzzy search
    const fuseResults = fuse.search(query)
    results = fuseResults.map((result) => result.item)
  } else {
    // If no query, return all data
    results = [...allData]
  }

  // Apply filters
  if (filters.type.length > 0) {
    results = results.filter((item) => filters.type.includes(item.type))
  }

  if (filters.sectors.length > 0) {
    results = results.filter((item) => {
      if ("sectors" in item) return item.sectors.some((s) => filters.sectors.includes(s))
      if ("sector" in item) return filters.sectors.includes(item.sector)
      if ("focusAreas" in item) return item.focusAreas.some((s) => filters.sectors.includes(s))
      return false
    })
  }

  if (filters.stage.length > 0) {
    results = results.filter((item) => {
      if ("stage" in item && Array.isArray(item.stage)) return item.stage.some((s) => filters.stage.includes(s))
      if ("stage" in item && typeof item.stage === "string") return filters.stage.includes(item.stage)
      return false
    })
  }

  if (filters.department.length > 0) {
    results = results.filter((item) => {
      if ("department" in item) return filters.department.includes(item.department)
      return false
    })
  }

  if (filters.categorization.length > 0) {
    results = results.filter((item) => {
      if ("categorization" in item) return item.categorization.some((c) => filters.categorization.includes(c))
      return false
    })
  }

  return results
}

// Generate search suggestions
export function generateSuggestions(query: string): string[] {
  const suggestions = [
    "Seed funding for AI startups in Chennai",
    "AgriTech accelerator programs",
    "HealthTech mentorship opportunities",
    "Early stage funding in Tamil Nadu",
    "Rural innovation challenges",
    "Women-led startup programs",
    "CleanTech investment opportunities",
    "EdTech incubation programs",
  ]

  if (!query.trim()) return suggestions.slice(0, 4)

  // Filter suggestions based on query
  return suggestions
    .filter(
      (s) =>
        s.toLowerCase().includes(query.toLowerCase()) ||
        query
          .toLowerCase()
          .split(" ")
          .some((word) => s.toLowerCase().includes(word)),
    )
    .slice(0, 4)
}
