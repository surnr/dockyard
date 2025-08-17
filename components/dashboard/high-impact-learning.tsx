import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockFrequencyData } from "@/lib/mock-data"
import { Target, TrendingUp, BookOpen } from "lucide-react"

export function HighImpactLearning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          80/20 High-Impact Topics
        </CardTitle>
        <CardDescription>Focus on these topics for maximum score improvement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockFrequencyData.map((topic, index) => (
          <div key={index} className="space-y-3 p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{topic.topic}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {topic.frequency}% frequency
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      topic.difficulty >= 4
                        ? "border-red-200 text-red-700"
                        : topic.difficulty === 3
                          ? "border-yellow-200 text-yellow-700"
                          : "border-green-200 text-green-700"
                    }`}
                  >
                    Level {topic.difficulty}/5
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{topic.yourScore}%</div>
                <div className="text-xs text-muted-foreground">Your Score</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress to Mastery</span>
                <span>{topic.yourScore}%</span>
              </div>
              <Progress value={topic.yourScore} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>+{Math.floor(topic.frequency * 0.8)} potential marks</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Practice
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
