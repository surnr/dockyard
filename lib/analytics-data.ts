export interface PlatformMetrics {
  totalUsers: number
  activeUsers: number
  newRegistrations: number
  totalProjects: number
  activeProjects: number
  totalEvents: number
  upcomingEvents: number
  supportTickets: number
  resolvedTickets: number
  searchQueries: number
  applicationSubmissions: number
  eventBookings: number
}

export interface UserEngagementData {
  date: string
  pageViews: number
  uniqueVisitors: number
  avgSessionDuration: number
  bounceRate: number
}

export interface RegionalData {
  district: string
  users: number
  startups: number
  events: number
  applications: number
}

export interface CategoryData {
  category: string
  count: number
  growth: number
}

export interface TimeSeriesData {
  date: string
  users: number
  projects: number
  events: number
  applications: number
}

export const platformMetrics: PlatformMetrics = {
  totalUsers: 12847,
  activeUsers: 8934,
  newRegistrations: 234,
  totalProjects: 456,
  activeProjects: 342,
  totalEvents: 89,
  upcomingEvents: 23,
  supportTickets: 156,
  resolvedTickets: 134,
  searchQueries: 45678,
  applicationSubmissions: 1234,
  eventBookings: 567,
}

export const userEngagementData: UserEngagementData[] = [
  { date: "2024-01-01", pageViews: 2340, uniqueVisitors: 1890, avgSessionDuration: 4.2, bounceRate: 32.1 },
  { date: "2024-01-02", pageViews: 2567, uniqueVisitors: 2034, avgSessionDuration: 4.8, bounceRate: 28.5 },
  { date: "2024-01-03", pageViews: 2890, uniqueVisitors: 2234, avgSessionDuration: 5.1, bounceRate: 25.3 },
  { date: "2024-01-04", pageViews: 3123, uniqueVisitors: 2456, avgSessionDuration: 5.4, bounceRate: 23.7 },
  { date: "2024-01-05", pageViews: 2987, uniqueVisitors: 2345, avgSessionDuration: 5.2, bounceRate: 24.8 },
  { date: "2024-01-06", pageViews: 3456, uniqueVisitors: 2678, avgSessionDuration: 5.8, bounceRate: 21.2 },
  { date: "2024-01-07", pageViews: 3789, uniqueVisitors: 2890, avgSessionDuration: 6.1, bounceRate: 19.5 },
]

export const regionalData: RegionalData[] = [
  { district: "Chennai", users: 3456, startups: 234, events: 45, applications: 567 },
  { district: "Coimbatore", users: 2345, startups: 156, events: 23, applications: 345 },
  { district: "Madurai", users: 1890, startups: 123, events: 18, applications: 234 },
  { district: "Tiruchirappalli", users: 1567, startups: 98, events: 15, applications: 189 },
  { district: "Salem", users: 1234, startups: 87, events: 12, applications: 156 },
  { district: "Tirunelveli", users: 987, startups: 65, events: 9, applications: 123 },
  { district: "Erode", users: 876, startups: 54, events: 8, applications: 98 },
  { district: "Vellore", users: 765, startups: 43, events: 6, applications: 87 },
]

export const sectorData: CategoryData[] = [
  { category: "AI/ML", count: 89, growth: 23.5 },
  { category: "HealthTech", count: 67, growth: 18.2 },
  { category: "FinTech", count: 54, growth: 15.7 },
  { category: "EdTech", count: 43, growth: 12.3 },
  { category: "AgriTech", count: 38, growth: 28.9 },
  { category: "CleanTech", count: 32, growth: 31.2 },
  { category: "E-commerce", count: 29, growth: 8.4 },
  { category: "IoT", count: 25, growth: 19.6 },
]

export const timeSeriesData: TimeSeriesData[] = [
  { date: "2024-01", users: 8500, projects: 320, events: 45, applications: 890 },
  { date: "2024-02", users: 9200, projects: 345, events: 52, applications: 967 },
  { date: "2024-03", users: 9800, projects: 378, events: 48, applications: 1045 },
  { date: "2024-04", users: 10500, projects: 402, events: 56, applications: 1123 },
  { date: "2024-05", users: 11200, projects: 425, events: 61, applications: 1201 },
  { date: "2024-06", users: 11800, projects: 441, events: 58, applications: 1278 },
  { date: "2024-07", users: 12400, projects: 456, events: 63, applications: 1356 },
]

export const eventTypeData = [
  { name: "Workshops", value: 35, color: "#0ea5e9" },
  { name: "Meetups", value: 28, color: "#10b981" },
  { name: "Conferences", value: 20, color: "#f59e0b" },
  { name: "Hackathons", value: 17, color: "#ef4444" },
]

export const applicationStatusData = [
  { name: "Under Review", value: 45, color: "#f59e0b" },
  { name: "Approved", value: 32, color: "#10b981" },
  { name: "Rejected", value: 15, color: "#ef4444" },
  { name: "Pending", value: 8, color: "#6b7280" },
]

export function getGrowthPercentage(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function getTopPerformingDistricts(limit = 5): RegionalData[] {
  return regionalData.sort((a, b) => b.users - a.users).slice(0, limit)
}

export function getGrowingSectors(limit = 5): CategoryData[] {
  return sectorData.sort((a, b) => b.growth - a.growth).slice(0, limit)
}
