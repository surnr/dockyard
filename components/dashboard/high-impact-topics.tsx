import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockFrequencyData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export function HighImpactTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>80/20 High-Impact Topics</CardTitle>
        <CardDescription>Focus on these topics for maximum score improvement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockFrequencyData.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{topic.topic}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Frequency: {topic.frequency}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      topic.difficulty >= 4
                        ? "text-red-500 border-red-200"
                        : topic.difficulty === 3
                          ? "text-amber-500 border-amber-200"
                          : "text-green-500 border-green-200"
                    }`}
                  >
                    Difficulty: {topic.difficulty}/5
                  </Badge>
                </div>
              </div>
              <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(topic.frequency / 30) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
