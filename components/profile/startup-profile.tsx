import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { StartupUser, Application, SupportTicket, EventBooking } from "@/lib/profile-data"
import { CheckCircle, Clock, FileText, Calendar, TrendingUp, Target, ExternalLink } from "lucide-react"

interface StartupProfileProps {
  user: StartupUser
  applications: Application[]
  tickets: SupportTicket[]
  bookings: EventBooking[]
}

export function StartupProfile({ user, applications, tickets, bookings }: StartupProfileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100"
      case "under_review":
        return "text-yellow-600 bg-yellow-100"
      case "pending":
        return "text-blue-600 bg-blue-100"
      case "rejected":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* STN ID & OneID Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Registration Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">STN ID:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{user.stnId}</span>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">OneID:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{user.oneId}</span>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Founded:</span>
            <span>{user.foundedYear}</span>
          </div>
        </CardContent>
      </Card>

      {/* Growth Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Score
          </CardTitle>
          <CardDescription>Your startup development progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Overall Progress</span>
              <span className="font-bold">{user.growthScore}/100</span>
            </div>
            <Progress value={user.growthScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Completed Milestones:</h4>
            <div className="space-y-1">
              {user.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Status */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Application Status
          </CardTitle>
          <CardDescription>Track your program applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{app.programName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Applied: {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(app.status)} variant="secondary">
                    {app.status.replace("_", " ")}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Next Actions
          </CardTitle>
          <CardDescription>Recommended steps for growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user.nextActions.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Support Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.slice(0, 3).map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 border rounded">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{ticket.subject}</p>
                  <p className="text-xs text-muted-foreground">{new Date(ticket.createdDate).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {ticket.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View All Tickets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Event Bookings */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Bookings
          </CardTitle>
          <CardDescription>Your upcoming and past events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{booking.eventName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.date).toLocaleDateString()} • {booking.location}
                  </p>
                </div>
                <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>{booking.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
