"use client"

import { useState, useMemo } from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { EventFiltersComponent, type EventFilters } from "@/components/events/event-filters"
import { EventCard } from "@/components/events/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventsData, getUpcomingEvents, getEventsByDate } from "@/lib/events-data"
import { Search, Grid, List, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<EventFilters>({
    type: [],
    district: [],
    sector: [],
    price: [],
    dateRange: {},
  })
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [bookmarkedEvents, setBookmarkedEvents] = useState<Set<string>>(new Set(["2", "4"]))
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set(["3", "6"]))
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let results = [...eventsData]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query) ||
          event.sector.some((sector) => sector.toLowerCase().includes(query)) ||
          event.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply filters
    if (filters.type.length > 0) {
      results = results.filter((event) => filters.type.includes(event.type))
    }

    if (filters.district.length > 0) {
      results = results.filter((event) => filters.district.includes(event.district))
    }

    if (filters.sector.length > 0) {
      results = results.filter((event) => event.sector.some((sector) => filters.sector.includes(sector)))
    }

    if (filters.price.length > 0) {
      results = results.filter((event) => {
        return filters.price.some((priceFilter) => {
          switch (priceFilter) {
            case "Free":
              return event.price === 0
            case "Paid":
              return event.price > 0
            case "Under ₹500":
              return event.price > 0 && event.price < 500
            case "₹500-₹1000":
              return event.price >= 500 && event.price <= 1000
            case "Above ₹1000":
              return event.price > 1000
            default:
              return false
          }
        })
      })
    }

    // Apply date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      results = results.filter((event) => {
        const eventDate = new Date(event.date)
        if (filters.dateRange.from && filters.dateRange.to) {
          return eventDate >= filters.dateRange.from && eventDate <= filters.dateRange.to
        } else if (filters.dateRange.from) {
          return eventDate >= filters.dateRange.from
        } else if (filters.dateRange.to) {
          return eventDate <= filters.dateRange.to
        }
        return true
      })
    }

    // Apply sorting
    switch (sortBy) {
      case "date":
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "popularity":
        results.sort((a, b) => b.registeredCount - a.registeredCount)
        break
      case "price":
        results.sort((a, b) => a.price - b.price)
        break
      case "capacity":
        results.sort((a, b) => b.capacity - a.capacity)
        break
      case "recent":
        results.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        break
      default:
        break
    }

    // Update bookmark and registration status
    return results.map((event) => ({
      ...event,
      isBookmarked: bookmarkedEvents.has(event.id),
      isRegistered: registeredEvents.has(event.id),
    }))
  }, [searchQuery, filters, sortBy, bookmarkedEvents, registeredEvents])

  const handleBookmark = (eventId: string) => {
    const newBookmarks = new Set(bookmarkedEvents)
    if (newBookmarks.has(eventId)) {
      newBookmarks.delete(eventId)
    } else {
      newBookmarks.add(eventId)
    }
    setBookmarkedEvents(newBookmarks)
  }

  const handleRegister = (eventId: string) => {
    const newRegistrations = new Set(registeredEvents)
    newRegistrations.add(eventId)
    setRegisteredEvents(newRegistrations)
    // In real app, this would make an API call to register for the event
  }

  const upcomingEvents = getUpcomingEvents(3)
  const selectedDateEvents = selectedDate ? getEventsByDate(format(selectedDate, "yyyy-MM-dd")) : []

  // Get events with dates for calendar
  const eventDates = eventsData.map((event) => new Date(event.date))

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Events Management</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover and book startup events, meetups, workshops, and conferences across Tamil Nadu. Connect with the
            entrepreneurial community and expand your network.
          </p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Events</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, organizers, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <EventFiltersComponent
                  filters={filters}
                  onFiltersChange={setFilters}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultCount={filteredAndSortedEvents.length}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* View Mode Toggle */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredAndSortedEvents.length} of {eventsData.length} events
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Events Grid/List */}
                {filteredAndSortedEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      {searchQuery ||
                      Object.values(filters).some((f) => Array.isArray(f) && f.length > 0) ||
                      filters.dateRange.from ||
                      filters.dateRange.to
                        ? "No events match your search criteria"
                        : "No events available"}
                    </div>
                    {(searchQuery ||
                      Object.values(filters).some((f) => Array.isArray(f) && f.length > 0) ||
                      filters.dateRange.from ||
                      filters.dateRange.to) && (
                      <div className="space-y-2">
                        <p className="text-sm">Try:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Using different keywords</li>
                          <li>• Removing some filters</li>
                          <li>• Expanding your date range</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                    {filteredAndSortedEvents.map((event) => (
                      <EventCard key={event.id} event={event} onBookmark={handleBookmark} onRegister={handleRegister} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Event Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      modifiers={{
                        hasEvent: eventDates,
                      }}
                      modifiersStyles={{
                        hasEvent: {
                          backgroundColor: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Selected Date Events */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedDate ? `Events on ${format(selectedDate, "MMM dd, yyyy")}` : "Select a date"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No events on this date</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedDateEvents.map((event) => (
                          <div key={event.id} className="p-3 border rounded-lg">
                            <h4 className="font-medium text-sm">{event.name}</h4>
                            <p className="text-xs text-muted-foreground">{event.organizer}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {event.time} • {event.location}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm">{event.name}</h4>
                          <p className="text-xs text-muted-foreground">{event.organizer}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(event.date), "MMM dd")} • {event.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Registered Events */}
              <Card>
                <CardHeader>
                  <CardTitle>My Registered Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {eventsData
                      .filter((event) => registeredEvents.has(event.id))
                      .map((event) => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm">{event.name}</h4>
                          <p className="text-xs text-muted-foreground">{event.organizer}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(event.date), "MMM dd, yyyy")} • {event.location}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bookmarked Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Bookmarked Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {eventsData
                      .filter((event) => bookmarkedEvents.has(event.id))
                      .map((event) => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm">{event.name}</h4>
                          <p className="text-xs text-muted-foreground">{event.organizer}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(event.date), "MMM dd, yyyy")} • {event.location}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
