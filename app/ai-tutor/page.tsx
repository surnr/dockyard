"use client"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PreferenceSelector } from "@/components/ai-tutor/preference-selector"
import { QuestionDisplay } from "@/components/ai-tutor/question-display"
import { SolutionDisplay } from "@/components/ai-tutor/solution-display"
import { PermissionGuard } from "@/components/permission-guard"
import { UpgradeButton } from "@/components/upgrade-button"
import { mockQuestions } from "@/lib/questions-data"
import {
  Send,
  Bot,
  User,
  GraduationCap,
  Sparkles,
  RotateCcw,
  MessageCircle,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  HelpCircle,
  CheckCircle,
  Clock,
  Brain,
  ArrowUp,
} from "lucide-react"

export default function AITutorPage() {
  const [showPreferences, setShowPreferences] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [currentSolution, setCurrentSolution] = useState<any>(null)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [selectedPreferences, setSelectedPreferences] = useState<any>(null)
  const [showInitialQuestion, setShowInitialQuestion] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [sessionStats, setSessionStats] = useState({
    questionsAttempted: 0,
    correctAnswers: 0,
    hintsUsed: 0,
    timeSpent: 0,
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/ai-tutor",
    onToolCall: ({ toolCall }) => {
      console.log("Tool called:", toolCall)

      if (toolCall.toolName === "selectQuestion" && toolCall.result) {
        if (!toolCall.result.error) {
          setCurrentQuestion(toolCall.result.question)
          setCurrentSolution(null)
          setShowInitialQuestion(false)
        }
      }

      if (toolCall.toolName === "checkAnswer" && toolCall.result) {
        setCurrentSolution(toolCall.result)
        setCurrentQuestion(null)
        setSessionStats((prev) => ({
          ...prev,
          questionsAttempted: prev.questionsAttempted + 1,
          correctAnswers: toolCall.result.isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        }))
      }

      if (toolCall.toolName === "provideHint" && toolCall.result) {
        setSessionStats((prev) => ({
          ...prev,
          hintsUsed: prev.hintsUsed + 1,
        }))
      }

      if (toolCall.toolName === "showSolution" && toolCall.result) {
        setCurrentSolution((prev) => ({ ...prev, ...toolCall.result }))
      }
    },
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  // Show initial mock question when preferences are selected
  useEffect(() => {
    if (selectedPreferences && !sessionStarted) {
      const filteredQuestions = mockQuestions.filter(
        (q) =>
          q.class === selectedPreferences.class &&
          q.subject === selectedPreferences.subject &&
          q.examType === selectedPreferences.examType,
      )

      if (filteredQuestions.length > 0) {
        const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
        setCurrentQuestion({
          ...randomQuestion,
          options: generateMockOptions(randomQuestion),
        })
        setShowInitialQuestion(true)
      }
    }
  }, [selectedPreferences, sessionStarted])

  const generateMockOptions = (question: any) => {
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

  const handlePreferencesSelect = async (preferences: any) => {
    setSelectedPreferences(preferences)
    setShowPreferences(false)
    setSessionStarted(false)
  }

  const handleStartChatSession = async () => {
    setSessionStarted(true)
    setShowInitialQuestion(false)

    await append({
      role: "user",
      content: `I want to practice ${selectedPreferences.subject} questions for ${selectedPreferences.examType}, Class ${selectedPreferences.class}${selectedPreferences.difficulty ? `, difficulty level: ${selectedPreferences.difficulty}` : ""}. Please give me a question to solve.`,
    })
  }

  const handleAnswerSubmit = async (answer: string, option?: string) => {
    if (!currentQuestion) return

    if (showInitialQuestion) {
      setSessionStarted(true)
      setShowInitialQuestion(false)

      await append({
        role: "user",
        content: `I want to practice ${selectedPreferences.subject} questions for ${selectedPreferences.examType}, Class ${selectedPreferences.class}. For the sample question ${currentQuestion.id}, my answer is: ${answer}${option ? ` (Selected option: ${option})` : ""}. Please check my answer and give me more questions to practice.`,
      })
    } else {
      await append({
        role: "user",
        content: `My answer is: ${answer}${option ? ` (Selected option: ${option})` : ""} for question ${currentQuestion.id}`,
      })
    }
  }

  const handleHintRequest = async (level: "1" | "2" | "3") => {
    if (!currentQuestion) return

    if (showInitialQuestion) {
      setSessionStarted(true)
      setShowInitialQuestion(false)

      await append({
        role: "user",
        content: `I want to practice ${selectedPreferences.subject} questions for ${selectedPreferences.examType}, Class ${selectedPreferences.class}. For this sample question ${currentQuestion.id}, can you give me a hint (level ${level})?`,
      })
    } else {
      await append({
        role: "user",
        content: `Can you give me a hint (level ${level}) for question ${currentQuestion.id}?`,
      })
    }
  }

  const handleSolutionRequest = async () => {
    if (!currentQuestion) return

    if (showInitialQuestion) {
      setSessionStarted(true)
      setShowInitialQuestion(false)

      await append({
        role: "user",
        content: `I want to practice ${selectedPreferences.subject} questions for ${selectedPreferences.examType}, Class ${selectedPreferences.class}. For this sample question ${currentQuestion.id}, please show me the complete solution.`,
      })
    } else {
      await append({
        role: "user",
        content: `Please show me the complete solution for question ${currentQuestion.id}`,
      })
    }
  }

  const handleNextQuestion = async () => {
    setCurrentQuestion(null)
    setCurrentSolution(null)

    await append({
      role: "user",
      content: "Please give me another question to practice.",
    })
  }

  const handleTryAgain = () => {
    setCurrentSolution(null)
  }

  const resetSession = () => {
    setShowPreferences(true)
    setSessionStarted(false)
    setCurrentQuestion(null)
    setCurrentSolution(null)
    setSelectedPreferences(null)
    setShowInitialQuestion(false)
    setSessionStats({ questionsAttempted: 0, correctAnswers: 0, hintsUsed: 0, timeSpent: 0 })
  }

  const quickActions = [
    { label: "Hint", icon: Lightbulb, action: () => append({ role: "user", content: "Can you give me a hint?" }) },
    {
      label: "Solution",
      icon: BookOpen,
      action: () => append({ role: "user", content: "Show me the solution" }),
    },
    {
      label: "Next Question",
      icon: Target,
      action: () => append({ role: "user", content: "Give me another question" }),
    },
    {
      label: "Explain Concept",
      icon: Brain,
      action: () => append({ role: "user", content: "Can you explain the concept behind this?" }),
    },
  ]

  if (showPreferences) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Jeeify AI Tutor</span>
                </div>
                <Badge variant="secondary" className="hidden sm:flex">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Powered by AI
                </Badge>
              </div>
              <UpgradeButton variant="outline" size="sm">
                Upgrade to Premium
              </UpgradeButton>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <PermissionGuard requiredPermission="premium_access">
            <PreferenceSelector onPreferencesSelect={handlePreferencesSelect} />
          </PermissionGuard>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Jeeify AI Tutor</span>
              </div>
              {selectedPreferences && (
                <div className="hidden sm:flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                    Class {selectedPreferences.class}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                    {selectedPreferences.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {selectedPreferences.examType}
                  </Badge>
                  {selectedPreferences.difficulty && (
                    <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                      {selectedPreferences.difficulty}
                    </Badge>
                  )}
                </div>
              )}
              <Badge variant="secondary" className="hidden sm:flex">
                <MessageCircle className="h-3 w-3 mr-1" />
                {showInitialQuestion ? "Sample Question" : sessionStarted ? "Active Session" : "Ready"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetSession}>
                <RotateCcw className="h-4 w-4 mr-1" />
                New Session
              </Button>
              <UpgradeButton variant="outline" size="sm">
                Upgrade to Premium
              </UpgradeButton>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <PermissionGuard requiredPermission="premium_access">
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            {/* Enhanced Chat Panel */}
            <div className="lg:col-span-5 flex flex-col">
              <Card className="flex-1 flex flex-col shadow-lg border border-gray-200 bg-white">
                {/* Chat Header */}
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">AI Tutor Assistant</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                          Online & Ready to Help
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Session Active
                      </Badge>
                      {sessionStarted && (
                        <div className="text-xs text-gray-500">
                          {sessionStats.questionsAttempted} questions •{" "}
                          {sessionStats.questionsAttempted > 0
                            ? Math.round((sessionStats.correctAnswers / sessionStats.questionsAttempted) * 100)
                            : 0}
                          % accuracy
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                  <div className="space-y-6">
                    {/* Welcome Message */}
                    {!sessionStarted && showInitialQuestion && (
                      <div className="flex gap-3 justify-start">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white border border-blue-200 p-5 rounded-2xl rounded-tl-md shadow-sm max-w-[85%] relative">
                          <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-blue-200 transform rotate-45"></div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-900">
                              🎉 <strong>Welcome to your AI Tutor!</strong>
                            </p>
                            <p className="text-sm text-gray-700">
                              I've prepared a sample <strong>{selectedPreferences.subject}</strong> question for{" "}
                              <strong>{selectedPreferences.examType}</strong> to get you started.
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                              <p className="text-sm text-blue-800">
                                💡 <strong>Try it out:</strong> Solve the question, ask for hints, or request the
                                solution. I'm here to help you learn!
                              </p>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                              <Button
                                size="sm"
                                onClick={handleStartChatSession}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                Start Full Session
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages */}
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[85%] ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                                : "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                            }`}
                          >
                            {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                          </div>
                          <div
                            className={`p-4 rounded-2xl shadow-sm relative ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-tr-md"
                                : "bg-white border border-gray-200 rounded-tl-md"
                            }`}
                          >
                            {message.role === "user" ? (
                              <div className="absolute -right-2 top-4 w-4 h-4 bg-green-500 transform rotate-45"></div>
                            ) : (
                              <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                            )}
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <div
                              className={`text-xs mt-2 opacity-70 ${
                                message.role === "user" ? "text-white" : "text-gray-500"
                              }`}
                            >
                              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Loading State */}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-md shadow-sm relative">
                          <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                          <div className="flex items-center gap-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    {sessionStarted && !isLoading && (
                      <div className="flex flex-wrap gap-2 justify-center py-2">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={action.action}
                            className="text-xs h-8 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          >
                            <action.icon className="h-3 w-3 mr-1" />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={
                          showInitialQuestion
                            ? "Ask for help with the sample question..."
                            : sessionStarted
                              ? "Ask for help, hints, or type your message..."
                              : "Type your message..."
                        }
                        className="flex-1 border-gray-200 bg-white shadow-sm focus:border-blue-300 focus:ring-blue-200"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <HelpCircle className="h-3 w-3" />
                          <span>Ask for hints anytime</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>Powered by AI</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Scroll to top
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>

            {/* Question/Solution Panel */}
            <div className="lg:col-span-7">
              {currentQuestion && (
                <QuestionDisplay
                  question={currentQuestion}
                  options={currentQuestion.options}
                  onAnswerSelect={handleAnswerSubmit}
                  onHintRequest={handleHintRequest}
                  onSolutionRequest={handleSolutionRequest}
                  showHints={true}
                />
              )}

              {currentSolution && (
                <SolutionDisplay
                  isCorrect={currentSolution.isCorrect}
                  correctAnswer={currentSolution.correctAnswer}
                  explanation={currentSolution.explanation}
                  studentAnswer={currentSolution.studentAnswer}
                  selectedOption={currentSolution.selectedOption}
                  encouragement={currentSolution.encouragement}
                  solution={currentSolution.solution}
                  keyFormulas={currentSolution.keyFormulas}
                  onNextQuestion={handleNextQuestion}
                  onTryAgain={handleTryAgain}
                />
              )}

              {!currentQuestion && !currentSolution && sessionStarted && (
                <Card className="h-full flex items-center justify-center shadow-lg border border-gray-200 bg-white">
                  <CardContent className="text-center space-y-6 p-12">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-lg">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI Tutor is Ready!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Your personalized question will appear here once the AI selects one based on your learning
                        needs.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
                      <div className="space-y-2">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-xs text-gray-500">Personalized Questions</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                          <Lightbulb className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-xs text-gray-500">Smart Hints</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                          <CheckCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-xs text-gray-500">Instant Feedback</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </PermissionGuard>
      </main>
    </div>
  )
}
