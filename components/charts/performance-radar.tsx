"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockConceptMasteryData } from "@/lib/mock-data"

export function PerformanceRadar() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Mastery Level",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[250px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={mockConceptMasteryData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" className="text-xs" />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} />
          <Radar
            name="Mastery"
            dataKey="value"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
