"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/lib/profile-data"
import { Calendar, Edit, MapPin, Users } from "lucide-react"

interface ProfileHeaderProps {
  user: User
  onEditProfile: () => void
}

export function ProfileHeader({ user, onEditProfile }: ProfileHeaderProps) {
  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "startup":
        return "bg-blue-100 text-blue-800"
      case "aspirant":
        return "bg-green-100 text-green-800"
      case "investor":
        return "bg-orange-100 text-orange-800"
      case "mentor":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge className={getUserTypeColor(user.type)} variant="secondary">
                  {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground space-x-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.registrationDate).toLocaleDateString()}</span>
                </div>
              </div>
              {user.type === "startup" && (
                <div className="space-y-1">
                  <p className="font-medium">{user.companyName}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Sector: {user.sector}</span>
                    <span>Stage: {user.stage}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{user.teamSize} members</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button onClick={onEditProfile} className="md:self-start">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
