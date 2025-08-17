// Mock data for the search engine - represents the JSON files mentioned in requirements
export interface Project {
  id: string
  name: string
  description: string
  entity: string
  sectors: string[]
  categorization: string[]
  stage: string[]
  department: string
  type: "project"
}

export interface Service {
  id: string
  name: string
  description: string
  provider: string
  sectors: string[]
  type: "service"
}

export interface Startup {
  id: string
  name: string
  description: string
  sector: string
  stage: string
  location: string
  type: "startup"
}

export interface Investor {
  id: string
  name: string
  description: string
  focusAreas: string[]
  ticketSize: string
  type: "investor"
}

export interface Entity {
  id: string
  name: string
  description: string
  category: string
  location: string
  type: "entity"
}

export type SearchResult = Project | Service | Startup | Investor | Entity

// Mock data
export const projects: Project[] = [
  {
    id: "1",
    name: "TANFUND Seed Funding",
    description: "Seed funding program for early-stage startups in Tamil Nadu",
    entity: "TIDCO",
    sectors: ["AI/ML", "HealthTech", "AgriTech"],
    categorization: ["DeepTech", "Rural Impact"],
    stage: ["Ideation", "MVP"],
    department: "IT",
    type: "project",
  },
  {
    id: "2",
    name: "Startup Accelerator Program",
    description: "Comprehensive acceleration program with mentorship and funding",
    entity: "iTNT Hub",
    sectors: ["FinTech", "EdTech", "CleanTech"],
    categorization: ["Climate Action", "Women-Led"],
    stage: ["MVP", "Product Development"],
    department: "MSME",
    type: "project",
  },
  {
    id: "3",
    name: "Rural Innovation Challenge",
    description: "Innovation challenge focused on rural development solutions",
    entity: "TNSCST",
    sectors: ["AgriTech", "Rural Tech"],
    categorization: ["Rural Impact", "Social Impact"],
    stage: ["Ideation", "Prototype"],
    department: "Finance",
    type: "project",
  },
]

export const services: Service[] = [
  {
    id: "1",
    name: "Mentor Connect",
    description: "Connect with experienced mentors in your industry",
    provider: "StartupTN",
    sectors: ["All"],
    type: "service",
  },
  {
    id: "2",
    name: "Legal Advisory",
    description: "Legal support for startup incorporation and compliance",
    provider: "Legal Partners",
    sectors: ["All"],
    type: "service",
  },
]

export const startups: Startup[] = [
  {
    id: "1",
    name: "AgriBot Solutions",
    description: "AI-powered agricultural automation platform",
    sector: "AgriTech",
    stage: "Growth",
    location: "Coimbatore",
    type: "startup",
  },
  {
    id: "2",
    name: "HealthAI Diagnostics",
    description: "AI-based medical diagnostic tools",
    sector: "HealthTech",
    stage: "MVP",
    location: "Chennai",
    type: "startup",
  },
]

export const investors: Investor[] = [
  {
    id: "1",
    name: "Tamil Nadu Seed Fund",
    description: "Government seed funding for early-stage startups",
    focusAreas: ["AI/ML", "HealthTech", "AgriTech"],
    ticketSize: "₹10L - ₹50L",
    type: "investor",
  },
  {
    id: "2",
    name: "Chennai Angels",
    description: "Angel investor network focused on South Indian startups",
    focusAreas: ["FinTech", "EdTech", "SaaS"],
    ticketSize: "₹25L - ₹1Cr",
    type: "investor",
  },
]

export const entities: Entity[] = [
  {
    id: "1",
    name: "iTNT Hub",
    description: "Innovation and Technology Hub of Tamil Nadu",
    category: "Incubator",
    location: "Chennai",
    type: "entity",
  },
  {
    id: "2",
    name: "TIDCO",
    description: "Tamil Nadu Industrial Development Corporation",
    category: "Government",
    location: "Chennai",
    type: "entity",
  },
]

export const allData: SearchResult[] = [...projects, ...services, ...startups, ...investors, ...entities]

// Filter options
export const filterOptions = {
  sectors: ["AI/ML", "HealthTech", "AgriTech", "FinTech", "EdTech", "CleanTech", "Rural Tech"],
  categorization: ["DeepTech", "Climate Action", "Rural Impact", "Women-Led", "Social Impact"],
  stage: ["Ideation", "MVP", "Product Development", "Growth", "Prototype"],
  department: ["IT", "MSME", "TIDCO", "Finance", "TNSCST"],
  type: ["project", "service", "startup", "investor", "entity"],
}
