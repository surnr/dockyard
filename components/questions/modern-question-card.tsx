"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import type { Question } from "@/lib/questions-data"
import { Eye, Bookmark, BookmarkCheck, CheckCircle, XCircle, Circle, Clock, Target, TrendingUp } from "lucide-react"

interface ModernQuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onViewDetails?: (question: Question) => void
}

export function ModernQuestionCard({ question, onBookmark, onViewDetails }: ModernQuestionCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(question.isBookmarked || false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(question.id)
  }

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

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case "Easy":
        return "bg-green-500 text-white border-green-500"
      case "Medium":
        return "bg-yellow-500 text-white border-yellow-500"
      case "Hard":
        return "bg-red-500 text-white border-red-500"
      default:
        return "bg-gray-500 text-white border-gray-500"
    }
  }

  const getFrequencyColor = () => {
    if (question.frequency >= 80) return "text-red-600 bg-red-50"
    if (question.frequency >= 60) return "text-orange-600 bg-orange-50"
    if (question.frequency >= 40) return "text-yellow-600 bg-yellow-50"
    return "text-gray-600 bg-gray-50"
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-transparent hover:border-l-primary bg-white">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Top Row - Question ID and Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono bg-gray-50">
                  {question.id}
                </Badge>
                <Badge variant="outline" className={`text-xs font-medium ${getSubjectColor()}`}>
                  {question.subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {question.examType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Class {question.class}
                </Badge>
                <Badge className={`text-xs font-medium ${getDifficultyColor()}`}>{question.difficulty}</Badge>
              </div>
              <Badge variant="outline" className="text-xs">
                {question.year}
              </Badge>
            </div>

            {/* Question Title - 2 Lines */}
            <div className="space-y-2">
              <h3 className="font-semibold text-base leading-relaxed line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
                {question.title}
              </h3>

              {/* Topic and Chapter Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{question.chapter}</span>
                <span>•</span>
                <span>{question.topic}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {question.questionType}
                </Badge>
              </div>
            </div>

            {/* Question Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{question.timeToSolve} min</div>
                  <div className="text-xs text-muted-foreground">Time to solve</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    +{question.marks}/-{question.negativeMarks}
                  </div>
                  <div className="text-xs text-muted-foreground">Marks</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{question.frequency}%</div>
                  <div className="text-xs text-muted-foreground">Frequency</div>
                </div>
              </div>
            </div>

            {/* Difficulty Rating and Tags */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Difficulty:</span>
                  <StarRating rating={question.difficultyScore} maxRating={5} size="sm" />
                  <span className="text-xs text-muted-foreground">({question.difficultyScore}/5)</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor()}`}>
                  {question.frequency >= 80
                    ? "High Priority"
                    : question.frequency >= 60
                      ? "Medium Priority"
                      : question.frequency >= 40
                        ? "Low Priority"
                        : "Optional"}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {question.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {question.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{question.tags.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
              onClick={handleBookmark}
            >
              {isBookmarked ? <BookmarkCheck className="h-5 w-5 text-blue-600" /> : <Bookmark className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(question)}
              className="h-8 px-3 text-xs hover:bg-primary hover:text-primary-foreground"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
