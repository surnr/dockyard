// Extended project data structure for the projects listing
export interface ProjectDetails {
  id: string
  name: string
  description: string
  shortDescription: string
  entity: string
  entityLogo?: string
  sectors: string[]
  categorization: string[]
  stage: string[]
  department: string
  eligibility: string[]
  fundingAmount?: string
  applicationDeadline?: string
  duration?: string
  location: string[]
  website?: string
  contactEmail?: string
  requirements: string[]
  benefits: string[]
  applicationProcess: string[]
  createdDate: string
  lastUpdated: string
  popularity: number
  applicationsCount: number
  successRate: number
  isBookmarked?: boolean
}

// Mock projects data - comprehensive list
export const projectsData: ProjectDetails[] = [
  {
    id: "1",
    name: "TANFUND Seed Funding",
    description:
      "Comprehensive seed funding program designed to support early-stage startups in Tamil Nadu with financial assistance, mentorship, and market access opportunities.",
    shortDescription: "Seed funding program for early-stage startups in Tamil Nadu",
    entity: "TIDCO",
    entityLogo: "/generic-corporate-logo.png",
    sectors: ["AI/ML", "HealthTech", "AgriTech", "FinTech"],
    categorization: ["DeepTech", "Rural Impact"],
    stage: ["Ideation", "MVP"],
    department: "IT",
    eligibility: ["DPIIT Recognized Startup", "Tamil Nadu Based", "Less than 2 years old"],
    fundingAmount: "₹10L - ₹50L",
    applicationDeadline: "2024-12-31",
    duration: "12 months",
    location: ["Tamil Nadu"],
    website: "https://tanfund.tn.gov.in",
    contactEmail: "support@tanfund.tn.gov.in",
    requirements: ["Business Plan", "Financial Projections", "Team Details", "Product Demo"],
    benefits: ["Seed Funding", "Mentorship", "Market Access", "Networking"],
    applicationProcess: ["Online Application", "Document Verification", "Pitch Presentation", "Due Diligence"],
    createdDate: "2024-01-15",
    lastUpdated: "2024-08-10",
    popularity: 95,
    applicationsCount: 1250,
    successRate: 15,
    isBookmarked: false,
  },
  {
    id: "2",
    name: "iTNT Hub Accelerator Program",
    description:
      "Intensive 6-month acceleration program providing startups with comprehensive support including funding, mentorship, workspace, and market connections.",
    shortDescription: "Comprehensive acceleration program with mentorship and funding",
    entity: "iTNT Hub",
    entityLogo: "/itnt-hub-logo.png",
    sectors: ["FinTech", "EdTech", "CleanTech", "SaaS"],
    categorization: ["Climate Action", "Women-Led"],
    stage: ["MVP", "Product Development"],
    department: "MSME",
    eligibility: ["Scalable Business Model", "Minimum Viable Product", "Committed Team"],
    fundingAmount: "₹25L - ₹1Cr",
    applicationDeadline: "2024-10-15",
    duration: "6 months",
    location: ["Chennai", "Coimbatore"],
    website: "https://itnthub.tn.gov.in",
    contactEmail: "accelerator@itnthub.tn.gov.in",
    requirements: ["MVP Demo", "Market Analysis", "Growth Strategy", "Team Commitment"],
    benefits: ["Funding", "Mentorship", "Workspace", "Market Access", "Demo Day"],
    applicationProcess: ["Application Form", "Initial Screening", "Pitch Day", "Final Selection"],
    createdDate: "2024-02-01",
    lastUpdated: "2024-08-15",
    popularity: 88,
    applicationsCount: 850,
    successRate: 12,
    isBookmarked: true,
  },
  {
    id: "3",
    name: "Rural Innovation Challenge",
    description:
      "Innovation challenge focused on developing technology solutions for rural development, agriculture, and social impact in Tamil Nadu's rural areas.",
    shortDescription: "Innovation challenge focused on rural development solutions",
    entity: "TNSCST",
    entityLogo: "/tnscst-logo.png",
    sectors: ["AgriTech", "Rural Tech", "Social Impact"],
    categorization: ["Rural Impact", "Social Impact"],
    stage: ["Ideation", "Prototype"],
    department: "Finance",
    eligibility: ["Rural Focus", "Social Impact", "Technology Solution"],
    fundingAmount: "₹5L - ₹25L",
    applicationDeadline: "2024-11-30",
    duration: "18 months",
    location: ["Rural Tamil Nadu"],
    website: "https://tnscst.tn.gov.in",
    contactEmail: "innovation@tnscst.tn.gov.in",
    requirements: ["Problem Statement", "Solution Design", "Impact Assessment", "Implementation Plan"],
    benefits: ["Grant Funding", "Rural Network", "Government Support", "Impact Measurement"],
    applicationProcess: ["Challenge Registration", "Solution Submission", "Evaluation", "Implementation"],
    createdDate: "2024-03-10",
    lastUpdated: "2024-08-05",
    popularity: 72,
    applicationsCount: 420,
    successRate: 20,
    isBookmarked: false,
  },
  {
    id: "4",
    name: "Women Entrepreneur Support Scheme",
    description:
      "Dedicated support program for women entrepreneurs providing funding, mentorship, and business development support to promote women-led startups.",
    shortDescription: "Support program specifically for women entrepreneurs",
    entity: "TIDCO",
    entityLogo: "/generic-corporate-logo.png",
    sectors: ["All Sectors"],
    categorization: ["Women-Led", "Social Impact"],
    stage: ["Ideation", "MVP", "Growth"],
    department: "MSME",
    eligibility: ["Women Founder", "Tamil Nadu Based", "Innovative Business Model"],
    fundingAmount: "₹15L - ₹75L",
    applicationDeadline: "2024-12-15",
    duration: "24 months",
    location: ["Tamil Nadu"],
    website: "https://wess.tn.gov.in",
    contactEmail: "women@tidco.tn.gov.in",
    requirements: ["Business Plan", "Founder Profile", "Market Research", "Financial Projections"],
    benefits: ["Funding", "Women Mentor Network", "Business Training", "Market Linkages"],
    applicationProcess: ["Online Registration", "Document Review", "Interview", "Approval"],
    createdDate: "2024-01-20",
    lastUpdated: "2024-08-12",
    popularity: 85,
    applicationsCount: 680,
    successRate: 18,
    isBookmarked: false,
  },
  {
    id: "5",
    name: "CleanTech Innovation Fund",
    description:
      "Specialized funding program for clean technology startups working on renewable energy, waste management, and environmental sustainability solutions.",
    shortDescription: "Funding program for clean technology and environmental solutions",
    entity: "TNPCB",
    entityLogo: "/tnpcb-logo.png",
    sectors: ["CleanTech", "Renewable Energy", "Waste Management"],
    categorization: ["Climate Action", "DeepTech"],
    stage: ["MVP", "Product Development", "Growth"],
    department: "Environment",
    eligibility: ["Environmental Impact", "Scalable Technology", "Regulatory Compliance"],
    fundingAmount: "₹50L - ₹2Cr",
    applicationDeadline: "2024-09-30",
    duration: "36 months",
    location: ["Tamil Nadu"],
    website: "https://cleantech.tn.gov.in",
    contactEmail: "cleantech@tnpcb.tn.gov.in",
    requirements: ["Technology Demo", "Environmental Impact Study", "Scalability Plan", "Regulatory Approvals"],
    benefits: ["Large Funding", "Technical Support", "Regulatory Guidance", "Market Access"],
    applicationProcess: ["Technical Evaluation", "Environmental Assessment", "Business Review", "Funding Decision"],
    createdDate: "2024-02-15",
    lastUpdated: "2024-08-08",
    popularity: 78,
    applicationsCount: 320,
    successRate: 10,
    isBookmarked: true,
  },
  {
    id: "6",
    name: "Digital Health Innovation Program",
    description:
      "Healthcare technology acceleration program focusing on digital health solutions, telemedicine, and medical device innovations for Tamil Nadu's healthcare sector.",
    shortDescription: "Healthcare technology acceleration program",
    entity: "Tamil Nadu Health Department",
    entityLogo: "/tn-health-logo.png",
    sectors: ["HealthTech", "MedTech", "Digital Health"],
    categorization: ["DeepTech", "Social Impact"],
    stage: ["MVP", "Product Development"],
    department: "Health",
    eligibility: ["Healthcare Focus", "Clinical Validation", "Regulatory Pathway"],
    fundingAmount: "₹30L - ₹1.5Cr",
    applicationDeadline: "2024-10-31",
    duration: "18 months",
    location: ["Chennai", "Madurai"],
    website: "https://healthtech.tn.gov.in",
    contactEmail: "innovation@health.tn.gov.in",
    requirements: ["Clinical Data", "Regulatory Strategy", "Healthcare Partnerships", "Product Validation"],
    benefits: ["Healthcare Network", "Clinical Trials", "Regulatory Support", "Hospital Partnerships"],
    applicationProcess: ["Medical Review", "Clinical Assessment", "Regulatory Check", "Partnership Agreement"],
    createdDate: "2024-03-01",
    lastUpdated: "2024-08-18",
    popularity: 82,
    applicationsCount: 290,
    successRate: 14,
    isBookmarked: false,
  },
]

// Filter and sort options
export const projectFilterOptions = {
  sectors: [
    "AI/ML",
    "HealthTech",
    "AgriTech",
    "FinTech",
    "EdTech",
    "CleanTech",
    "Rural Tech",
    "SaaS",
    "MedTech",
    "Digital Health",
    "Renewable Energy",
    "Waste Management",
    "Social Impact",
    "All Sectors",
  ],
  categorization: ["DeepTech", "Climate Action", "Rural Impact", "Women-Led", "Social Impact"],
  stage: ["Ideation", "MVP", "Product Development", "Growth", "Prototype"],
  department: ["IT", "MSME", "TIDCO", "Finance", "Environment", "Health", "TNSCST"],
  location: ["Tamil Nadu", "Chennai", "Coimbatore", "Madurai", "Rural Tamil Nadu"],
  fundingRange: ["Under ₹10L", "₹10L - ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹5Cr", "Above ₹5Cr"],
}

export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "deadline", label: "Application Deadline" },
  { value: "funding", label: "Funding Amount" },
  { value: "recent", label: "Recently Added" },
  { value: "success_rate", label: "Success Rate" },
]

// Utility functions
export function getProjectById(id: string): ProjectDetails | undefined {
  return projectsData.find((project) => project.id === id)
}

export function getFundingRangeValue(fundingAmount: string): number {
  // Convert funding amount to numeric value for sorting
  const amount = fundingAmount.toLowerCase()
  if (amount.includes("cr")) {
    const value = Number.parseFloat(amount.match(/[\d.]+/)?.[0] || "0")
    return value * 10000000 // Convert crores to rupees
  } else if (amount.includes("l")) {
    const value = Number.parseFloat(amount.match(/[\d.]+/)?.[0] || "0")
    return value * 100000 // Convert lakhs to rupees
  }
  return 0
}

export function exportProjectsToCSV(projects: ProjectDetails[]): void {
  const headers = [
    "Name",
    "Entity",
    "Sectors",
    "Stage",
    "Department",
    "Funding Amount",
    "Deadline",
    "Location",
    "Popularity",
    "Applications",
    "Success Rate",
  ]

  const csvContent = [
    headers.join(","),
    ...projects.map((project) =>
      [
        `"${project.name}"`,
        `"${project.entity}"`,
        `"${project.sectors.join("; ")}"`,
        `"${project.stage.join("; ")}"`,
        `"${project.department}"`,
        `"${project.fundingAmount || "N/A"}"`,
        `"${project.applicationDeadline || "N/A"}"`,
        `"${project.location.join("; ")}"`,
        project.popularity,
        project.applicationsCount,
        `${project.successRate}%`,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `startup_projects_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
