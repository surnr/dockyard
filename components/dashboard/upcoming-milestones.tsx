import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockUpcomingMilestones } from "@/lib/mock-data"
import { Calendar, Clock, CheckCircle } from "lucide-react"

export function UpcomingMilestones() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Milestones
        </CardTitle>
        <CardDescription>Your learning goals and deadlines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockUpcomingMilestones.map((milestone, index) => (
          <div key={index} className="space-y-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex-1 min-w-0 pr-2">{milestone.title}</h4>
              <Badge
                variant={milestone.daysLeft <= 3 ? "destructive" : milestone.daysLeft <= 7 ? "secondary" : "outline"}
                className="text-xs flex-shrink-0"
              >
                <Clock className="h-3 w-3 mr-1" />
                {milestone.daysLeft} days
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{milestone.progress}%</span>
              </div>
              <Progress value={milestone.progress} className="h-2" />
            </div>

            {milestone.progress === 100 && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>Completed!</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
