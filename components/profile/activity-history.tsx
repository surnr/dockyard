import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityLog } from "@/lib/profile-data"
import { Search, FileText, Users, Calendar, HeadphonesIcon, Clock } from "lucide-react"

interface ActivityHistoryProps {
  activities: ActivityLog[]
}

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "search":
        return <Search className="h-4 w-4" />
      case "application":
        return <FileText className="h-4 w-4" />
      case "connection":
        return <Users className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "support":
        return <HeadphonesIcon className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "search":
        return "text-blue-600 bg-blue-100"
      case "application":
        return "text-green-600 bg-green-100"
      case "connection":
        return "text-purple-600 bg-purple-100"
      case "event":
        return "text-orange-600 bg-orange-100"
      case "support":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity History
        </CardTitle>
        <CardDescription>Your recent platform activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
