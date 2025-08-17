import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchResult } from "@/lib/search-data"
import { Building2, DollarSign, FolderOpen, Lightbulb, Users } from "lucide-react"

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const getResultIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FolderOpen className="h-5 w-5" />
      case "service":
        return <Lightbulb className="h-5 w-5" />
      case "startup":
        return <Building2 className="h-5 w-5" />
      case "investor":
        return <DollarSign className="h-5 w-5" />
      case "entity":
        return <Users className="h-5 w-5" />
      default:
        return <FolderOpen className="h-5 w-5" />
    }
  }

  const getResultColor = (type: string) => {
    switch (type) {
      case "project":
        return "text-blue-600"
      case "service":
        return "text-green-600"
      case "startup":
        return "text-purple-600"
      case "investor":
        return "text-orange-600"
      case "entity":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          {query ? `No results found for "${query}"` : "Start typing to search..."}
        </div>
        {query && (
          <div className="space-y-2">
            <p className="text-sm">Try:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Using different keywords</li>
              <li>• Checking your spelling</li>
              <li>• Using more general terms</li>
              <li>• Removing some filters</li>
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Found {results.length} result{results.length !== 1 ? "s" : ""}
        {query && ` for "${query}"`}
      </div>

      <div className="grid gap-4">
        {results.map((result) => (
          <Card key={`${result.type}-${result.id}`} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getResultColor(result.type)}>{getResultIcon(result.type)}</div>
                  <div>
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {result.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="mb-4">{result.description}</CardDescription>

              {/* Type-specific information */}
              <div className="space-y-2 mb-4">
                {"entity" in result && (
                  <div className="text-sm">
                    <span className="font-medium">Entity:</span> {result.entity}
                  </div>
                )}
                {"provider" in result && (
                  <div className="text-sm">
                    <span className="font-medium">Provider:</span> {result.provider}
                  </div>
                )}
                {"location" in result && (
                  <div className="text-sm">
                    <span className="font-medium">Location:</span> {result.location}
                  </div>
                )}
                {"ticketSize" in result && (
                  <div className="text-sm">
                    <span className="font-medium">Ticket Size:</span> {result.ticketSize}
                  </div>
                )}
                {"department" in result && (
                  <div className="text-sm">
                    <span className="font-medium">Department:</span> {result.department}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {"sectors" in result &&
                  result.sectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                {"sector" in result && (
                  <Badge variant="secondary" className="text-xs">
                    {result.sector}
                  </Badge>
                )}
                {"focusAreas" in result &&
                  result.focusAreas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                {"stage" in result &&
                  (Array.isArray(result.stage) ? (
                    result.stage.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {result.stage}
                    </Badge>
                  ))}
                {"categorization" in result &&
                  result.categorization.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm">
                  {result.type === "project"
                    ? "Apply"
                    : result.type === "service"
                      ? "Learn More"
                      : result.type === "startup"
                        ? "Connect"
                        : result.type === "investor"
                          ? "View Details"
                          : "View Profile"}
                </Button>
                <Button variant="outline" size="sm">
                  Bookmark
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
