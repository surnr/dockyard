import { MainNav } from "@/components/navigation/main-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProjectById } from "@/lib/projects-data"
import {
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  ExternalLink,
  CheckCircle,
  Clock,
  Mail,
  Globe,
  FileText,
  Target,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

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
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={project.entityLogo || "/placeholder.svg?height=64&width=64&query=entity+logo"}
                alt={`${project.entity} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{project.entity}</p>
              <div className="flex flex-wrap gap-2">
                {project.categorization.map((cat) => (
                  <Badge key={cat} className="bg-primary/10 text-primary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6">{project.description}</p>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button size="lg" disabled={isExpired}>
              {isExpired ? "Application Closed" : "Apply Now"}
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              Bookmark Project
            </Button>
            {project.website && (
              <Button variant="outline" size="lg" asChild className="bg-transparent">
                <Link href={project.website} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.fundingAmount && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Funding Amount</p>
                        <p className="text-sm text-muted-foreground">{project.fundingAmount}</p>
                      </div>
                    </div>
                  )}

                  {project.applicationDeadline && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Application Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.applicationDeadline).toLocaleDateString()}
                          {isUrgent && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              {daysLeft} days left
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{project.duration || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{project.location.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">{project.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Applications</p>
                      <p className="text-sm text-muted-foreground">{project.applicationsCount} received</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Program Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.applicationProcess.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="pt-1">
                        <span className="text-sm">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.popularity}%</div>
                  <div className="text-sm text-muted-foreground">Popularity Score</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{project.successRate}%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.applicationsCount}</div>
                  <div className="text-sm text-muted-foreground">Total Applications</div>
                </div>
              </CardContent>
            </Card>

            {/* Sectors & Stages */}
            <Card>
              <CardHeader>
                <CardTitle>Sectors & Stages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Target Sectors</p>
                  <div className="flex flex-wrap gap-2">
                    {project.sectors.map((sector) => (
                      <Badge key={sector} variant="secondary" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Startup Stages</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stage.map((stage) => (
                      <Badge key={stage} variant="outline" className="text-xs">
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${project.contactEmail}`} className="text-sm hover:underline">
                      {project.contactEmail}
                    </a>
                  </div>
                )}
                {project.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Last Updated */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
