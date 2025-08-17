// User profile types and data structures
export type UserType = "startup" | "aspirant" | "investor" | "mentor"

export interface BaseUser {
  id: string
  name: string
  email: string
  type: UserType
  location: string
  registrationDate: string
  avatar?: string
}

export interface StartupUser extends BaseUser {
  type: "startup"
  stnId: string
  oneId: string
  sector: string
  stage: string
  companyName: string
  foundedYear: number
  teamSize: number
  growthScore: number
  milestones: string[]
  nextActions: string[]
}

export interface AspirantUser extends BaseUser {
  type: "aspirant"
  interests: string[]
  skillLevel: "beginner" | "intermediate" | "advanced"
  completedPrograms: string[]
  learningPath: string[]
}

export interface InvestorUser extends BaseUser {
  type: "investor"
  investmentFocus: string[]
  ticketSize: string
  portfolioSize: number
  activeDeals: number
  totalInvestments: string
}

export interface MentorUser extends BaseUser {
  type: "mentor"
  expertise: string[]
  experience: number
  mentees: number
  sessionsCompleted: number
  availability: "available" | "busy" | "unavailable"
}

export type User = StartupUser | AspirantUser | InvestorUser | MentorUser

export interface Application {
  id: string
  programName: string
  status: "pending" | "under_review" | "approved" | "rejected"
  appliedDate: string
  lastUpdate: string
}

export interface SupportTicket {
  id: string
  subject: string
  status: "open" | "in_progress" | "resolved"
  createdDate: string
  priority: "low" | "medium" | "high"
}

export interface EventBooking {
  id: string
  eventName: string
  date: string
  location: string
  status: "upcoming" | "completed" | "cancelled"
}

export interface ActivityLog {
  id: string
  action: string
  description: string
  timestamp: string
  type: "search" | "application" | "connection" | "event" | "support"
}

// Mock user data - in real app this would come from API/database
export const mockUsers: Record<string, User> = {
  "1": {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@agribot.com",
    type: "startup",
    location: "Coimbatore",
    registrationDate: "2024-01-15",
    stnId: "STN2024001",
    oneId: "ONE2024001",
    sector: "AgriTech",
    stage: "MVP",
    companyName: "AgriBot Solutions",
    foundedYear: 2023,
    teamSize: 8,
    growthScore: 75,
    milestones: ["Incorporated Company", "Built MVP", "First Customer", "Seed Funding Applied"],
    nextActions: ["Complete TANFUND Application", "Connect with AgriTech Mentors", "Attend Demo Day"],
  },
  "2": {
    id: "2",
    name: "Priya Sharma",
    email: "priya@email.com",
    type: "aspirant",
    location: "Chennai",
    registrationDate: "2024-02-20",
    interests: ["HealthTech", "AI/ML", "Social Impact"],
    skillLevel: "intermediate",
    completedPrograms: ["Entrepreneurship Development Program", "Digital Marketing Basics"],
    learningPath: ["Advanced Business Planning", "Funding Strategies", "Product Development"],
  },
  "3": {
    id: "3",
    name: "Arjun Patel",
    email: "arjun@chennaifund.com",
    type: "investor",
    location: "Chennai",
    registrationDate: "2023-11-10",
    investmentFocus: ["FinTech", "EdTech", "SaaS"],
    ticketSize: "₹25L - ₹1Cr",
    portfolioSize: 12,
    activeDeals: 3,
    totalInvestments: "₹8.5Cr",
  },
  "4": {
    id: "4",
    name: "Dr. Meera Nair",
    email: "meera@mentor.com",
    type: "mentor",
    location: "Madurai",
    registrationDate: "2023-08-05",
    expertise: ["Product Strategy", "Go-to-Market", "Team Building"],
    experience: 15,
    mentees: 8,
    sessionsCompleted: 45,
    availability: "available",
  },
}

// Mock data for applications, tickets, bookings, activity
export const mockApplications: Application[] = [
  {
    id: "1",
    programName: "TANFUND Seed Funding",
    status: "under_review",
    appliedDate: "2024-07-15",
    lastUpdate: "2024-08-10",
  },
  {
    id: "2",
    programName: "iTNT Accelerator Program",
    status: "approved",
    appliedDate: "2024-06-20",
    lastUpdate: "2024-07-25",
  },
  {
    id: "3",
    programName: "Rural Innovation Challenge",
    status: "pending",
    appliedDate: "2024-08-01",
    lastUpdate: "2024-08-01",
  },
]

export const mockTickets: SupportTicket[] = [
  {
    id: "1",
    subject: "Help with TANFUND Application",
    status: "in_progress",
    createdDate: "2024-08-05",
    priority: "high",
  },
  {
    id: "2",
    subject: "Profile Update Issue",
    status: "resolved",
    createdDate: "2024-07-28",
    priority: "medium",
  },
]

export const mockBookings: EventBooking[] = [
  {
    id: "1",
    eventName: "AI Startup Meetup",
    date: "2024-09-15",
    location: "Chennai",
    status: "upcoming",
  },
  {
    id: "2",
    eventName: "Funding Workshop",
    date: "2024-08-20",
    location: "Coimbatore",
    status: "completed",
  },
]

export const mockActivity: ActivityLog[] = [
  {
    id: "1",
    action: "Search",
    description: "Searched for 'AI funding opportunities'",
    timestamp: "2024-08-17T10:30:00Z",
    type: "search",
  },
  {
    id: "2",
    action: "Application",
    description: "Applied to TANFUND Seed Funding",
    timestamp: "2024-07-15T14:20:00Z",
    type: "application",
  },
  {
    id: "3",
    action: "Event Booking",
    description: "Booked AI Startup Meetup",
    timestamp: "2024-08-10T09:15:00Z",
    type: "event",
  },
]

// Utility functions
export function getCurrentUser(): User {
  // In real app, this would get current user from auth context
  return mockUsers["1"] // Default to startup user for demo
}

export function getUserApplications(userId: string): Application[] {
  return mockApplications
}

export function getUserTickets(userId: string): SupportTicket[] {
  return mockTickets
}

export function getUserBookings(userId: string): EventBooking[] {
  return mockBookings
}

export function getUserActivity(userId: string): ActivityLog[] {
  return mockActivity
}
