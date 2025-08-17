"use client"

import { type ReactNode, useState, useEffect } from "react"
import { BlurOverlay } from "./blur-overlay"

interface PermissionGuardProps {
  children: ReactNode
  requiredPermission: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, requiredPermission, fallback }: PermissionGuardProps) {
  // In a real app, this would come from your auth context or API
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user permissions
    const fetchPermissions = async () => {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For demo purposes, we'll randomly decide if user has premium
      // In production, this would be based on actual user data
      const hasPremium = Math.random() > 0.5

      setUserPermissions(hasPremium ? ["premium_access"] : [])
      setLoading(false)
    }

    fetchPermissions()
  }, [])

  useEffect(() => {
    // Prevent scrolling when overlay is shown
    const hasPermission = userPermissions.includes(requiredPermission)
    if (!loading && !hasPermission) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [userPermissions, requiredPermission, loading])

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  }

  const hasPermission = userPermissions.includes(requiredPermission)

  if (!hasPermission) {
    return (
      <div className="relative">
        <div className="pointer-events-none select-none">{fallback || children}</div>
        <BlurOverlay />
      </div>
    )
  }

  return <>{children}</>
}
