import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPerformanceData } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"

export function StrengthWeakness() {
  const { physics, chemistry, mathematics } = mockPerformanceData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strengths & Weaknesses</CardTitle>
        <CardDescription>Areas to focus on and your strong points</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="physics">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          </TabsList>
          <TabsContent value="physics" className="space-y-4 pt-4">
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <X className="h-4 w-4 text-red-500 mr-1" /> Weak Topics
              </h4>
              <ul className="space-y-1">
                {physics.weakTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Strong Topics
              </h4>
              <ul className="space-y-1">
                {physics.strongTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="chemistry" className="space-y-4 pt-4">
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <X className="h-4 w-4 text-red-500 mr-1" /> Weak Topics
              </h4>
              <ul className="space-y-1">
                {chemistry.weakTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Strong Topics
              </h4>
              <ul className="space-y-1">
                {chemistry.strongTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="mathematics" className="space-y-4 pt-4">
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <X className="h-4 w-4 text-red-500 mr-1" /> Weak Topics
              </h4>
              <ul className="space-y-1">
                {mathematics.weakTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm flex items-center mb-2">
                <Check className="h-4 w-4 text-green-500 mr-1" /> Strong Topics
              </h4>
              <ul className="space-y-1">
                {mathematics.strongTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
