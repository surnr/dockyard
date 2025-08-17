"use client"

import { useState } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { ProfileHeader } from "@/components/profile/profile-header"
import { StartupProfile } from "@/components/profile/startup-profile"
import { ActivityHistory } from "@/components/profile/activity-history"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import {
  getCurrentUser,
  getUserApplications,
  getUserTickets,
  getUserBookings,
  getUserActivity,
  type User,
} from "@/lib/profile-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [user, setUser] = useState<User>(getCurrentUser())
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const applications = getUserApplications(user.id)
  const tickets = getUserTickets(user.id)
  const bookings = getUserBookings(user.id)
  const activities = getUserActivity(user.id)

  const handleEditProfile = () => {
    setEditDialogOpen(true)
  }

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    setUser({ ...user, ...updatedUser } as User)
    // In real app, this would make an API call to update the user
  }

  const renderProfileContent = () => {
    switch (user.type) {
      case "startup":
        return <StartupProfile user={user as any} applications={applications} tickets={tickets} bookings={bookings} />
      case "aspirant":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aspirant profile features coming soon...</p>
          </div>
        )
      case "investor":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Investor profile features coming soon...</p>
          </div>
        )
      case "mentor":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Mentor profile features coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container py-8 space-y-8">
        <ProfileHeader user={user} onEditProfile={handleEditProfile} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderProfileContent()}
          </TabsContent>

          <TabsContent value="activity">
            <ActivityHistory activities={activities} />
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        <EditProfileDialog
          user={user}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  )
}
