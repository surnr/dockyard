"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactDialog } from "./contact-dialog"
import { Crown } from "lucide-react"

interface UpgradeButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
  title?: string
  description?: string
}

export function UpgradeButton({
  variant = "default",
  size = "default",
  className,
  children,
  title,
  description,
}: UpgradeButtonProps) {
  const [showContactDialog, setShowContactDialog] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setShowContactDialog(true)}>
        {children || (
          <>
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </>
        )}
      </Button>

      {showContactDialog && (
        <ContactDialog title={title} description={description} onClose={() => setShowContactDialog(false)} />
      )}
    </>
  )
}
