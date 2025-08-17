"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EventDetails } from "@/lib/events-data"
import { formatEventDate, formatEventTime, getEventTypeColor } from "@/lib/events-data"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Video,
  Building2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  event: EventDetails
  onBookmark: (eventId: string) => void
  onRegister: (eventId: string) => void
}

export function EventCard({ event, onBookmark, onRegister }: EventCardProps) {
  const getDaysUntilEvent = () => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilEvent()
  const isToday = daysLeft === 0
  const isPast = daysLeft < 0
  const isUpcoming = daysLeft > 0

  const getAvailableSpots = () => {
    return event.capacity - event.registeredCount
  }

  const isFullyBooked = getAvailableSpots() <= 0
  const isAlmostFull = getAvailableSpots() <= event.capacity * 0.1 // Less than 10% spots left

  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={event.organizerLogo || "/placeholder.svg?height=48&width=48&query=event+organizer+logo"}
                alt={`${event.organizer} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={getEventTypeColor(event.type)} variant="secondary">
                  {event.type.replace("_", " ")}
                </Badge>
                {event.isOnline && (
                  <Badge variant="outline" className="text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg leading-tight line-clamp-2">{event.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{event.organizer}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onBookmark(event.id)} className="flex-shrink-0">
            {event.isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-4 line-clamp-3 flex-1">{event.shortDescription}</CardDescription>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{formatEventDate(event.date, event.endDate)}</span>
            {isToday && (
              <Badge variant="destructive" className="text-xs">
                Today
              </Badge>
            )}
            {isUpcoming && daysLeft <= 7 && (
              <Badge variant="secondary" className="text-xs">
                {daysLeft} days left
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-green-600" />
            <span>{formatEventTime(event.time, event.endTime)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {event.isOnline ? (
              <>
                <Video className="h-4 w-4 text-purple-600" />
                <span>Online Event</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 text-red-600" />
                <span>{event.location}</span>
                {event.venue && <span className="text-muted-foreground">• {event.venue}</span>}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-gray-600" />
            <span>{event.district}</span>
          </div>
        </div>

        {/* Capacity and Price */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-600" />
            <span>
              {event.registeredCount}/{event.capacity}
            </span>
            {isAlmostFull && !isFullyBooked && (
              <Badge variant="secondary" className="text-xs">
                Almost Full
              </Badge>
            )}
            {isFullyBooked && (
              <Badge variant="destructive" className="text-xs">
                Full
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">{event.price === 0 ? "Free" : `₹${event.price}`}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.sector.slice(0, 3).map((sector) => (
            <Badge key={sector} variant="secondary" className="text-xs">
              {sector}
            </Badge>
          ))}
          {event.sector.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{event.sector.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {event.isRegistered ? (
            <Button className="flex-1" disabled>
              Registered
            </Button>
          ) : (
            <Button className="flex-1" onClick={() => onRegister(event.id)} disabled={isFullyBooked || isPast}>
              {isFullyBooked ? "Fully Booked" : isPast ? "Event Ended" : "Register"}
            </Button>
          )}
          <Button variant="outline" size="sm" asChild className="bg-transparent">
            <Link href={`/events/${event.id}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
