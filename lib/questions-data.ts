export interface Question {
  id: string
  title: string
  subject: "Physics" | "Chemistry" | "Mathematics"
  chapter: string
  topic: string
  examType: "JEE Main" | "JEE Advanced"
  year: number
  class: "11" | "12"
  difficulty: "Easy" | "Medium" | "Hard"
  difficultyScore: 1 | 2 | 3 | 4 | 5
  marks: number
  negativeMarks: number
  questionType: "MCQ" | "Numerical" | "Matrix Match"
  frequency: number
  timeToSolve: number
  status?: "not-attempted" | "correct" | "incorrect" | "bookmarked"
  isBookmarked?: boolean
  lastAttempted?: Date
  tags: string[]
}

export const mockQuestions: Question[] = [
  {
    id: "JEE2024M001",
    title: "A particle moves in a straight line with constant acceleration. If it covers 100m in the first 10s...",
    subject: "Physics",
    chapter: "Kinematics",
    topic: "Motion in a Straight Line",
    examType: "JEE Main",
    year: 2024,
    class: "11",
    difficulty: "Easy",
    difficultyScore: 2,
    marks: 4,
    negativeMarks: 1,
    questionType: "MCQ",
    frequency: 85,
    timeToSolve: 3,
    status: "correct",
    isBookmarked: true,
    lastAttempted: new Date("2024-01-15"),
    tags: ["kinematics", "acceleration", "motion"],
  },
  {
    id: "JEE2024A015",
    title: "Find the number of ways to arrange 6 distinct objects in a circle such that two specific objects...",
    subject: "Mathematics",
    chapter: "Permutations and Combinations",
    topic: "Circular Permutations",
    examType: "JEE Advanced",
    year: 2024,
    class: "11",
    difficulty: "Hard",
    difficultyScore: 5,
    marks: 6,
    negativeMarks: 2,
    questionType: "Numerical",
    frequency: 45,
    timeToSolve: 8,
    status: "incorrect",
    isBookmarked: false,
    lastAttempted: new Date("2024-01-14"),
    tags: ["permutations", "circular", "arrangements"],
  },
  {
    id: "JEE2023M089",
    title: "The hybridization of carbon atoms in benzene molecule is sp2. The bond angles in benzene are...",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    topic: "Hybridization",
    examType: "JEE Main",
    year: 2023,
    class: "11",
    difficulty: "Medium",
    difficultyScore: 3,
    marks: 4,
    negativeMarks: 1,
    questionType: "MCQ",
    frequency: 72,
    timeToSolve: 4,
    status: "not-attempted",
    isBookmarked: false,
    tags: ["hybridization", "benzene", "bonding"],
  },
  {
    id: "JEE2024A032",
    title: "A uniform electric field E exists in a region. A charge q is moved from point A to point B...",
    subject: "Physics",
    chapter: "Electrostatics",
    topic: "Electric Field and Potential",
    examType: "JEE Advanced",
    year: 2024,
    class: "12",
    difficulty: "Hard",
    difficultyScore: 4,
    marks: 6,
    negativeMarks: 2,
    questionType: "Matrix Match",
    frequency: 68,
    timeToSolve: 12,
    status: "not-attempted",
    isBookmarked: true,
    tags: ["electrostatics", "electric field", "potential"],
  },
  {
    id: "JEE2023M156",
    title: "The derivative of f(x) = x³ + 2x² - 5x + 1 at x = 2 is equal to...",
    subject: "Mathematics",
    chapter: "Differential Calculus",
    topic: "Derivatives",
    examType: "JEE Main",
    year: 2023,
    class: "12",
    difficulty: "Easy",
    difficultyScore: 1,
    marks: 4,
    negativeMarks: 1,
    questionType: "MCQ",
    frequency: 90,
    timeToSolve: 2,
    status: "correct",
    isBookmarked: false,
    lastAttempted: new Date("2024-01-13"),
    tags: ["calculus", "derivatives", "differentiation"],
  },
  {
    id: "JEE2024M078",
    title: "In the reaction 2A + B → C + D, if the rate of disappearance of A is 0.02 mol/L/s...",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate of Reaction",
    examType: "JEE Main",
    year: 2024,
    class: "12",
    difficulty: "Medium",
    difficultyScore: 3,
    marks: 4,
    negativeMarks: 1,
    questionType: "Numerical",
    frequency: 55,
    timeToSolve: 6,
    status: "not-attempted",
    isBookmarked: false,
    tags: ["kinetics", "rate", "reaction"],
  },
]

export const subjects = ["Physics", "Chemistry", "Mathematics"] as const
export const examTypes = ["JEE Main", "JEE Advanced"] as const
export const classes = ["11", "12"] as const
export const difficulties = ["Easy", "Medium", "Hard"] as const
export const questionTypes = ["MCQ", "Numerical", "Matrix Match"] as const
export const years = [2024, 2023, 2022, 2021, 2020] as const

export const chapters = {
  Physics: ["Kinematics", "Dynamics", "Thermodynamics", "Electrostatics", "Magnetism", "Optics", "Modern Physics"],
  Chemistry: [
    "Atomic Structure",
    "Chemical Bonding",
    "Thermodynamics",
    "Chemical Kinetics",
    "Organic Chemistry",
    "Coordination Compounds",
  ],
  Mathematics: [
    "Algebra",
    "Trigonometry",
    "Coordinate Geometry",
    "Calculus",
    "Probability",
    "Permutations and Combinations",
    "Vectors",
  ],
}
