"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Copy, MessageCircle, Mail, Star, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactDialogProps {
  onClose?: () => void
  title?: string
  description?: string
}

export function ContactDialog({ onClose, title, description }: ContactDialogProps) {
  const { toast } = useToast()
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const whatsappNumber = "+91 98765 43210"
  const emailAddress = "premium@jeeify.com"

  const copyToClipboard = async (text: string, type: "whatsapp" | "email") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "whatsapp") {
        setCopiedWhatsApp(true)
        setTimeout(() => setCopiedWhatsApp(false), 2000)
      } else {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      }
      toast({
        title: "Copied!",
        description: `${type === "whatsapp" ? "WhatsApp number" : "Email address"} copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in upgrading to Jeeify Premium. Can you help me with the subscription process?",
    )
    window.open(`https://wa.me/${whatsappNumber.replace(/\s+/g, "")}?text=${message}`, "_blank")
  }

  const openEmail = () => {
    const subject = encodeURIComponent("Jeeify Premium Subscription Inquiry")
    const body = encodeURIComponent(
      "Hi,\n\nI'm interested in upgrading to Jeeify Premium to access personalized AI tutoring and advanced analytics.\n\nCould you please help me with the subscription process?\n\nThank you!",
    )
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-background/50 flex items-center justify-center z-50 overflow-hidden p-4">
      <Card className="w-full max-w-[500px] shadow-2xl border-2 max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Star className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title || "Ready to Ace JEE 2025?"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {description ||
                "Join 10,000+ students who improved their JEE scores by 80+ points with our AI-powered personalized learning"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Stories */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">10,000+</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">80+</div>
              <div className="text-xs text-muted-foreground">Avg. Improvement</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          <Separator />

          {/* Premium Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-center">What You'll Get with Premium:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">AI Tutor with Voice Chat</p>
                  <p className="text-xs text-muted-foreground">Get instant help 24/7 with voice conversations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">80/20 Study Optimization</p>
                  <p className="text-xs text-muted-foreground">Focus on 20% topics that give 80% marks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Personalized Study Plan</p>
                  <p className="text-xs text-muted-foreground">AI creates your daily study schedule</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Advanced Analytics</p>
                  <p className="text-xs text-muted-foreground">Track progress with detailed insights</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Urgency */}
          <div className="text-center space-y-2">
            <Badge variant="destructive" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Limited Time: 50% OFF First Month
            </Badge>
            <p className="text-sm text-muted-foreground">
              Only <span className="font-semibold text-foreground">₹499</span> instead of ₹999 for your first month!
            </p>
          </div>

          <Separator />

          {/* Contact Options */}
          <div className="space-y-4">
            <h4 className="font-semibold text-center">Get Premium Access Now:</h4>

            {/* WhatsApp */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">WhatsApp (Instant Response)</span>
                <Badge variant="secondary" className="text-xs">
                  Recommended
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm">{whatsappNumber}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(whatsappNumber, "whatsapp")}
                  className="flex-shrink-0"
                >
                  {copiedWhatsApp ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button size="sm" onClick={openWhatsApp} className="flex-shrink-0 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm">{emailAddress}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(emailAddress, "email")}
                  className="flex-shrink-0"
                >
                  {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button size="sm" onClick={openEmail} className="flex-shrink-0">
                  <Mail className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm italic text-blue-900">
              "I improved my JEE score from 180 to 265 in just 3 months using Jeeify's AI tutor. The 80/20 method is
              game-changing!"
            </p>
            <p className="text-xs text-blue-700 mt-2 font-medium">- Priya S., JEE 2024 (AIR 1,247)</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-6">
          <div className="text-center text-xs text-muted-foreground">
            <p>💡 Most students see 50+ point improvement in first month</p>
            <p>🎯 Money-back guarantee if not satisfied</p>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose} className="w-full">
              Maybe Later
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
