import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockRecommendedQuestions } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function RecommendedQuestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Questions</CardTitle>
        <CardDescription>Personalized practice based on your performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecommendedQuestions.map((question) => (
            <div key={question.id} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{question.id}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      question.subject === "Physics"
                        ? "bg-blue-100 text-blue-800"
                        : question.subject === "Chemistry"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {question.subject}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{question.topic}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span>Difficulty: {question.difficulty}/5</span>
                  <span>Frequency: {(question.frequency * 100).toFixed(0)}%</span>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <BookOpen className="h-4 w-4 mr-1" />
                Solve
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View More <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
