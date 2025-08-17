import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockPerformanceData } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Clock, Target } from "lucide-react"

export function SubjectPerformance() {
  const subjects = [
    {
      name: "Physics",
      data: mockPerformanceData.physics,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      name: "Chemistry",
      data: mockPerformanceData.chemistry,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      name: "Mathematics",
      data: mockPerformanceData.mathematics,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>Your progress across all JEE subjects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${subject.color}`} />
                <span className="font-medium">{subject.name}</span>
                <Badge variant="outline" className="text-xs">
                  {subject.data.accuracy}% accuracy
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">
                  {subject.data.score}/{subject.data.total}
                </span>
                {subject.data.improvement > 0 ? (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />+{subject.data.improvement}%
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {subject.data.improvement}%
                  </Badge>
                )}
              </div>
            </div>

            <Progress value={subject.data.score} className="h-2" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {subject.data.timeSpent}h this week
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {subject.data.strongTopics.length} strong topics
                </span>
              </div>
              <span>{subject.data.weakTopics.length} areas to improve</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
