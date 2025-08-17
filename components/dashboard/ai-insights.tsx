import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Lightbulb, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "recommendation",
      icon: Lightbulb,
      title: "Optimize Study Schedule",
      description: "Your peak performance is between 9-11 AM. Schedule difficult topics during this time.",
      action: "Adjust Schedule",
      priority: "high",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Electromagnetism Gap",
      description: "You're 23% below average in Electromagnetism. This topic appears in 22% of JEE questions.",
      action: "Start Practice",
      priority: "urgent",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Algebra Mastery",
      description: "Excellent progress! You've mastered 92% of Algebra concepts. Ready for advanced problems.",
      action: "Take Challenge",
      priority: "low",
    },
    {
      type: "insight",
      icon: Brain,
      title: "Study Pattern Analysis",
      description: "You solve 40% more questions correctly when you take 5-minute breaks every 25 minutes.",
      action: "Learn More",
      priority: "medium",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Learning Insights
        </CardTitle>
        <CardDescription>Personalized recommendations based on your learning patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <insight.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                {insight.action}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
