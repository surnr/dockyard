"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, maxRating = 5, size = "sm", className }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            index < rating ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
    </div>
  )
}
