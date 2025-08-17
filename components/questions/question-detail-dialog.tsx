"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { Question } from "@/lib/questions-data"
import {
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  BarChart3,
  Play,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react"

interface QuestionDetailDialogProps {
  question: Question | null
  isOpen: boolean
  onClose: () => void
  onSolve?: (questionId: string) => void
  onBookmark?: (questionId: string) => void
}

export function QuestionDetailDialog({ question, isOpen, onClose, onSolve, onBookmark }: QuestionDetailDialogProps) {
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

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <span>Question Details</span>
            <Badge variant="outline" className="text-xs">
              {question.id}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`${getSubjectColor()}`}>
                {question.subject}
              </Badge>
              <Badge variant="outline">{question.examType}</Badge>
              <Badge variant="outline">Class {question.class}</Badge>
              <Badge variant="outline" className={getDifficultyColor()}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline">{question.questionType}</Badge>
              <Badge variant="outline">{question.year}</Badge>
            </div>

            <h2 className="text-lg font-medium leading-relaxed">{question.title}</h2>
          </div>

          <Separator />

          {/* Question Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Time to Solve</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{question.timeToSolve}m</div>
            </div>

            <div className="space-y-2 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Marks</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                +{question.marks}/-{question.negativeMarks}
              </div>
            </div>

            <div className="space-y-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Frequency</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">{question.frequency}%</div>
            </div>

            <div className="space-y-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Difficulty</span>
              </div>
              <div className="text-2xl font-bold text-orange-900">{question.difficultyScore}/5</div>
            </div>
          </div>

          <Separator />

          {/* Topic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Topic Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Chapter:</span>
                  <span className="text-sm font-medium">{question.chapter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Topic:</span>
                  <span className="text-sm font-medium">{question.topic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Question Type:</span>
                  <span className="text-sm font-medium">{question.questionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Year:</span>
                  <span className="text-sm font-medium">{question.year}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-4 w-4" />
                Performance Metrics
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Frequency in JEE</span>
                    <span>{question.frequency}%</span>
                  </div>
                  <Progress value={question.frequency} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Difficulty Level</span>
                    <span>{question.difficultyScore}/5</span>
                  </div>
                  <Progress value={(question.difficultyScore / 5) * 100} className="h-2" />
                </div>
                {question.lastAttempted && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Attempted:</span>
                    <span className="text-sm font-medium">{question.lastAttempted.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
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
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => onSolve?.(question.id)}>
                <Play className="h-4 w-4 mr-2" />
                {question.status === "not-attempted" ? "Solve Question" : "Review Solution"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
