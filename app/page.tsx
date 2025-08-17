"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
  Star,
  Search,
  MessageCircle,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchClick = () => {
    const chatId = Date.now().toString()
    router.push(`/chat/${chatId}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const chatId = Date.now().toString()
    router.push(`/chat/${chatId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:50px_50px] opacity-20"></div>
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 4}px`,
            }}
          />
        ))}
      </div>

      <MainNav />

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-tight">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Startup
                </span>
                <span className="text-white">TN</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-medium">
                Empowering Tamil Nadu's startup ecosystem through AI-powered connections and opportunities
              </p>
            </div>

            <div className="w-full max-w-2xl mt-16">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ask AI: How can I get funding for my startup?"
                        className="pl-14 pr-6 h-14 bg-transparent border-0 text-white placeholder:text-white/60 text-lg focus:ring-0 focus:outline-none"
                        onClick={handleSearchClick}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleSearchClick}
                      className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ask AI
                    </Button>
                  </div>
                </div>
              </form>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  "Find funding opportunities",
                  "Connect with mentors",
                  "Discover startup events",
                  "Government schemes",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const chatId = Date.now().toString()
                      router.push(`/chat/${chatId}`)
                    }}
                    className="bg-white/10 border-white/20 text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm transition-all duration-300"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <img
                src="/tamil-nadu-cm-portrait.png"
                alt="Chief Minister"
                className="w-24 h-24 rounded-full border-4 border-primary/20"
              />
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 leading-relaxed">
              "We have set ourselves an ambitious target of becoming a $1 trillion economy by 2030"
            </blockquote>
            <cite className="text-lg text-gray-600 font-semibold">
              Thiru M.K. Stalin
              <br />
              <span className="text-sm text-gray-500">Hon'ble Chief Minister of Tamil Nadu</span>
            </cite>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tamil Nadu Startup Ecosystem</h2>
            <p className="text-white/90 text-xl">Leading India's entrepreneurial revolution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Startups", value: "4829", icon: TrendingUp },
              { label: "Unicorns", value: "108", icon: Award },
              { label: "Jobs Created", value: "47", icon: Users },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-white/90 text-lg font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Services <span className="text-pink-500">We Offer</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Here Is Our Directory Of Schemes Based On Our Various Policies To Support Startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Support Program",
                description:
                  "Facilitates support services, offering business grants for startups through comprehensive guidance systems.",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Sparkles,
                title: "Innovation Program",
                description:
                  "Participate in hackathons and access open innovation platforms to connect with industry leaders for collaborative solutions.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Award,
                title: "Funding Program",
                description:
                  "Explore funding opportunities from government departments, VCs, startups, and angel investors to accelerate growth.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Globe,
                title: "Infrastructure Facilities",
                description:
                  "Discover a range of infrastructure resources, including co-working spaces, labs, and specialized support for startups.",
                color: "from-green-500 to-green-600",
              },
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-r ${service.color} shadow-lg`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-4 text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                  <Button
                    variant="outline"
                    className="mt-6 text-pink-500 border-pink-500 hover:bg-pink-50 bg-transparent"
                  >
                    Explore →
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:50px_50px] opacity-10"></div>
        <div className="container relative z-10">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white border-0 shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Startup Journey?</h3>
              <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of entrepreneurs leveraging AI-powered insights to accelerate their growth in Tamil
                Nadu's thriving ecosystem.
              </p>
              <Button
                size="lg"
                className="text-lg px-10 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
