export interface SupportTicket {
  id: string
  title: string
  description: string
  category: "Technical" | "Account" | "General" | "Bug Report" | "Feature Request"
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Open" | "In Progress" | "Waiting for Response" | "Resolved" | "Closed"
  createdAt: string
  updatedAt: string
  userId: string
  userName: string
  userEmail: string
  assignedTo?: string
  attachments: string[]
  tags: string[]
  conversation: TicketMessage[]
}

export interface TicketMessage {
  id: string
  ticketId: string
  message: string
  sender: "user" | "admin"
  senderName: string
  timestamp: string
  attachments?: string[]
}

export const supportTicketsData: SupportTicket[] = [
  {
    id: "1",
    title: "Unable to access project application form",
    description:
      "I'm trying to apply for the TIDCO Startup Grant but the application form keeps showing an error when I try to submit. The error message says 'Invalid file format' but I'm uploading a PDF as required.",
    category: "Technical",
    priority: "High",
    status: "In Progress",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    userId: "user1",
    userName: "Priya Sharma",
    userEmail: "priya.sharma@example.com",
    assignedTo: "Admin Team",
    attachments: ["application-form.pdf", "error-screenshot.png"],
    tags: ["application", "form-error", "tidco"],
    conversation: [
      {
        id: "msg1",
        ticketId: "1",
        message:
          "I'm trying to apply for the TIDCO Startup Grant but the application form keeps showing an error when I try to submit. The error message says 'Invalid file format' but I'm uploading a PDF as required.",
        sender: "user",
        senderName: "Priya Sharma",
        timestamp: "2024-01-15T10:30:00Z",
        attachments: ["error-screenshot.png"],
      },
      {
        id: "msg2",
        ticketId: "1",
        message:
          "Thank you for reporting this issue. I can see the error in your screenshot. This appears to be a known issue with PDF files larger than 5MB. Could you please try compressing your PDF file and uploading again?",
        sender: "admin",
        senderName: "Support Team",
        timestamp: "2024-01-15T15:45:00Z",
      },
      {
        id: "msg3",
        ticketId: "1",
        message:
          "I compressed the file to 3MB but still getting the same error. I've attached the compressed version for your reference.",
        sender: "user",
        senderName: "Priya Sharma",
        timestamp: "2024-01-16T09:15:00Z",
        attachments: ["compressed-application.pdf"],
      },
      {
        id: "msg4",
        ticketId: "1",
        message:
          "I've escalated this to our technical team. We've identified a bug in the file upload system that affects certain PDF formats. We're working on a fix and will update you within 24 hours.",
        sender: "admin",
        senderName: "Technical Support",
        timestamp: "2024-01-16T14:20:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Profile information not updating",
    description:
      "I updated my startup's information in the profile section, but the changes are not reflecting on the public profile page. I've tried multiple times over the past week.",
    category: "Account",
    priority: "Medium",
    status: "Open",
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-14T16:20:00Z",
    userId: "user2",
    userName: "Rajesh Kumar",
    userEmail: "rajesh.kumar@techstartup.com",
    attachments: [],
    tags: ["profile", "update-issue"],
    conversation: [
      {
        id: "msg5",
        ticketId: "2",
        message:
          "I updated my startup's information in the profile section, but the changes are not reflecting on the public profile page. I've tried multiple times over the past week.",
        sender: "user",
        senderName: "Rajesh Kumar",
        timestamp: "2024-01-14T16:20:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Request for new sector category",
    description:
      "Could you please add 'Quantum Computing' as a new sector category? Our startup works in this emerging field and none of the existing categories fit our work.",
    category: "Feature Request",
    priority: "Low",
    status: "Waiting for Response",
    createdAt: "2024-01-13T11:45:00Z",
    updatedAt: "2024-01-14T10:30:00Z",
    userId: "user3",
    userName: "Dr. Anitha Reddy",
    userEmail: "anitha.reddy@quantumtech.in",
    assignedTo: "Product Team",
    attachments: [],
    tags: ["feature-request", "sector", "quantum-computing"],
    conversation: [
      {
        id: "msg6",
        ticketId: "3",
        message:
          "Could you please add 'Quantum Computing' as a new sector category? Our startup works in this emerging field and none of the existing categories fit our work.",
        sender: "user",
        senderName: "Dr. Anitha Reddy",
        timestamp: "2024-01-13T11:45:00Z",
      },
      {
        id: "msg7",
        ticketId: "3",
        message:
          "Thank you for the suggestion! We're always looking to expand our sector categories to better serve emerging technologies. I've forwarded this to our product team for review. They'll evaluate adding 'Quantum Computing' and related subcategories in our next platform update.",
        sender: "admin",
        senderName: "Product Support",
        timestamp: "2024-01-14T10:30:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "Event booking confirmation not received",
    description:
      "I registered for the 'Chennai Startup Meetup' yesterday but haven't received any confirmation email. My payment was processed successfully.",
    category: "General",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2024-01-12T14:15:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
    userId: "user4",
    userName: "Meera Patel",
    userEmail: "meera.patel@example.com",
    assignedTo: "Events Team",
    attachments: ["payment-receipt.pdf"],
    tags: ["event", "booking", "confirmation"],
    conversation: [
      {
        id: "msg8",
        ticketId: "4",
        message:
          "I registered for the 'Chennai Startup Meetup' yesterday but haven't received any confirmation email. My payment was processed successfully.",
        sender: "user",
        senderName: "Meera Patel",
        timestamp: "2024-01-12T14:15:00Z",
        attachments: ["payment-receipt.pdf"],
      },
      {
        id: "msg9",
        ticketId: "4",
        message:
          "I can see your successful registration and payment in our system. The confirmation email was caught by spam filters. I've resent your confirmation email and added you to our whitelist to prevent this in the future.",
        sender: "admin",
        senderName: "Events Team",
        timestamp: "2024-01-13T09:20:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "Search results showing irrelevant projects",
    description:
      "When I search for 'AI healthcare startups', the results include many non-healthcare projects. The search algorithm seems to be matching only the 'AI' keyword.",
    category: "Bug Report",
    priority: "Medium",
    status: "Open",
    createdAt: "2024-01-11T13:30:00Z",
    updatedAt: "2024-01-11T13:30:00Z",
    userId: "user5",
    userName: "Vikram Singh",
    userEmail: "vikram.singh@healthtech.co",
    attachments: ["search-results-screenshot.png"],
    tags: ["search", "algorithm", "ai", "healthcare"],
    conversation: [
      {
        id: "msg10",
        ticketId: "5",
        message:
          "When I search for 'AI healthcare startups', the results include many non-healthcare projects. The search algorithm seems to be matching only the 'AI' keyword.",
        sender: "user",
        senderName: "Vikram Singh",
        timestamp: "2024-01-11T13:30:00Z",
        attachments: ["search-results-screenshot.png"],
      },
    ],
  },
]

export const ticketCategories = ["Technical", "Account", "General", "Bug Report", "Feature Request"] as const

export const ticketPriorities = ["Low", "Medium", "High", "Critical"] as const

export const ticketStatuses = ["Open", "In Progress", "Waiting for Response", "Resolved", "Closed"] as const

export function getTicketsByStatus(status: string) {
  return supportTicketsData.filter((ticket) => ticket.status === status)
}

export function getTicketsByUser(userId: string) {
  return supportTicketsData.filter((ticket) => ticket.userId === userId)
}

export function getTicketById(id: string) {
  return supportTicketsData.find((ticket) => ticket.id === id)
}

export function getTicketStats() {
  const total = supportTicketsData.length
  const open = supportTicketsData.filter((t) => t.status === "Open").length
  const inProgress = supportTicketsData.filter((t) => t.status === "In Progress").length
  const resolved = supportTicketsData.filter((t) => t.status === "Resolved").length
  const closed = supportTicketsData.filter((t) => t.status === "Closed").length

  return {
    total,
    open,
    inProgress,
    resolved,
    closed,
    avgResponseTime: "4.2 hours",
    satisfactionRate: "94%",
  }
}
