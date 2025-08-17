"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions-data"
import { Eye, Bookmark, BookmarkCheck, CheckCircle, XCircle, Circle, Clock, Target, TrendingUp } from "lucide-react"

interface MinimalQuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onViewDetails?: (question: Question) => void
}

export function MinimalQuestionCard({ question, onBookmark, onViewDetails }: MinimalQuestionCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(question.isBookmarked || false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(question.id)
  }

  const getStatusIcon = () => {
    switch (question.status) {
      case "correct":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "incorrect":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getSubjectColor = () => {
    switch (question.subject) {
      case "Physics":
        return "text-blue-700"
      case "Chemistry":
        return "text-green-700"
      case "Mathematics":
        return "text-purple-700"
      default:
        return "text-gray-700"
    }
  }

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="group hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150">
      <div className="p-3 flex gap-3">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Question Text - Primary focus */}
          <div className="space-y-1">
            <p className="text-sm font-medium leading-relaxed line-clamp-4 text-gray-900 min-h-[5rem]">
              {question.title}
            </p>
          </div>

          {/* Compact info row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              {/* ID and Subject */}
              <span className="font-mono text-gray-500">{question.id}</span>
              <span className={`font-medium ${getSubjectColor()}`}>{question.subject}</span>
              <span className={`font-medium ${getDifficultyColor()}`}>{question.difficulty}</span>
              <span className="text-gray-500">{question.examType}</span>
              <span className="text-gray-500">{question.year}</span>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-3 text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{question.timeToSolve}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>+{question.marks}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{question.frequency}%</span>
              </div>
            </div>
          </div>

          {/* Topic and tags row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">{question.chapter}</span>
              <span>→</span>
              <span>{question.topic}</span>
              <span>•</span>
              <span>{question.questionType}</span>
            </div>

            <div className="flex items-center gap-1">
              {question.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs h-4 px-1.5">
                  {tag}
                </Badge>
              ))}
              {question.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs h-4 px-1.5">
                  +{question.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleBookmark}>
            {isBookmarked ? (
              <BookmarkCheck className="h-3.5 w-3.5 text-blue-600" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => onViewDetails?.(question)}>
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
