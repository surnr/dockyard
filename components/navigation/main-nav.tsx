"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  Menu,
  Home,
  FolderOpen,
  User,
  HeadphonesIcon,
  Calendar,
  BarChart3,
  Bell,
} from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search Engine", href: "/search", icon: Search },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Support Ticket", href: "/support", icon: HeadphonesIcon },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/80 shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-500 group-hover:scale-110 backdrop-blur-sm border border-white/20">
            <span className="text-white font-bold text-xl">ST</span>
          </div>
          <span className="font-bold text-2xl text-foreground">
            StartupTN
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-accent hover:text-accent-foreground backdrop-blur-sm group border border-transparent hover:border-border hover:shadow-lg"
            >
              <item.icon className="h-4 w-4 group-hover:scale-110 transition-all duration-300" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl hover:bg-accent transition-all duration-200 border border-transparent hover:border-border text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 bg-background/95 backdrop-blur-2xl border-l border-border"
          >
            <div className="flex flex-col space-y-6 mt-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  placeholder="Quick search..."
                  className="pl-12 h-12 rounded-2xl border border-input focus:border-ring bg-background backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group border border-transparent hover:border-border"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center group-hover:bg-accent transition-colors">
                      <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <span className="text-base">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
