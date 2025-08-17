"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Lightbulb, BookOpen, ArrowRight, RotateCcw } from "lucide-react"

interface SolutionDisplayProps {
  isCorrect: boolean
  correctAnswer: string
  explanation: string
  studentAnswer?: string
  selectedOption?: string
  encouragement: string
  solution?: string[]
  keyFormulas?: string[]
  onNextQuestion?: () => void
  onTryAgain?: () => void
}

export function SolutionDisplay({
  isCorrect,
  correctAnswer,
  explanation,
  studentAnswer,
  selectedOption,
  encouragement,
  solution,
  keyFormulas,
  onNextQuestion,
  onTryAgain,
}: SolutionDisplayProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <XCircle className="h-6 w-6 text-red-600" />
          )}
          <CardTitle className={isCorrect ? "text-green-700" : "text-red-700"}>{encouragement}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Answer Comparison */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Your Answer
            </h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">{selectedOption ? `Option ${selectedOption}` : studentAnswer}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Correct Answer
            </h4>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium">{correctAnswer}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Explanation */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Explanation
          </h4>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>
        </div>

        {/* Step-by-step Solution */}
        {solution && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Step-by-Step Solution
            </h4>
            <div className="space-y-2">
              {solution.map((step, index) => (
                <div key={index} className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <p className="text-sm flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Formulas */}
        {keyFormulas && keyFormulas.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Key Formulas Used</h4>
            <div className="flex flex-wrap gap-2">
              {keyFormulas.map((formula, index) => (
                <Badge key={index} variant="secondary" className="font-mono text-sm">
                  {formula}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            {!isCorrect && (
              <Button variant="outline" onClick={onTryAgain}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
          </div>

          <Button onClick={onNextQuestion} className="min-w-[140px]">
            Next Question
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Encouragement Message */}
        <div
          className={`p-4 rounded-lg border ${
            isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <p className="text-sm text-center">
            {isCorrect
              ? "🎉 Great job! Keep up the excellent work. Ready for the next challenge?"
              : "💪 Don't worry! Learning from mistakes is part of the process. You're getting better with each question!"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
