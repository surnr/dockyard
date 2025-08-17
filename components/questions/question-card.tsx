"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/lib/questions-data"
import { Clock, Target, TrendingUp, Bookmark, BookmarkCheck, CheckCircle, XCircle, Circle, Play } from "lucide-react"

interface QuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onSolve?: (questionId: string) => void
}

export function QuestionCard({ question, onBookmark, onSolve }: QuestionCardProps) {
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
      case "not-attempted":
        return <Circle className="h-4 w-4 text-gray-400" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (question.status) {
      case "correct":
        return "text-green-600 bg-green-50 border-green-200"
      case "incorrect":
        return "text-red-600 bg-red-50 border-red-200"
      case "not-attempted":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case "Easy":
        return "text-green-700 bg-green-100 border-green-200"
      case "Medium":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "Hard":
        return "text-red-700 bg-red-100 border-red-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getSubjectColor = () => {
    switch (question.subject) {
      case "Physics":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "Chemistry":
        return "text-green-700 bg-green-100 border-green-200"
      case "Mathematics":
        return "text-purple-700 bg-purple-100 border-purple-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getSubjectColor()}`}>
                {question.subject}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.examType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Class {question.class}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor()}`}>
                {question.difficulty}
              </Badge>
            </div>
            <h3 className="font-medium text-sm leading-relaxed line-clamp-2 group-hover:text-primary transition-colors">
              {question.title}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{question.chapter}</span>
              <span>•</span>
              <span>{question.topic}</span>
              <span>•</span>
              <span>{question.year}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {getStatusIcon()}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-blue-600" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Question Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="text-muted-foreground">Frequency</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Appears in {question.frequency}% papers</span>
                </div>
                <Progress value={question.frequency} className="h-1.5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Target className="h-3 w-3 text-green-600" />
                <span className="text-muted-foreground">Difficulty</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{question.difficultyScore}/5</span>
                </div>
                <Progress value={(question.difficultyScore / 5) * 100} className="h-1.5" />
              </div>
            </div>
          </div>

          {/* Question Details */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-orange-600" />
                <span>{question.timeToSolve} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-blue-600" />
                <span>
                  +{question.marks} / -{question.negativeMarks}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {question.questionType}
              </Badge>
            </div>
            <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
              {question.status?.replace("-", " ") || "Not Attempted"}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {question.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {question.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{question.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <Button className="w-full" size="sm" onClick={() => onSolve?.(question.id)}>
            <Play className="h-4 w-4 mr-2" />
            {question.status === "not-attempted" ? "Solve Question" : "Review Solution"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
