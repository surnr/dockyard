"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { ContactDialog } from "./contact-dialog"

export function BlurOverlay() {
  const [showContactDialog, setShowContactDialog] = useState(false)

  if (showContactDialog) {
    return <ContactDialog onClose={() => setShowContactDialog(false)} />
  }

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-background/30 flex items-center justify-center z-50 overflow-hidden">
      <Card className="w-[420px] shadow-2xl border-2 mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Upgrade to Premium
          </CardTitle>
          <CardDescription className="text-base">Unlock personalized insights and advanced analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Personalized Study Plan</p>
                <p className="text-sm text-muted-foreground">
                  AI-powered study recommendations based on your performance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Advanced Analytics</p>
                <p className="text-sm text-muted-foreground">Detailed insights into your strengths and weaknesses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="font-medium">80/20 Optimization</p>
                <p className="text-sm text-muted-foreground">
                  Focus on high-impact concepts that appear frequently in JEE
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="font-medium">AI Tutor Chat</p>
                <p className="text-sm text-muted-foreground">Get instant help with voice and text conversations</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-6">
          <Button
            onClick={() => setShowContactDialog(true)}
            className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Upgrade to Premium - ₹999/month
          </Button>
          <Button variant="outline" onClick={() => setShowContactDialog(true)} className="w-full h-10">
            Learn More About Features
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
