"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockConceptMasteryData } from "@/lib/mock-data"

export function ConceptMasteryChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Mastery Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <RadarChart cx="50%" cy="50%" outerRadius="80%" width={500} height={300} data={mockConceptMasteryData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="axis" />
        <PolarRadiusAxis angle={30} domain={[0, 1]} />
        <Radar name="Mastery" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.6} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}
