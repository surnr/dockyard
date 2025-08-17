"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, User, Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your StartupTN AI assistant. I can help you with funding opportunities, mentorship programs, startup resources, and navigating the Tamil Nadu startup ecosystem. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me funding opportunities for early-stage startups",
        "Find mentors in the AI/ML sector",
        "What are the requirements for TIDCO funding?",
        "Connect me with investors in Chennai",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
        suggestions: generateSuggestions(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("funding") || lowerQuery.includes("investment")) {
      return "Based on your query about funding, here are some relevant opportunities:\n\n• **TIDCO Startup Fund** - Up to ₹50L for early-stage startups\n• **TANFUND** - Seed funding for innovative ideas\n• **Angel Investor Network** - Connect with 200+ verified investors\n• **Government Grants** - Various sector-specific grants available\n\nWould you like me to help you apply for any of these programs or connect you with specific investors?"
    }

    if (lowerQuery.includes("mentor") || lowerQuery.includes("guidance")) {
      return "I can help you find the right mentors! Here's what's available:\n\n• **Industry Experts** - 500+ mentors across sectors\n• **Successful Entrepreneurs** - Learn from those who've built successful startups\n• **Technical Advisors** - Get guidance on product development\n• **Business Strategists** - Help with scaling and growth\n\nWhat specific area would you like mentorship in? I can match you with relevant mentors."
    }

    return "I understand you're looking for information about the startup ecosystem. Let me help you with that! The StartupTN platform offers comprehensive support including funding opportunities, mentorship programs, networking events, and resources for entrepreneurs at every stage. What specific aspect would you like to explore further?"
  }

  const generateSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("funding")) {
      return [
        "Tell me about TIDCO application process",
        "What documents do I need for funding?",
        "Connect me with angel investors",
        "Show me government grant schemes",
      ]
    }

    if (lowerQuery.includes("mentor")) {
      return [
        "Find mentors in my sector",
        "How do I book a mentorship session?",
        "Show me mentor profiles",
        "What's the mentorship process?",
      ]
    }

    return [
      "Show me upcoming startup events",
      "Help me create a business plan",
      "Find co-working spaces in Chennai",
      "Connect me with other entrepreneurs",
    ]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MainNav />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Chat Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">StartupTN AI Assistant</h1>
              <p className="text-slate-600">Chat ID: {chatId}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            Online • Ready to help
          </Badge>
        </div>

        {/* Messages Container */}
        <Card className="mb-6 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" ? "bg-slate-200" : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={`flex-1 max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === "user" ? "bg-emerald-500 text-white ml-auto" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>

                  {message.type === "assistant" && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  {message.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-8 bg-white hover:bg-emerald-50 hover:border-emerald-200"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about funding, mentors, programs, or anything startup-related..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
