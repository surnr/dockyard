import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockPerformanceData } from "@/lib/mock-data"

export function PerformanceSummary() {
  const { physics, chemistry, mathematics } = mockPerformanceData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>Your current scores across subjects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-blue-500" />
              <span className="font-medium">Physics</span>
            </div>
            <span className="text-sm font-medium">
              {physics.score}/{physics.total}
            </span>
          </div>
          <Progress value={physics.score} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {physics.improvement > 0 ? (
              <span className="text-green-500">↑ {physics.improvement}% improvement</span>
            ) : (
              <span className="text-red-500">↓ {Math.abs(physics.improvement)}% decrease</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="font-medium">Chemistry</span>
            </div>
            <span className="text-sm font-medium">
              {chemistry.score}/{chemistry.total}
            </span>
          </div>
          <Progress value={chemistry.score} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {chemistry.improvement > 0 ? (
              <span className="text-green-500">↑ {chemistry.improvement}% improvement</span>
            ) : (
              <span className="text-red-500">↓ {Math.abs(chemistry.improvement)}% decrease</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-purple-500" />
              <span className="font-medium">Mathematics</span>
            </div>
            <span className="text-sm font-medium">
              {mathematics.score}/{mathematics.total}
            </span>
          </div>
          <Progress value={mathematics.score} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {mathematics.improvement > 0 ? (
              <span className="text-green-500">↑ {mathematics.improvement}% improvement</span>
            ) : (
              <span className="text-red-500">↓ {Math.abs(mathematics.improvement)}% decrease</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
