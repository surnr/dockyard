export const mockPerformanceData = {
  physics: {
    score: 78,
    total: 100,
    improvement: 12,
    weakTopics: ["Electromagnetism", "Thermodynamics"],
    strongTopics: ["Mechanics", "Optics"],
    timeSpent: 24,
    accuracy: 65,
  },
  chemistry: {
    score: 65,
    total: 100,
    improvement: 8,
    weakTopics: ["Organic Chemistry", "Chemical Bonding"],
    strongTopics: ["Physical Chemistry", "Periodic Table"],
    timeSpent: 18,
    accuracy: 58,
  },
  mathematics: {
    score: 82,
    total: 100,
    improvement: 15,
    weakTopics: ["Calculus", "Probability"],
    strongTopics: ["Algebra", "Coordinate Geometry"],
    timeSpent: 30,
    accuracy: 73,
  },
}

export const mockStudyTimeData = [
  { subject: "Physics", hours: 24, fill: "hsl(var(--chart-1))" },
  { subject: "Chemistry", hours: 18, fill: "hsl(var(--chart-2))" },
  { subject: "Mathematics", hours: 30, fill: "hsl(var(--chart-3))" },
]

export const mockConceptMasteryData = [
  { axis: "Mechanics", value: 0.8 },
  { axis: "Electromagnetism", value: 0.5 },
  { axis: "Thermodynamics", value: 0.6 },
  { axis: "Optics", value: 0.9 },
  { axis: "Modern Physics", value: 0.7 },
]

export const mockFrequencyData = [
  { topic: "Mechanics", frequency: 28, difficulty: 3, yourScore: 85 },
  { topic: "Electromagnetism", frequency: 22, difficulty: 4, yourScore: 45 },
  { topic: "Organic Chemistry", frequency: 25, difficulty: 4, yourScore: 52 },
  { topic: "Calculus", frequency: 30, difficulty: 5, yourScore: 78 },
  { topic: "Algebra", frequency: 20, difficulty: 3, yourScore: 92 },
]

export const mockWeeklyProgress = [
  { day: "Mon", questions: 15, correct: 10, accuracy: 67 },
  { day: "Tue", questions: 20, correct: 14, accuracy: 70 },
  { day: "Wed", questions: 18, correct: 12, accuracy: 67 },
  { day: "Thu", questions: 25, correct: 20, accuracy: 80 },
  { day: "Fri", questions: 22, correct: 15, accuracy: 68 },
  { day: "Sat", questions: 30, correct: 24, accuracy: 80 },
  { day: "Sun", questions: 10, correct: 8, accuracy: 80 },
]

export const mockPredictedScore = {
  current: 245,
  target: 300,
  improvement: 55,
  probability: 78,
}

export const mockStudyStreak = {
  current: 12,
  longest: 28,
  thisWeek: 6,
}

export const mockTimeOptimization = {
  efficientHours: 4.2,
  wastedTime: 1.8,
  recommendation: "Focus more on weak topics during peak hours (9-11 AM)",
}

export const mockUpcomingMilestones = [
  { title: "Complete Electromagnetism", daysLeft: 5, progress: 60 },
  { title: "Organic Chemistry Mastery", daysLeft: 12, progress: 35 },
  { title: "Mock Test #5", daysLeft: 3, progress: 0 },
]

export const mockRecommendedQuestions = [
  {
    id: "Q123",
    subject: "Physics",
    topic: "Kinematics",
    difficulty: 3,
    frequency: 0.75,
  },
  {
    id: "Q456",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    difficulty: 4,
    frequency: 0.62,
  },
  {
    id: "Q789",
    subject: "Mathematics",
    topic: "Calculus",
    difficulty: 5,
    frequency: 0.88,
  },
]
