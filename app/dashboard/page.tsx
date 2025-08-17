"use client"

import { useState } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { MetricsCards } from "@/components/analytics/metrics-cards"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { RegionalChart } from "@/components/analytics/regional-chart"
import { SectorChart } from "@/components/analytics/sector-chart"
import { GrowthChart } from "@/components/analytics/growth-chart"
import { TopPerformers } from "@/components/analytics/top-performers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { platformMetrics, userEngagementData, regionalData, sectorData, timeSeriesData } from "@/lib/analytics-data"
import { Download, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting analytics data...")
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Analytics Dashboard</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Comprehensive insights into platform performance, user engagement, and ecosystem growth across Tamil
              Nadu's startup landscape.
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="mb-8">
          <MetricsCards metrics={platformMetrics} />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="regional">Regional Analytics</TabsTrigger>
            <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
            <TabsTrigger value="growth">Growth Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <EngagementChart data={userEngagementData} />
              <SectorChart data={sectorData} />
            </div>
            <TopPerformers />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <EngagementChart data={userEngagementData} />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Session Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Session Duration</span>
                      <span className="text-2xl font-bold">5.2 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Bounce Rate</span>
                      <span className="text-2xl font-bold">24.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pages per Session</span>
                      <span className="text-2xl font-bold">3.8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Return Visitor Rate</span>
                      <span className="text-2xl font-bold">68.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { page: "/search", views: 12456, percentage: 32.1 },
                      { page: "/projects", views: 9876, percentage: 25.4 },
                      { page: "/events", views: 7654, percentage: 19.7 },
                      { page: "/profile", views: 5432, percentage: 14.0 },
                      { page: "/support", views: 3210, percentage: 8.3 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{item.page}</div>
                          <div className="text-xs text-muted-foreground">{item.views} views</div>
                        </div>
                        <div className="text-sm font-medium">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalChart data={regionalData} />

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Chennai Metro Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">3,456</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="text-xs text-emerald-600">+15.2% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coimbatore Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">2,345</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="text-xs text-emerald-600">+12.8% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Madurai Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">1,890</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="text-xs text-emerald-600">+18.5% from last month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <SectorChart data={sectorData} />

              <Card>
                <CardHeader>
                  <CardTitle>Sector Growth Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorData.map((sector, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{sector.category}</div>
                          <div className="text-xs text-muted-foreground">{sector.count} startups</div>
                        </div>
                        <div className="text-sm font-medium text-emerald-600">+{sector.growth.toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <GrowthChart data={timeSeriesData} />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">User Growth</span>
                      <span className="text-lg font-bold text-emerald-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Project Growth</span>
                      <span className="text-lg font-bold text-emerald-600">+8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Event Growth</span>
                      <span className="text-lg font-bold text-emerald-600">+15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Application Growth</span>
                      <span className="text-lg font-bold text-emerald-600">+18.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">10K Users Milestone</div>
                        <div className="text-xs text-muted-foreground">Reached in April 2024</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">400+ Projects Listed</div>
                        <div className="text-xs text-muted-foreground">Achieved in June 2024</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">1000+ Applications</div>
                        <div className="text-xs text-muted-foreground">Crossed in July 2024</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
