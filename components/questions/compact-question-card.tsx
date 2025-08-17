"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions-data"
import { Eye, Bookmark, BookmarkCheck, CheckCircle, XCircle, Circle, Clock, Target, TrendingUp } from "lucide-react"

interface CompactQuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onViewDetails?: (question: Question) => void
}

export function CompactQuestionCard({ question, onBookmark, onViewDetails }: CompactQuestionCardProps) {
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
        return "text-blue-700 bg-blue-50"
      case "Chemistry":
        return "text-green-700 bg-green-50"
      case "Mathematics":
        return "text-purple-700 bg-purple-50"
      default:
        return "text-gray-700 bg-gray-50"
    }
  }

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case "Easy":
        return "text-green-700 bg-green-100"
      case "Medium":
        return "text-yellow-700 bg-yellow-100"
      case "Hard":
        return "text-red-700 bg-red-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-l-2 border-l-transparent hover:border-l-primary">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Header Row - Compact badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="outline" className="text-xs h-5 px-1.5 font-mono">
                  {question.id}
                </Badge>
                <Badge className={`text-xs h-5 px-1.5 ${getSubjectColor()}`}>{question.subject}</Badge>
                <Badge className={`text-xs h-5 px-1.5 ${getDifficultyColor()}`}>{question.difficulty}</Badge>
                <Badge variant="outline" className="text-xs h-5 px-1.5">
                  {question.examType}
                </Badge>
                <Badge variant="outline" className="text-xs h-5 px-1.5">
                  {question.year}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleBookmark}>
                  {isBookmarked ? (
                    <BookmarkCheck className="h-3.5 w-3.5 text-blue-600" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => onViewDetails?.(question)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>

            {/* Question Text - More lines, larger text */}
            <div className="space-y-1">
              <p className="text-sm font-medium leading-relaxed line-clamp-3 text-gray-900 min-h-[3.75rem]">
                {question.title}
              </p>

              {/* Topic info - compact */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium">{question.chapter}</span>
                <span>•</span>
                <span>{question.topic}</span>
                <span>•</span>
                <span>{question.questionType}</span>
              </div>
            </div>

            {/* Stats Row - Inline and compact */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-blue-600">
                  <Clock className="h-3 w-3" />
                  <span>{question.timeToSolve}m</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <Target className="h-3 w-3" />
                  <span>
                    +{question.marks}/-{question.negativeMarks}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-purple-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>{question.frequency}%</span>
                </div>
              </div>

              {/* Tags - compact */}
              <div className="flex gap-1">
                {question.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs h-4 px-1">
                    {tag}
                  </Badge>
                ))}
                {question.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    +{question.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
