// Events data structure and management
export interface EventDetails {
  id: string
  name: string
  description: string
  shortDescription: string
  date: string
  endDate?: string
  time: string
  endTime?: string
  location: string
  district: string
  venue?: string
  type: "meetup" | "hackathon" | "workshop" | "conference" | "demo_day" | "networking"
  organizer: string
  organizerLogo?: string
  sector: string[]
  speakers: Speaker[]
  agenda: AgendaItem[]
  capacity: number
  registeredCount: number
  price: number
  currency: string
  isOnline: boolean
  meetingLink?: string
  tags: string[]
  requirements: string[]
  benefits: string[]
  website?: string
  contactEmail: string
  registrationDeadline?: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  isBookmarked?: boolean
  isRegistered?: boolean
  createdDate: string
  lastUpdated: string
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  avatar?: string
  linkedin?: string
  twitter?: string
}

export interface AgendaItem {
  id: string
  time: string
  title: string
  description: string
  speaker?: string
  duration: number
}

// Mock events data
export const eventsData: EventDetails[] = [
  {
    id: "1",
    name: "AI Startup Meetup Chennai",
    description:
      "Join us for an exciting meetup focused on AI and Machine Learning startups in Chennai. Network with fellow entrepreneurs, learn from industry experts, and discover the latest trends in AI technology. This event will feature presentations from successful AI startups, panel discussions on funding opportunities, and networking sessions.",
    shortDescription: "Network with AI innovators and learn about the latest trends in artificial intelligence",
    date: "2024-09-15",
    time: "18:00",
    endTime: "21:00",
    location: "Chennai",
    district: "Chennai",
    venue: "iTNT Hub, Anna Salai",
    type: "meetup",
    organizer: "iTNT Hub",
    organizerLogo: "/itnt-hub-logo.png",
    sector: ["AI/ML", "Technology"],
    speakers: [
      {
        id: "1",
        name: "Dr. Rajesh Kumar",
        title: "AI Research Director",
        company: "TechCorp India",
        bio: "Leading AI researcher with 15+ years of experience in machine learning and deep learning applications.",
        avatar: "/professional-headshot.png",
        linkedin: "https://linkedin.com/in/rajeshkumar",
      },
      {
        id: "2",
        name: "Priya Sharma",
        title: "Founder & CEO",
        company: "AI Solutions Startup",
        bio: "Serial entrepreneur who has built multiple successful AI startups in the healthcare and fintech sectors.",
        avatar: "/professional-woman-headshot.png",
        linkedin: "https://linkedin.com/in/priyasharma",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "18:00",
        title: "Registration & Networking",
        description: "Welcome drinks and networking session",
        duration: 30,
      },
      {
        id: "2",
        time: "18:30",
        title: "Opening Keynote: Future of AI in India",
        description: "Insights into the AI landscape and opportunities in India",
        speaker: "Dr. Rajesh Kumar",
        duration: 45,
      },
      {
        id: "3",
        time: "19:15",
        title: "Panel Discussion: AI Startup Funding",
        description: "Discussion on funding strategies and investor perspectives",
        duration: 45,
      },
      {
        id: "4",
        time: "20:00",
        title: "Startup Pitches",
        description: "Quick pitches from AI startups",
        duration: 30,
      },
      {
        id: "5",
        time: "20:30",
        title: "Networking & Closing",
        description: "Final networking session and closing remarks",
        duration: 30,
      },
    ],
    capacity: 150,
    registeredCount: 87,
    price: 0,
    currency: "INR",
    isOnline: false,
    tags: ["AI", "Machine Learning", "Networking", "Startups"],
    requirements: ["Bring business cards", "Laptop optional"],
    benefits: ["Networking opportunities", "Industry insights", "Startup exposure"],
    contactEmail: "events@itnthub.tn.gov.in",
    registrationDeadline: "2024-09-13",
    status: "upcoming",
    isBookmarked: false,
    isRegistered: false,
    createdDate: "2024-08-01",
    lastUpdated: "2024-08-15",
  },
  {
    id: "2",
    name: "AgriTech Innovation Workshop",
    description:
      "Comprehensive workshop on agricultural technology innovations, featuring hands-on sessions with IoT devices, drone technology, and precision farming techniques. Learn from industry experts and get practical experience with cutting-edge AgriTech solutions.",
    shortDescription: "Hands-on workshop on agricultural technology and precision farming",
    date: "2024-09-22",
    time: "09:00",
    endTime: "17:00",
    location: "Coimbatore",
    district: "Coimbatore",
    venue: "Agricultural University Campus",
    type: "workshop",
    organizer: "Tamil Nadu Agricultural University",
    organizerLogo: "/tnau-logo.png",
    sector: ["AgriTech", "IoT", "Sustainability"],
    speakers: [
      {
        id: "3",
        name: "Prof. Suresh Babu",
        title: "Head of AgriTech Department",
        company: "Tamil Nadu Agricultural University",
        bio: "Expert in precision agriculture and IoT applications in farming with 20+ years of research experience.",
        avatar: "/professor-headshot.png",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "09:00",
        title: "Registration & Welcome",
        description: "Check-in and welcome breakfast",
        duration: 60,
      },
      {
        id: "2",
        time: "10:00",
        title: "Introduction to Precision Agriculture",
        description: "Overview of modern farming techniques",
        speaker: "Prof. Suresh Babu",
        duration: 90,
      },
      {
        id: "3",
        time: "11:30",
        title: "Hands-on: IoT Sensors in Agriculture",
        description: "Practical session with soil and weather sensors",
        duration: 120,
      },
      {
        id: "4",
        time: "14:00",
        title: "Drone Technology Demo",
        description: "Live demonstration of agricultural drones",
        duration: 90,
      },
      {
        id: "5",
        time: "15:30",
        title: "Business Models in AgriTech",
        description: "Creating sustainable AgriTech businesses",
        duration: 90,
      },
    ],
    capacity: 50,
    registeredCount: 32,
    price: 500,
    currency: "INR",
    isOnline: false,
    tags: ["AgriTech", "IoT", "Workshop", "Hands-on"],
    requirements: ["Laptop required", "Basic programming knowledge helpful"],
    benefits: ["Hands-on experience", "Industry connections", "Certificate of completion"],
    contactEmail: "agritech@tnau.ac.in",
    registrationDeadline: "2024-09-20",
    status: "upcoming",
    isBookmarked: true,
    isRegistered: false,
    createdDate: "2024-07-15",
    lastUpdated: "2024-08-10",
  },
  {
    id: "3",
    name: "FinTech Hackathon 2024",
    description:
      "48-hour hackathon focused on financial technology solutions. Teams will work on real-world problems in digital payments, blockchain, and financial inclusion. Mentorship from industry experts and exciting prizes for winners.",
    shortDescription: "48-hour hackathon for innovative FinTech solutions",
    date: "2024-10-05",
    endDate: "2024-10-07",
    time: "18:00",
    endTime: "18:00",
    location: "Chennai",
    district: "Chennai",
    venue: "IIT Madras Research Park",
    type: "hackathon",
    organizer: "FinTech Association of Tamil Nadu",
    organizerLogo: "/fintech-tn-logo.png",
    sector: ["FinTech", "Blockchain", "Digital Payments"],
    speakers: [
      {
        id: "4",
        name: "Arjun Patel",
        title: "VP of Engineering",
        company: "PayTech Solutions",
        bio: "Fintech veteran with experience building scalable payment systems and blockchain applications.",
        avatar: "/tech-executive-headshot.png",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "18:00",
        title: "Registration & Team Formation",
        description: "Check-in, dinner, and team formation",
        duration: 120,
      },
      {
        id: "2",
        time: "20:00",
        title: "Problem Statement Release",
        description: "Announcement of hackathon challenges",
        duration: 60,
      },
      {
        id: "3",
        time: "21:00",
        title: "Hacking Begins",
        description: "48 hours of intensive development",
        duration: 2880, // 48 hours
      },
      {
        id: "4",
        time: "21:00",
        title: "Final Presentations",
        description: "Team presentations and judging",
        duration: 180,
      },
    ],
    capacity: 200,
    registeredCount: 156,
    price: 0,
    currency: "INR",
    isOnline: false,
    tags: ["Hackathon", "FinTech", "Blockchain", "Competition"],
    requirements: ["Laptop required", "Team of 2-4 members", "Programming experience"],
    benefits: ["Cash prizes", "Mentorship", "Industry exposure", "Networking"],
    contactEmail: "hackathon@fintechtn.org",
    registrationDeadline: "2024-10-01",
    status: "upcoming",
    isBookmarked: false,
    isRegistered: true,
    createdDate: "2024-07-01",
    lastUpdated: "2024-08-20",
  },
  {
    id: "4",
    name: "Women in Tech Conference",
    description:
      "Annual conference celebrating women entrepreneurs and technologists in Tamil Nadu. Features inspiring keynotes, panel discussions, and networking opportunities specifically designed to empower women in the startup ecosystem.",
    shortDescription: "Empowering women entrepreneurs and technologists",
    date: "2024-09-28",
    time: "09:00",
    endTime: "18:00",
    location: "Chennai",
    district: "Chennai",
    venue: "Leela Palace Chennai",
    type: "conference",
    organizer: "Women Entrepreneurs Association TN",
    organizerLogo: "/wea-tn-logo.png",
    sector: ["Women-Led", "Technology", "Entrepreneurship"],
    speakers: [
      {
        id: "5",
        name: "Meera Nair",
        title: "Founder & CEO",
        company: "TechWomen India",
        bio: "Advocate for women in technology with 12+ years of experience building inclusive tech communities.",
        avatar: "/woman-ceo-headshot.png",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "09:00",
        title: "Registration & Welcome Coffee",
        description: "Networking breakfast and registration",
        duration: 60,
      },
      {
        id: "2",
        time: "10:00",
        title: "Opening Keynote: Breaking Barriers",
        description: "Inspiring stories of women entrepreneurs",
        speaker: "Meera Nair",
        duration: 60,
      },
      {
        id: "3",
        time: "11:00",
        title: "Panel: Funding for Women-Led Startups",
        description: "Strategies for accessing capital",
        duration: 90,
      },
      {
        id: "4",
        time: "14:00",
        title: "Workshops: Leadership & Negotiation",
        description: "Skill-building workshops",
        duration: 120,
      },
      {
        id: "5",
        time: "16:00",
        title: "Networking & Awards Ceremony",
        description: "Recognition and networking",
        duration: 120,
      },
    ],
    capacity: 300,
    registeredCount: 245,
    price: 1500,
    currency: "INR",
    isOnline: false,
    tags: ["Women-Led", "Conference", "Leadership", "Networking"],
    requirements: ["Business attire recommended"],
    benefits: ["Leadership insights", "Networking", "Awards recognition", "Skill workshops"],
    contactEmail: "conference@weatn.org",
    registrationDeadline: "2024-09-25",
    status: "upcoming",
    isBookmarked: true,
    isRegistered: false,
    createdDate: "2024-06-15",
    lastUpdated: "2024-08-18",
  },
  {
    id: "5",
    name: "Startup Demo Day Madurai",
    description:
      "Quarterly demo day where startups from Madurai and surrounding districts pitch their innovations to investors, mentors, and industry experts. Great opportunity for startups to gain visibility and potential funding.",
    shortDescription: "Startups pitch to investors and industry experts",
    date: "2024-10-12",
    time: "14:00",
    endTime: "18:00",
    location: "Madurai",
    district: "Madurai",
    venue: "Madurai Innovation Hub",
    type: "demo_day",
    organizer: "Madurai Startup Ecosystem",
    organizerLogo: "/madurai-startup-logo.png",
    sector: ["All Sectors"],
    speakers: [
      {
        id: "6",
        name: "Karthik Raman",
        title: "Managing Partner",
        company: "South India Ventures",
        bio: "Experienced investor focusing on early-stage startups in South India with a portfolio of 50+ companies.",
        avatar: "/professional-investor.png",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "14:00",
        title: "Welcome & Networking",
        description: "Registration and networking lunch",
        duration: 60,
      },
      {
        id: "2",
        time: "15:00",
        title: "Startup Pitches - Round 1",
        description: "First batch of startup presentations",
        duration: 90,
      },
      {
        id: "3",
        time: "16:30",
        title: "Investor Panel Discussion",
        description: "Insights from investors on funding trends",
        speaker: "Karthik Raman",
        duration: 45,
      },
      {
        id: "4",
        time: "17:15",
        title: "Startup Pitches - Round 2",
        description: "Second batch of startup presentations",
        duration: 45,
      },
    ],
    capacity: 100,
    registeredCount: 78,
    price: 0,
    currency: "INR",
    isOnline: false,
    tags: ["Demo Day", "Pitching", "Investment", "Startups"],
    requirements: ["Startup founders and team members", "Pitch deck ready"],
    benefits: ["Investor exposure", "Feedback", "Networking", "Media coverage"],
    contactEmail: "demoday@maduraistartup.org",
    registrationDeadline: "2024-10-10",
    status: "upcoming",
    isBookmarked: false,
    isRegistered: false,
    createdDate: "2024-08-05",
    lastUpdated: "2024-08-12",
  },
  {
    id: "6",
    name: "Virtual HealthTech Summit",
    description:
      "Online summit focusing on healthcare technology innovations, telemedicine, and digital health solutions. Features global speakers and interactive sessions on the future of healthcare technology in India.",
    shortDescription: "Online summit on healthcare technology and digital health",
    date: "2024-09-30",
    time: "10:00",
    endTime: "16:00",
    location: "Online",
    district: "Online",
    venue: "Virtual Platform",
    type: "conference",
    organizer: "HealthTech India",
    organizerLogo: "/healthtech-india-logo.png",
    sector: ["HealthTech", "Digital Health", "MedTech"],
    speakers: [
      {
        id: "7",
        name: "Dr. Anita Gupta",
        title: "Chief Medical Officer",
        company: "Digital Health Solutions",
        bio: "Medical doctor turned entrepreneur with expertise in telemedicine and digital health platforms.",
        avatar: "/doctor-headshot.png",
      },
    ],
    agenda: [
      {
        id: "1",
        time: "10:00",
        title: "Virtual Registration & Welcome",
        description: "Platform orientation and welcome session",
        duration: 30,
      },
      {
        id: "2",
        time: "10:30",
        title: "Keynote: Future of Digital Health",
        description: "Trends and opportunities in healthcare technology",
        speaker: "Dr. Anita Gupta",
        duration: 60,
      },
      {
        id: "3",
        time: "11:30",
        title: "Panel: Telemedicine in Rural India",
        description: "Challenges and solutions for rural healthcare",
        duration: 90,
      },
      {
        id: "4",
        time: "14:00",
        title: "Startup Showcase",
        description: "HealthTech startups present their solutions",
        duration: 90,
      },
      {
        id: "5",
        time: "15:30",
        title: "Virtual Networking",
        description: "Breakout rooms for networking",
        duration: 30,
      },
    ],
    capacity: 500,
    registeredCount: 342,
    price: 0,
    currency: "INR",
    isOnline: true,
    meetingLink: "https://zoom.us/j/healthtech2024",
    tags: ["HealthTech", "Virtual", "Telemedicine", "Digital Health"],
    requirements: ["Stable internet connection", "Zoom application"],
    benefits: ["Global speakers", "Virtual networking", "Recorded sessions", "Digital certificates"],
    contactEmail: "summit@healthtechindia.org",
    registrationDeadline: "2024-09-28",
    status: "upcoming",
    isBookmarked: false,
    isRegistered: true,
    createdDate: "2024-07-20",
    lastUpdated: "2024-08-14",
  },
]

// Filter options
export const eventFilterOptions = {
  type: ["meetup", "hackathon", "workshop", "conference", "demo_day", "networking"],
  district: ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Online"],
  sector: [
    "AI/ML",
    "HealthTech",
    "AgriTech",
    "FinTech",
    "EdTech",
    "CleanTech",
    "Women-Led",
    "Technology",
    "All Sectors",
  ],
  price: ["Free", "Paid", "Under ₹500", "₹500-₹1000", "Above ₹1000"],
}

// Utility functions
export function getEventById(id: string): EventDetails | undefined {
  return eventsData.find((event) => event.id === id)
}

export function getEventsByDate(date: string): EventDetails[] {
  return eventsData.filter((event) => event.date === date)
}

export function getUpcomingEvents(limit?: number): EventDetails[] {
  const now = new Date()
  const upcoming = eventsData
    .filter((event) => new Date(event.date) >= now && event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getUserBookedEvents(userId: string): EventDetails[] {
  // In real app, this would fetch from API based on user bookings
  return eventsData.filter((event) => event.isRegistered)
}

export function formatEventDate(date: string, endDate?: string): string {
  const start = new Date(date)
  const startFormatted = start.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  if (endDate && endDate !== date) {
    const end = new Date(endDate)
    const endFormatted = end.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    return `${startFormatted} - ${endFormatted}`
  }

  return startFormatted
}

export function formatEventTime(time: string, endTime?: string): string {
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const startFormatted = formatTime(time)
  if (endTime) {
    const endFormatted = formatTime(endTime)
    return `${startFormatted} - ${endFormatted}`
  }

  return startFormatted
}

export function getEventTypeColor(type: string): string {
  switch (type) {
    case "meetup":
      return "bg-blue-100 text-blue-800"
    case "hackathon":
      return "bg-purple-100 text-purple-800"
    case "workshop":
      return "bg-green-100 text-green-800"
    case "conference":
      return "bg-orange-100 text-orange-800"
    case "demo_day":
      return "bg-red-100 text-red-800"
    case "networking":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
