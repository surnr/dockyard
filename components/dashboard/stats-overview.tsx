import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Clock, Zap } from "lucide-react"
import { mockPredictedScore, mockStudyStreak, mockTimeOptimization } from "@/lib/mock-data"

export function StatsOverview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 h-[140px] flex flex-col justify-between">
        <CardContent className="p-0 flex-1">
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Predicted JEE Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{mockPredictedScore.current}</p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />+{mockPredictedScore.improvement}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {mockPredictedScore.probability}% chance to reach {mockPredictedScore.target}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 h-[140px] flex flex-col justify-between">
        <CardContent className="p-0 flex-1">
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Study Streak</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{mockStudyStreak.current}</p>
                  <Badge variant="outline" className="text-xs">
                    days
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Best: {mockStudyStreak.longest} days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 h-[140px] flex flex-col justify-between">
        <CardContent className="p-0 flex-1">
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Efficient Study Time</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{mockTimeOptimization.efficientHours}h</p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.8h
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{mockTimeOptimization.wastedTime}h wasted today</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 h-[140px] flex flex-col justify-between">
        <CardContent className="p-0 flex-1">
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Weekly Accuracy</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">73%</p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5%
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Above average by 8%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
