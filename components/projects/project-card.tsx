"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectDetails } from "@/lib/projects-data"
import {
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  project: ProjectDetails
  onBookmark: (projectId: string) => void
}

export function ProjectCard({ project, onBookmark }: ProjectCardProps) {
  const getDaysUntilDeadline = () => {
    if (!project.applicationDeadline) return null
    const deadline = new Date(project.applicationDeadline)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilDeadline()
  const isUrgent = daysLeft !== null && daysLeft <= 30 && daysLeft > 0
  const isExpired = daysLeft !== null && daysLeft <= 0

  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={project.entityLogo || "/placeholder.svg?height=48&width=48&query=entity+logo"}
                alt={`${project.entity} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight line-clamp-2">{project.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{project.entity}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onBookmark(project.id)} className="flex-shrink-0">
            {project.isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-4 line-clamp-3 flex-1">{project.shortDescription}</CardDescription>

        {/* Key Information */}
        <div className="space-y-3 mb-4">
          {project.fundingAmount && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium">{project.fundingAmount}</span>
            </div>
          )}

          {project.applicationDeadline && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Deadline: {new Date(project.applicationDeadline).toLocaleDateString()}</span>
              {isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  {daysLeft} days left
                </Badge>
              )}
              {isExpired && (
                <Badge variant="secondary" className="text-xs">
                  Expired
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span>{project.location.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-purple-600" />
            <span>{project.department}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{project.popularity}% popularity</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{project.applicationsCount} applications</span>
          </div>
          <div>
            <span>{project.successRate}% success rate</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.sectors.slice(0, 3).map((sector) => (
            <Badge key={sector} variant="secondary" className="text-xs">
              {sector}
            </Badge>
          ))}
          {project.sectors.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.sectors.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.stage.map((stage) => (
            <Badge key={stage} variant="outline" className="text-xs">
              {stage}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.categorization.map((cat) => (
            <Badge key={cat} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button asChild className="flex-1" disabled={isExpired}>
            <Link href={`/projects/${project.id}`}>{isExpired ? "View Details" : "Apply Now"}</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="bg-transparent">
            <Link href={`/projects/${project.id}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
