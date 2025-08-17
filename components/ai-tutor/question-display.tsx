"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, TrendingUp, BookOpen, Lightbulb, CheckCircle } from "lucide-react"
import { useState } from "react"

interface QuestionDisplayProps {
  question: {
    id: string
    title: string
    subject: string
    chapter: string
    topic: string
    examType: string
    class: string
    difficulty: string
    timeToSolve: number
    marks: number
    frequency: number
    questionType: string
  }
  options?: Array<{
    option: string
    text: string
  }>
  onAnswerSelect?: (answer: string, option?: string) => void
  onHintRequest?: (level: "1" | "2" | "3") => void
  onSolutionRequest?: () => void
  showHints?: boolean
}

export function QuestionDisplay({
  question,
  options,
  onAnswerSelect,
  onHintRequest,
  onSolutionRequest,
  showHints = true,
}: QuestionDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [customAnswer, setCustomAnswer] = useState<string>("")

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
        return "bg-green-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Hard":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleSubmitAnswer = () => {
    if (options && selectedOption) {
      onAnswerSelect?.(selectedOption, selectedOption)
    } else if (customAnswer.trim()) {
      onAnswerSelect?.(customAnswer, undefined)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getSubjectColor()}>
              {question.subject}
            </Badge>
            <Badge variant="outline">{question.examType}</Badge>
            <Badge variant="outline">Class {question.class}</Badge>
            <Badge className={getDifficultyColor()}>{question.difficulty}</Badge>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {question.id}
          </Badge>
        </div>

        <CardTitle className="text-xl leading-relaxed">{question.title}</CardTitle>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium">{question.chapter}</span>
          <span>•</span>
          <span>{question.topic}</span>
          <span>•</span>
          <span>{question.questionType}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium">{question.timeToSolve} min</div>
              <div className="text-xs text-muted-foreground">Time limit</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Target className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-sm font-medium">+{question.marks}</div>
              <div className="text-xs text-muted-foreground">Marks</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <div>
              <div className="text-sm font-medium">{question.frequency}%</div>
              <div className="text-xs text-muted-foreground">Frequency</div>
            </div>
          </div>
        </div>

        {/* MCQ Options */}
        {options && (
          <div className="space-y-3">
            <h4 className="font-medium">Choose the correct answer:</h4>
            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option.option}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedOption === option.option ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="mcq-option"
                    value={option.option}
                    checked={selectedOption === option.option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="font-medium text-sm w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    {option.option}
                  </span>
                  <span className="text-sm">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Custom Answer Input for Non-MCQ */}
        {!options && (
          <div className="space-y-3">
            <h4 className="font-medium">Enter your answer:</h4>
            <textarea
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
              placeholder="Type your detailed answer here..."
              className="w-full p-3 border rounded-lg min-h-[100px] resize-none"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            {showHints && (
              <>
                <Button variant="outline" size="sm" onClick={() => onHintRequest?.("1")}>
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Hint
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSolutionRequest?.()}>
                  <BookOpen className="h-4 w-4 mr-1" />
                  Solution
                </Button>
              </>
            )}
          </div>

          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption && !customAnswer.trim()}
            className="min-w-[120px]"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Submit Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
