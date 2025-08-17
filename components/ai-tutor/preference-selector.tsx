"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  GraduationCap,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  ArrowLeft,
  Clock,
} from "lucide-react"
import { useState } from "react"

interface PreferenceSelectorProps {
  onPreferencesSelect: (preferences: {
    class: "11" | "12"
    subject: "Physics" | "Chemistry" | "Mathematics"
    examType: "JEE Main" | "JEE Advanced"
    difficulty?: "Easy" | "Medium" | "Hard"
  }) => void
}

export function PreferenceSelector({ onPreferencesSelect }: PreferenceSelectorProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedClass, setSelectedClass] = useState<"11" | "12" | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<"Physics" | "Chemistry" | "Mathematics" | null>(null)
  const [selectedExamType, setSelectedExamType] = useState<"JEE Main" | "JEE Advanced" | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<"Easy" | "Medium" | "Hard" | null>(null)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleClassSelect = (classValue: "11" | "12") => {
    setSelectedClass(classValue)
    setTimeout(() => setCurrentStep(2), 300)
  }

  const handleSubjectSelect = (subject: "Physics" | "Chemistry" | "Mathematics") => {
    setSelectedSubject(subject)
    setTimeout(() => setCurrentStep(3), 300)
  }

  const handleExamTypeSelect = (examType: "JEE Main" | "JEE Advanced") => {
    setSelectedExamType(examType)
    setTimeout(() => setCurrentStep(4), 300)
  }

  const handleDifficultySelect = (difficulty: "Easy" | "Medium" | "Hard") => {
    setSelectedDifficulty(difficulty)
  }

  const handleStartPractice = () => {
    if (selectedClass && selectedSubject && selectedExamType) {
      onPreferencesSelect({
        class: selectedClass,
        subject: selectedSubject,
        examType: selectedExamType,
        difficulty: selectedDifficulty || undefined,
      })
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetSelection = () => {
    setCurrentStep(1)
    setSelectedClass(null)
    setSelectedSubject(null)
    setSelectedExamType(null)
    setSelectedDifficulty(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to AI Tutor! 🚀
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized AI companion for JEE preparation. Let's set up your learning preferences in just a few
            clicks!
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-900">Quick Setup</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />

            {/* Selected Values Display */}
            {(selectedClass || selectedSubject || selectedExamType || selectedDifficulty) && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectedClass && (
                  <Badge className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">Class {selectedClass}</Badge>
                )}
                {selectedSubject && (
                  <Badge className="text-xs bg-green-100 text-green-700 hover:bg-green-200">{selectedSubject}</Badge>
                )}
                {selectedExamType && (
                  <Badge className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                    {selectedExamType}
                  </Badge>
                )}
                {selectedDifficulty && (
                  <Badge className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-200">
                    {selectedDifficulty}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetSelection}
                  className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Selection Card */}
      <Card className="border-0 shadow-xl bg-white min-h-[500px]">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Step 1: Class Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Select Your Class</h2>
                  <p className="text-gray-600 text-lg">Choose your current academic level</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {[
                    {
                      class: "11" as const,
                      title: "Class 11",
                      desc: "Foundation & Core Concepts",
                      details: "Build strong fundamentals in Physics, Chemistry & Mathematics",
                      icon: "📚",
                      gradient: "from-blue-400 to-blue-600",
                      hoverGradient: "from-blue-500 to-blue-700",
                    },
                    {
                      class: "12" as const,
                      title: "Class 12",
                      desc: "Advanced Topics & JEE Focus",
                      details: "Master advanced concepts and JEE problem solving",
                      icon: "🎓",
                      gradient: "from-purple-400 to-purple-600",
                      hoverGradient: "from-purple-500 to-purple-700",
                    },
                  ].map((item) => (
                    <div
                      key={item.class}
                      onClick={() => handleClassSelect(item.class)}
                      className="cursor-pointer group"
                    >
                      <Card className="h-full border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                        <CardContent className="p-6">
                          <div className="space-y-4 text-center">
                            <div
                              className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.gradient} group-hover:bg-gradient-to-br group-hover:${item.hoverGradient} flex items-center justify-center text-2xl mx-auto shadow-lg transition-all duration-200`}
                            >
                              {item.icon}
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                              <p className="font-medium text-blue-600">{item.desc}</p>
                              <p className="text-sm text-gray-500 leading-relaxed px-2">{item.details}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Subject Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Choose Your Subject</h2>
                  <p className="text-gray-600 text-lg">Pick the subject you want to practice</p>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                  {[
                    {
                      name: "Physics" as const,
                      icon: "⚡",
                      desc: "Mechanics, Thermodynamics & Electromagnetism",
                      questions: "2,500+ Questions",
                      gradient: "from-blue-400 to-cyan-500",
                      hoverGradient: "from-blue-500 to-cyan-600",
                      bgColor: "bg-blue-50",
                      borderColor: "border-blue-200",
                      hoverBorderColor: "hover:border-blue-400",
                      topics: ["Mechanics", "Waves", "Thermodynamics", "Electromagnetism"],
                    },
                    {
                      name: "Chemistry" as const,
                      icon: "🧪",
                      desc: "Organic, Inorganic & Physical Chemistry",
                      questions: "2,200+ Questions",
                      gradient: "from-green-400 to-emerald-500",
                      hoverGradient: "from-green-500 to-emerald-600",
                      bgColor: "bg-green-50",
                      borderColor: "border-green-200",
                      hoverBorderColor: "hover:border-green-400",
                      topics: ["Organic", "Inorganic", "Physical", "Analytical"],
                    },
                    {
                      name: "Mathematics" as const,
                      icon: "📐",
                      desc: "Algebra, Calculus & Coordinate Geometry",
                      questions: "3,000+ Questions",
                      gradient: "from-purple-400 to-pink-500",
                      hoverGradient: "from-purple-500 to-pink-600",
                      bgColor: "bg-purple-50",
                      borderColor: "border-purple-200",
                      hoverBorderColor: "hover:border-purple-400",
                      topics: ["Algebra", "Calculus", "Geometry", "Trigonometry"],
                    },
                  ].map((subject) => (
                    <div
                      key={subject.name}
                      onClick={() => handleSubjectSelect(subject.name)}
                      className="cursor-pointer group"
                    >
                      <Card
                        className={`border-2 ${subject.borderColor} ${subject.hoverBorderColor} hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-6">
                            <div
                              className={`h-16 w-16 rounded-xl bg-gradient-to-br ${subject.gradient} group-hover:bg-gradient-to-br group-hover:${subject.hoverGradient} flex items-center justify-center text-3xl shadow-lg transition-all duration-200`}
                            >
                              {subject.icon}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="font-bold text-xl text-gray-900">{subject.name}</h3>
                              <p className="text-gray-600">{subject.desc}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={`text-xs ${subject.bgColor} text-gray-700 border-0`}>
                                  {subject.questions}
                                </Badge>
                                <div className="flex gap-1 flex-wrap">
                                  {subject.topics.slice(0, 3).map((topic, index) => (
                                    <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Exam Type Selection */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Select Exam Type</h2>
                  <p className="text-gray-600 text-lg">Choose your target examination</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {[
                    {
                      name: "JEE Main" as const,
                      desc: "For NIT, IIIT & State Engineering Colleges",
                      icon: "🎯",
                      gradient: "from-blue-400 to-blue-600",
                      hoverGradient: "from-blue-500 to-blue-700",
                      borderColor: "border-blue-200",
                      hoverBorderColor: "hover:border-blue-400",
                      features: [
                        "Multiple Choice Questions",
                        "Numerical Problems",
                        "3 Hours Duration",
                        "Moderate Difficulty",
                      ],
                      eligibility: "After Class 12",
                    },
                    {
                      name: "JEE Advanced" as const,
                      desc: "For IIT Admissions (After JEE Main)",
                      icon: "🏆",
                      gradient: "from-orange-400 to-red-500",
                      hoverGradient: "from-orange-500 to-red-600",
                      borderColor: "border-orange-200",
                      hoverBorderColor: "hover:border-orange-400",
                      features: ["Complex Problems", "Multi-Concept Questions", "6 Hours Duration", "High Difficulty"],
                      eligibility: "Top 2.5 Lakh in JEE Main",
                    },
                  ].map((exam) => (
                    <div
                      key={exam.name}
                      onClick={() => handleExamTypeSelect(exam.name)}
                      className="cursor-pointer group"
                    >
                      <Card
                        className={`border-2 ${exam.borderColor} ${exam.hoverBorderColor} hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
                      >
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="text-center">
                              <div
                                className={`h-16 w-16 rounded-full bg-gradient-to-br ${exam.gradient} group-hover:bg-gradient-to-br group-hover:${exam.hoverGradient} flex items-center justify-center text-3xl mx-auto shadow-lg transition-all duration-200`}
                              >
                                {exam.icon}
                              </div>
                              <h3 className="font-bold text-xl text-gray-900 mt-3">{exam.name}</h3>
                              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{exam.desc}</p>
                              <Badge className="mt-2 text-xs bg-gray-100 text-gray-700 border-0">
                                {exam.eligibility}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              {exam.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Difficulty Selection */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto">
                    <Trophy className="h-8 w-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Choose Difficulty Level</h2>
                  <p className="text-gray-600 text-lg">
                    Optional: Select your preferred difficulty (you can change this anytime)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {[
                    {
                      name: "Easy" as const,
                      desc: "Build Confidence & Foundation",
                      icon: "🌱",
                      gradient: "from-green-400 to-emerald-500",
                      selectedBg: "bg-gradient-to-br from-green-400 to-emerald-500",
                      borderColor: "border-green-200",
                      hoverBorderColor: "hover:border-green-400",
                      selectedBorderColor: "border-green-500",
                      features: ["Basic Concepts", "Simple Problems", "Quick Solutions"],
                      percentage: "30%",
                    },
                    {
                      name: "Medium" as const,
                      desc: "Standard JEE Level Practice",
                      icon: "⚡",
                      gradient: "from-yellow-400 to-orange-500",
                      selectedBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
                      borderColor: "border-yellow-200",
                      hoverBorderColor: "hover:border-yellow-400",
                      selectedBorderColor: "border-yellow-500",
                      features: ["Mixed Concepts", "Moderate Complexity", "Exam Pattern"],
                      percentage: "50%",
                    },
                    {
                      name: "Hard" as const,
                      desc: "Challenge Yourself & Excel",
                      icon: "🔥",
                      gradient: "from-red-400 to-pink-500",
                      selectedBg: "bg-gradient-to-br from-red-400 to-pink-500",
                      borderColor: "border-red-200",
                      hoverBorderColor: "hover:border-red-400",
                      selectedBorderColor: "border-red-500",
                      features: ["Advanced Problems", "Multi-Step Solutions", "Competition Level"],
                      percentage: "20%",
                    },
                  ].map((difficulty) => (
                    <div
                      key={difficulty.name}
                      onClick={() => handleDifficultySelect(difficulty.name)}
                      className="cursor-pointer group"
                    >
                      <Card
                        className={`border-2 transition-all duration-200 group-hover:scale-105 ${
                          selectedDifficulty === difficulty.name
                            ? `${difficulty.selectedBorderColor} shadow-lg`
                            : `${difficulty.borderColor} ${difficulty.hoverBorderColor} hover:shadow-lg`
                        }`}
                      >
                        <CardContent
                          className={`p-6 transition-all duration-200 ${
                            selectedDifficulty === difficulty.name ? `${difficulty.selectedBg} text-white` : "bg-white"
                          }`}
                        >
                          <div className="space-y-4 text-center">
                            <div
                              className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl mx-auto shadow-lg transition-all duration-200 ${
                                selectedDifficulty === difficulty.name
                                  ? "bg-white/20 text-white"
                                  : `bg-gradient-to-br ${difficulty.gradient}`
                              }`}
                            >
                              {difficulty.icon}
                            </div>
                            <div>
                              <h3
                                className={`font-bold text-lg ${
                                  selectedDifficulty === difficulty.name ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {difficulty.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  selectedDifficulty === difficulty.name ? "text-white/90" : "text-gray-600"
                                }`}
                              >
                                {difficulty.desc}
                              </p>
                              <Badge
                                className={`mt-2 text-xs border-0 ${
                                  selectedDifficulty === difficulty.name
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {difficulty.percentage} of questions
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              {difficulty.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className={`text-xs ${
                                    selectedDifficulty === difficulty.name ? "text-white/80" : "text-gray-500"
                                  }`}
                                >
                                  {feature}
                                </div>
                              ))}
                            </div>
                            {selectedDifficulty === difficulty.name && (
                              <CheckCircle className="h-5 w-5 text-white mx-auto" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Start Button */}
                <div className="text-center pt-6 border-t">
                  <Button
                    onClick={handleStartPractice}
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start AI Tutoring Session
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    🎯 Ready to practice {selectedSubject} for {selectedExamType}
                    {selectedDifficulty && ` at ${selectedDifficulty} level`}!
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep > 1 && (
              <div className="flex justify-start pt-6 border-t">
                <Button variant="outline" onClick={goBack} className="flex items-center gap-2 hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Personalized Questions</h4>
              <p className="text-sm text-gray-600">AI selects questions based on your level and progress</p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Instant Help</h4>
              <p className="text-sm text-gray-600">Get hints, explanations, and step-by-step solutions</p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center mx-auto">
                <Trophy className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Track Progress</h4>
              <p className="text-sm text-gray-600">Monitor your improvement and identify weak areas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
