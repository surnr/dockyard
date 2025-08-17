"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions-data"
import { Eye, Bookmark, BookmarkCheck, CheckCircle, XCircle, Circle, Play, Clock, Target } from "lucide-react"

interface SimpleQuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onSolve?: (questionId: string) => void
  onViewDetails?: (question: Question) => void
}

export function SimpleQuestionCard({ question, onBookmark, onSolve, onViewDetails }: SimpleQuestionCardProps) {
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
    <Card className="hover:shadow-md transition-all duration-200 group border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Row - Badges */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getSubjectColor()}`}>
                {question.subject}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.examType}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor()}`}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.year}
              </Badge>
            </div>

            {/* Question Title */}
            <h3 className="font-medium text-sm leading-relaxed line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {question.title}
            </h3>

            {/* Quick Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {question.timeToSolve}m
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />+{question.marks}/-{question.negativeMarks}
              </span>
              <span>{question.chapter}</span>
              <span>•</span>
              <span>{question.topic}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {question.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{question.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewDetails?.(question)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-blue-600" /> : <Bookmark className="h-4 w-4" />}
            </Button>
            <Button size="sm" onClick={() => onSolve?.(question.id)} className="ml-2">
              <Play className="h-3 w-3 mr-1" />
              {question.status === "not-attempted" ? "Solve" : "Review"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
