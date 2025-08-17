"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { SupportTicket, TicketMessage } from "@/lib/support-data"
import { format } from "date-fns"
import { Send, Paperclip, Download, User, Clock, Tag, AlertCircle } from "lucide-react"

interface TicketDetailsProps {
  ticket: SupportTicket
  onClose: () => void
  onUpdateTicket: (ticketId: string, updates: Partial<SupportTicket>) => void
}

export function TicketDetails({ ticket, onClose, onUpdateTicket }: TicketDetailsProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    const message: TicketMessage = {
      id: `msg-${Date.now()}`,
      ticketId: ticket.id,
      message: newMessage,
      sender: "user",
      senderName: "Current User",
      timestamp: new Date().toISOString(),
    }

    const updatedConversation = [...ticket.conversation, message]

    onUpdateTicket(ticket.id, {
      conversation: updatedConversation,
      updatedAt: new Date().toISOString(),
      status: ticket.status === "Waiting for Response" ? "Open" : ticket.status,
    })

    setNewMessage("")
    setIsSubmitting(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive"
      case "In Progress":
        return "default"
      case "Waiting for Response":
        return "secondary"
      case "Resolved":
        return "secondary"
      case "Closed":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{ticket.title}</CardTitle>
                <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {ticket.userName} ({ticket.userEmail})
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Created {format(new Date(ticket.createdAt), "MMM dd, yyyy 'at' HH:mm")}
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {ticket.category}
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {ticket.assignedTo && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Assigned to: <strong>{ticket.assignedTo}</strong>
              </span>
            </div>
          )}

          {ticket.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {ticket.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticket.conversation.map((message, index) => (
              <div key={message.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={message.sender === "admin" ? "bg-primary text-primary-foreground" : ""}>
                    {message.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{message.senderName}</span>
                    <Badge variant={message.sender === "admin" ? "default" : "secondary"} className="text-xs">
                      {message.sender === "admin" ? "Support Team" : "User"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(message.timestamp), "MMM dd, yyyy 'at' HH:mm")}
                    </span>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">Attachments:</div>
                        {message.attachments.map((attachment, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <Paperclip className="h-3 w-3" />
                            <span>{attachment}</span>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply Form */}
      {ticket.status !== "Closed" && (
        <Card>
          <CardHeader>
            <CardTitle>Add Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
