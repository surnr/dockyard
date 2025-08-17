import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getTopPerformingDistricts, getGrowingSectors } from "@/lib/analytics-data"
import { MapPin, TrendingUp } from "lucide-react"

export function TopPerformers() {
  const topDistricts = getTopPerformingDistricts(5)
  const growingSectors = getGrowingSectors(5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Top Performing Districts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDistricts.map((district, index) => (
              <div key={district.district} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{district.district}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{district.users} users</span>
                </div>
                <Progress value={(district.users / topDistricts[0].users) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{district.startups} startups</span>
                  <span>{district.events} events</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Fastest Growing Sectors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growingSectors.map((sector, index) => (
              <div key={sector.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{sector.category}</span>
                  </div>
                  <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    +{sector.growth.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={(sector.growth / growingSectors[0].growth) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground">{sector.count} startups in this sector</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
