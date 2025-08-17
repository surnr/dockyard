import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"
import { mockQuestions } from "@/lib/questions-data"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are an AI tutor for JEE (Joint Entrance Examination) preparation. You help students practice questions, provide hints, and explain solutions step by step.

Your role:
- Help students select their class (11 or 12), subject (Physics, Chemistry, Mathematics), and exam type (JEE Main or JEE Advanced)
- Present questions from the question bank based on their preferences
- Provide hints when students ask for help
- Explain solutions step by step
- Encourage students and provide positive feedback
- Ask follow-up questions to test understanding

Guidelines:
- Always be encouraging and supportive
- Break down complex problems into smaller steps
- Use simple language and avoid jargon
- Provide hints before giving away the answer
- Celebrate correct answers and help with incorrect ones
- Ask if they want to try another question after completing one

When a student first arrives, guide them through selecting their preferences (class, subject, exam type) and then present them with an appropriate question.`,
    messages,
    tools: {
      selectQuestion: tool({
        description: "Select and display a question based on student preferences",
        parameters: z.object({
          class: z.enum(["11", "12"]).describe("Class 11 or 12"),
          subject: z.enum(["Physics", "Chemistry", "Mathematics"]).describe("Subject to practice"),
          examType: z.enum(["JEE Main", "JEE Advanced"]).describe("Exam type"),
          difficulty: z.enum(["Easy", "Medium", "Hard"]).optional().describe("Difficulty level (optional)"),
        }),
        execute: async ({ class: studentClass, subject, examType, difficulty }) => {
          // Filter questions based on criteria
          let filteredQuestions = mockQuestions.filter(
            (q) => q.class === studentClass && q.subject === subject && q.examType === examType,
          )

          if (difficulty) {
            filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
          }

          if (filteredQuestions.length === 0) {
            return {
              error: "No questions found matching your criteria. Let me adjust the filters.",
              availableQuestions: mockQuestions.filter((q) => q.subject === subject).length,
            }
          }

          // Select a random question
          const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]

          // Generate MCQ options for non-MCQ questions or use existing structure
          const options = randomQuestion.questionType === "MCQ" ? generateMCQOptions(randomQuestion) : null

          return {
            question: randomQuestion,
            options: options,
            totalAvailable: filteredQuestions.length,
          }
        },
      }),

      provideHint: tool({
        description: "Provide a hint for the current question",
        parameters: z.object({
          questionId: z.string().describe("ID of the current question"),
          hintLevel: z.enum(["1", "2", "3"]).describe("Level of hint (1=gentle, 2=moderate, 3=detailed)"),
        }),
        execute: async ({ questionId, hintLevel }) => {
          const question = mockQuestions.find((q) => q.id === questionId)
          if (!question) {
            return { error: "Question not found" }
          }

          // Generate hints based on question topic and difficulty
          const hints = generateHints(question, hintLevel)

          return {
            hint: hints,
            questionTopic: question.topic,
            chapter: question.chapter,
          }
        },
      }),

      checkAnswer: tool({
        description: "Check if the student's answer is correct and provide feedback",
        parameters: z.object({
          questionId: z.string().describe("ID of the current question"),
          studentAnswer: z.string().describe("Student's answer"),
          selectedOption: z.string().optional().describe("Selected MCQ option (A, B, C, D)"),
        }),
        execute: async ({ questionId, studentAnswer, selectedOption }) => {
          const question = mockQuestions.find((q) => q.id === questionId)
          if (!question) {
            return { error: "Question not found" }
          }

          // For demo purposes, we'll simulate answer checking
          const isCorrect = Math.random() > 0.4 // 60% chance of being correct for demo

          return {
            isCorrect,
            correctAnswer: getCorrectAnswer(question),
            explanation: generateExplanation(question),
            studentAnswer,
            selectedOption,
            encouragement: isCorrect
              ? "Excellent work! 🎉 You got it right!"
              : "Good attempt! Let me explain the correct approach.",
          }
        },
      }),

      showSolution: tool({
        description: "Show the complete step-by-step solution",
        parameters: z.object({
          questionId: z.string().describe("ID of the current question"),
        }),
        execute: async ({ questionId }) => {
          const question = mockQuestions.find((q) => q.id === questionId)
          if (!question) {
            return { error: "Question not found" }
          }

          return {
            solution: generateStepByStepSolution(question),
            keyFormulas: getKeyFormulas(question),
            similarTopics: getSimilarTopics(question),
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}

// Helper functions
function generateMCQOptions(question: any) {
  // Generate realistic MCQ options based on question type
  const baseOptions = ["A", "B", "C", "D"]

  switch (question.subject) {
    case "Physics":
      return [
        { option: "A", text: "2 m/s²" },
        { option: "B", text: "4 m/s²" },
        { option: "C", text: "6 m/s²" },
        { option: "D", text: "8 m/s²" },
      ]
    case "Chemistry":
      return [
        { option: "A", text: "sp³ hybridization" },
        { option: "B", text: "sp² hybridization" },
        { option: "C", text: "sp hybridization" },
        { option: "D", text: "No hybridization" },
      ]
    case "Mathematics":
      return [
        { option: "A", text: "12" },
        { option: "B", text: "24" },
        { option: "C", text: "36" },
        { option: "D", text: "48" },
      ]
    default:
      return [
        { option: "A", text: "Option A" },
        { option: "B", text: "Option B" },
        { option: "C", text: "Option C" },
        { option: "D", text: "Option D" },
      ]
  }
}

function generateHints(question: any, hintLevel: string) {
  const hints = {
    "1": [
      "Think about the fundamental concepts involved in this problem.",
      "What information is given and what do you need to find?",
      "Consider which formula or principle applies here.",
    ],
    "2": [
      `This is a ${question.topic} problem from ${question.chapter}.`,
      "Try to identify the key variables and their relationships.",
      "Remember the basic equations for this topic.",
    ],
    "3": [
      `For ${question.topic} problems, start by listing known values.`,
      "Apply the relevant formula step by step.",
      "Don't forget to check units and significant figures.",
    ],
  }

  return hints[hintLevel as keyof typeof hints] || hints["1"]
}

function getCorrectAnswer(question: any) {
  // Simulate correct answers based on question type
  switch (question.subject) {
    case "Physics":
      return "A) 2 m/s²"
    case "Chemistry":
      return "B) sp² hybridization"
    case "Mathematics":
      return "C) 36"
    default:
      return "A) Option A"
  }
}

function generateExplanation(question: any) {
  return `This ${question.topic} problem requires understanding of ${question.chapter}. The key is to identify the given information and apply the appropriate formula systematically.`
}

function generateStepByStepSolution(question: any) {
  return [
    "Step 1: Identify the given information and what needs to be found",
    "Step 2: Choose the appropriate formula or principle",
    "Step 3: Substitute the known values",
    "Step 4: Solve the equation step by step",
    "Step 5: Check the answer and units",
  ]
}

function getKeyFormulas(question: any) {
  const formulas: Record<string, string[]> = {
    Physics: ["F = ma", "v = u + at", "s = ut + ½at²"],
    Chemistry: ["PV = nRT", "pH = -log[H⁺]", "ΔG = ΔH - TΔS"],
    Mathematics: ["(a + b)² = a² + 2ab + b²", "sin²θ + cos²θ = 1", "log(ab) = log(a) + log(b)"],
  }

  return formulas[question.subject] || []
}

function getSimilarTopics(question: any) {
  return [
    `Related to ${question.chapter}`,
    `Practice more ${question.topic} problems`,
    `Review ${question.subject} fundamentals`,
  ]
}
