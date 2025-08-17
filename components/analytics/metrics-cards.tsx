import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type PlatformMetrics, formatNumber } from "@/lib/analytics-data"
import {
  Users,
  FolderOpen,
  Calendar,
  TicketIcon,
  Search,
  FileText,
  UserCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface MetricsCardsProps {
  metrics: PlatformMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: formatNumber(metrics.totalUsers),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: `${formatNumber(metrics.activeUsers)} active users`,
    },
    {
      title: "Active Projects",
      value: formatNumber(metrics.activeProjects),
      change: "+8.3%",
      trend: "up",
      icon: FolderOpen,
      description: `${metrics.totalProjects} total projects`,
    },
    {
      title: "Upcoming Events",
      value: metrics.upcomingEvents.toString(),
      change: "+15.2%",
      trend: "up",
      icon: Calendar,
      description: `${metrics.totalEvents} total events`,
    },
    {
      title: "Support Tickets",
      value: metrics.supportTickets.toString(),
      change: "-5.7%",
      trend: "down",
      icon: TicketIcon,
      description: `${metrics.resolvedTickets} resolved`,
    },
    {
      title: "Search Queries",
      value: formatNumber(metrics.searchQueries),
      change: "+23.1%",
      trend: "up",
      icon: Search,
      description: "Last 30 days",
    },
    {
      title: "Applications",
      value: formatNumber(metrics.applicationSubmissions),
      change: "+18.9%",
      trend: "up",
      icon: FileText,
      description: "This month",
    },
    {
      title: "Event Bookings",
      value: metrics.eventBookings.toString(),
      change: "+11.4%",
      trend: "up",
      icon: UserCheck,
      description: "This month",
    },
    {
      title: "New Registrations",
      value: metrics.newRegistrations.toString(),
      change: "+7.2%",
      trend: "up",
      icon: Users,
      description: "This week",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        const isPositive = card.trend === "up"

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={isPositive ? "default" : "secondary"}
                  className={`text-xs ${
                    isPositive
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
                >
                  {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {card.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
