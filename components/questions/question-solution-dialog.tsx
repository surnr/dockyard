"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/ui/star-rating"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Question } from "@/lib/questions-data"
import {
  BookOpen,
  Lightbulb,
  CheckCircle,
  XCircle,
  Circle,
  Bookmark,
  BookmarkCheck,
  Play,
  Clock,
  Target,
} from "lucide-react"

interface QuestionSolutionDialogProps {
  question: Question | null
  isOpen: boolean
  onClose: () => void
  onBookmark?: (questionId: string) => void
}

export function QuestionSolutionDialog({ question, isOpen, onClose, onBookmark }: QuestionSolutionDialogProps) {
  if (!question) return null

  const getStatusIcon = () => {
    switch (question.status) {
      case "correct":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "incorrect":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getSubjectColor = () => {
    switch (question.subject) {
      case "Physics":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Chemistry":
        return "bg-green-100 text-green-700 border-green-200"
      case "Mathematics":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // Mock solution content
  const mockSolution = {
    explanation:
      "This question tests your understanding of kinematics and motion in a straight line. We need to find the acceleration using the given information about distance and time.",
    steps: [
      "Given: Distance (s) = 100m, Time (t) = 10s",
      "We need to find acceleration (a)",
      "Using equation: s = ut + ½at²",
      "Since initial velocity u = 0 (starts from rest)",
      "100 = 0 + ½a(10)²",
      "100 = 50a",
      "Therefore, a = 2 m/s²",
    ],
    answer: "The acceleration is 2 m/s²",
    hints: [
      "Remember the kinematic equations for constant acceleration",
      "Check if the particle starts from rest or has initial velocity",
      "Use the appropriate equation based on given parameters",
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <span>Question & Solution</span>
            <Badge variant="outline" className="text-xs">
              {question.id}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={getSubjectColor()}>
                {question.subject}
              </Badge>
              <Badge variant="outline">{question.examType}</Badge>
              <Badge variant="outline">Class {question.class}</Badge>
              <Badge variant="outline">{question.year}</Badge>
              <Badge variant="outline">{question.questionType}</Badge>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Difficulty:</span>
                <StarRating rating={question.difficultyScore} maxRating={5} size="sm" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium leading-relaxed">{question.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{question.chapter}</span>
                <span>•</span>
                <span>{question.topic}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{question.timeToSolve} min</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>
                    +{question.marks}/-{question.negativeMarks}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Question Content and Solution */}
          <Tabs defaultValue="question" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
            </TabsList>

            <TabsContent value="question" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <h3 className="font-semibold">Question Statement</h3>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{question.title}</p>
                </div>

                {/* Mock options for MCQ */}
                {question.questionType === "MCQ" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Options:</h4>
                    <div className="space-y-2">
                      {["2 m/s²", "4 m/s²", "1 m/s²", "3 m/s²"].map((option, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <span className="font-medium text-xs w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="solution" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h3 className="font-semibold">Step-by-Step Solution</h3>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">{mockSolution.explanation}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Solution Steps:</h4>
                  <div className="space-y-2">
                    {mockSolution.steps.map((step, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <span className="font-medium text-xs w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm text-blue-900">Final Answer</span>
                  </div>
                  <p className="text-sm text-blue-800 font-medium">{mockSolution.answer}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hints" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <h3 className="font-semibold">Helpful Hints</h3>
                </div>

                <div className="space-y-3">
                  {mockSolution.hints.map((hint, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="font-medium text-xs w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm text-yellow-800">{hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={() => onBookmark?.(question.id)}>
              {question.isBookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Practice Similar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
