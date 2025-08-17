"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockStudyTimeData } from "@/lib/mock-data"

export function StudyTimeChart() {
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

  return (
    <ChartContainer
      config={{
        physics: {
          label: "Physics",
          color: "hsl(var(--chart-1))",
        },
        chemistry: {
          label: "Chemistry",
          color: "hsl(var(--chart-2))",
        },
        mathematics: {
          label: "Mathematics",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[200px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockStudyTimeData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="hours"
          >
            {mockStudyTimeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
