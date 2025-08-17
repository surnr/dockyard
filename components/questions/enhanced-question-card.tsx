"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions-data"
import {
  Eye,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  XCircle,
  Circle,
  Clock,
  Target,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react"

interface EnhancedQuestionCardProps {
  question: Question
  onBookmark?: (questionId: string) => void
  onViewDetails?: (question: Question) => void
}

export function EnhancedQuestionCard({ question, onBookmark, onViewDetails }: EnhancedQuestionCardProps) {
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

  const getSubjectGradient = () => {
    switch (question.subject) {
      case "Physics":
        return "from-blue-500 to-blue-600"
      case "Chemistry":
        return "from-green-500 to-green-600"
      case "Mathematics":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getSubjectColor = () => {
    switch (question.subject) {
      case "Physics":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Chemistry":
        return "bg-green-50 text-green-700 border-green-200"
      case "Mathematics":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getDifficultyConfig = () => {
    switch (question.difficulty) {
      case "Easy":
        return {
          color: "bg-green-500 text-white",
          icon: Star,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
        }
      case "Medium":
        return {
          color: "bg-yellow-500 text-white",
          icon: Zap,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
        }
      case "Hard":
        return {
          color: "bg-red-500 text-white",
          icon: Zap,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
        }
      default:
        return {
          color: "bg-gray-500 text-white",
          icon: Star,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
        }
    }
  }

  const difficultyConfig = getDifficultyConfig()
  const DifficultyIcon = difficultyConfig.icon

  const getFrequencyLevel = () => {
    if (question.frequency >= 80) return { label: "Very High", color: "text-red-600", bg: "bg-red-50" }
    if (question.frequency >= 60) return { label: "High", color: "text-orange-600", bg: "bg-orange-50" }
    if (question.frequency >= 40) return { label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { label: "Low", color: "text-gray-600", bg: "bg-gray-50" }
  }

  const frequencyLevel = getFrequencyLevel()

  return (
    <Card className="hover:shadow-xl transition-all duration-300 group border-0 bg-white overflow-hidden">
      {/* Subject Color Bar */}
      <div className={`h-1 bg-gradient-to-r ${getSubjectGradient()}`} />

      <CardContent className="p-6">
        <div className="space-y-5">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs font-mono bg-gray-50 text-gray-600">
                  {question.id}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs font-medium ${getSubjectColor()}`}>{question.subject}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {question.examType}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Class {question.class}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={`text-xs font-medium ${difficultyConfig.color} flex items-center gap-1`}>
                <DifficultyIcon className="h-3 w-3" />
                {question.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.year}
              </Badge>
            </div>
          </div>

          {/* Question Title - Enhanced 2 Lines */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg leading-relaxed line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] text-gray-900">
              {question.title}
            </h3>

            {/* Topic Info with better styling */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-gray-700">{question.chapter}</span>
              </div>
              <span className="text-gray-400">→</span>
              <span className="text-gray-600">{question.topic}</span>
              <span className="text-gray-400">•</span>
              <Badge variant="secondary" className="text-xs">
                {question.questionType}
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">{question.timeToSolve} min</div>
                <div className="text-xs text-blue-600">Time to solve</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-900">
                  +{question.marks}/-{question.negativeMarks}
                </div>
                <div className="text-xs text-green-600">Marks</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-900">{question.frequency}%</div>
                <div className="text-xs text-purple-600">Frequency</div>
              </div>
            </div>
          </div>

          {/* Difficulty and Priority Row */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Difficulty:</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < question.difficultyScore ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({question.difficultyScore}/5)</span>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-sm font-medium ${frequencyLevel.bg} ${frequencyLevel.color}`}>
              {frequencyLevel.label} Priority
            </div>
          </div>

          {/* Tags and Actions Row */}
          <div className="flex items-center justify-between">
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

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                onClick={handleBookmark}
              >
                {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-blue-600" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                onClick={() => onViewDetails?.(question)}
                className="h-8 px-4 text-xs bg-primary hover:bg-primary/90"
              >
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
