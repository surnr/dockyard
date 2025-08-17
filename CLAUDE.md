# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built for the StartupTN Ecosystem Platform. It's a comprehensive startup ecosystem platform for Tamil Nadu featuring an AI tutor, project management, events, and analytics dashboard.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Framework Stack
- **Next.js 15** with App Router (React 19)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with custom design system
- **shadcn/ui** components with Radix UI primitives
- **AI SDK** for AI-powered features

### Project Structure
- `app/` - Next.js App Router pages and API routes
  - `/dashboard/` - Main analytics dashboard
  - `/projects/` - Project management features
  - `/events/` - Event management system
  - `/chat/` - AI chat interface
  - `/search/` - Search functionality
  - `/profile/` - User profiles
  - `/support/` - Support ticket system
- `components/` - React components organized by feature
  - `/ui/` - shadcn/ui base components
  - `/dashboard/` - Dashboard-specific components
  - `/analytics/` - Data visualization components
  - `/navigation/` - Navigation components
- `lib/` - Utility functions and mock data
- `hooks/` - Custom React hooks

### Key Technologies
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui with Radix UI primitives (accordion, dialog, dropdown, etc.)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **AI**: Vercel AI SDK with OpenAI integration
- **Fonts**: DM Sans (Google Fonts)

### Configuration Details
- Path aliases configured with `@/*` mapping to root
- ESLint and TypeScript errors ignored during builds (development setup)
- Images unoptimized for development
- CSS variables used for theming with light/dark mode support

### Component Patterns
- UI components follow shadcn/ui conventions with className prop merging via `cn()` utility
- Form components use React Hook Form with Zod validation
- Data visualization uses Recharts with custom styling
- Modal dialogs use Radix UI Dialog primitives
- Navigation uses Radix UI Navigation Menu

### Data Management
- Mock data stored in `lib/*-data.ts` files for development
- Search functionality implemented with Fuse.js
- Utility functions for formatting numbers, debouncing, and ID generation

## Development Notes

### Building and Testing
- The project has build error suppression enabled for development
- No test framework is currently configured
- Use `npm run lint` to check code quality

### AI Features
- Chat interface with AI SDK integration via `/chat/[id]` routes
- AI-powered search functionality
- Performance insights and analytics