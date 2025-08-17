"use client"

import { useState } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { TicketForm } from "@/components/support/ticket-form"
import { TicketList } from "@/components/support/ticket-list"
import { TicketDetails } from "@/components/support/ticket-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supportTicketsData, getTicketStats, type SupportTicket } from "@/lib/support-data"
import { Plus, TicketIcon, Clock, AlertCircle, TrendingUp } from "lucide-react"

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(supportTicketsData)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [activeTab, setActiveTab] = useState("my-tickets")

  const stats = getTicketStats()
  const userTickets = tickets.filter((ticket) => ticket.userId === "user1") // Mock current user

  const handleCreateTicket = (newTicket: SupportTicket) => {
    setTickets((prev) => [newTicket, ...prev])
    setShowTicketForm(false)
    setSelectedTicket(newTicket)
    setActiveTab("my-tickets")
  }

  const handleUpdateTicket = (ticketId: string, updates: Partial<SupportTicket>) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, ...updates } : ticket)))

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  const handleTicketSelect = (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    setShowTicketForm(false)
  }

  if (showTicketForm) {
    return (
      <div className="min-h-screen bg-background">
        <MainNav />
        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            <TicketForm onSubmit={handleCreateTicket} onCancel={() => setShowTicketForm(false)} />
          </div>
        </div>
      </div>
    )
  }

  if (selectedTicket) {
    return (
      <div className="min-h-screen bg-background">
        <MainNav />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <TicketDetails
              ticket={selectedTicket}
              onClose={() => setSelectedTicket(null)}
              onUpdateTicket={handleUpdateTicket}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Get help with your account, report issues, and track your support requests. Our team is here to assist you
              with any questions or problems you may have.
            </p>
          </div>
          <Button onClick={() => setShowTicketForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <TicketIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.open}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{stats.satisfactionRate}</div>
              <p className="text-xs text-muted-foreground">Customer feedback</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
            <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tickets">
            <TicketList
              tickets={userTickets}
              onTicketSelect={handleTicketSelect}
              selectedTicketId={selectedTicket?.id}
            />
          </TabsContent>

          <TabsContent value="all-tickets">
            <TicketList tickets={tickets} onTicketSelect={handleTicketSelect} selectedTicketId={selectedTicket?.id} />
          </TabsContent>

          <TabsContent value="knowledge-base">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        How to create your startup profile
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Understanding the application process
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Setting up your account
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Navigating the platform
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Login and password problems
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        File upload errors
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Profile update issues
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Search not working properly
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Updating your information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Managing notifications
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Privacy settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Deleting your account
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
