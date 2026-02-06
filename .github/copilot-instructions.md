# Copilot Instructions for Travel Genie

## Project Overview

Travel Genie is a **Next.js 16 + React 19** travel assistant app powered by **Tambo AI**. It uses AI to render context-aware UI components based on the user's travel phase (planning, booking, active trip, post-trip).

## Architecture

### Core Pattern: Tambo AI Component Registry

The app uses Tambo AI's component rendering system. AI dynamically selects and renders React components based on user intent:

```
User Message → Tambo AI → Selects Component → Renders with Props
```

**Registry file**: [tambo-registry.ts](../tambo-registry.ts) defines all AI-renderable components with:
- `name`: Component identifier
- `description`: AI prompt for when to use this component (critical for AI selection)
- `component`: The React component
- `propsSchema`: Zod schema defining required props

### Component Categories by Travel Phase

| Phase | Component | Trigger Keywords |
|-------|-----------|------------------|
| Planning | `DestinationExplorer` | "where should I go", "ideas for trips" |
| Booking | `FlightFinder` | "flights", "prices", "tickets" |
| Active Trip | `LocalGuide` | "I'm in [city] now", "where to eat" |
| Post-Trip | `TripStats` | "I'm back", "trip summary", "expenses" |

## Key Conventions

### Adding New Tambo Components

1. Create component in `components/tambo/` with typed props
2. Use **Framer Motion** for entry animations (see existing patterns)
3. Use **Lucide React** icons exclusively
4. Register in `tambo-registry.ts` with a Zod schema and descriptive AI prompt

Example component structure:
```tsx
// components/tambo/NewComponent.tsx
import { motion } from 'framer-motion';
import { SomeIcon } from 'lucide-react';

export default function NewComponent({ prop1, prop2 }: { prop1: string, prop2: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="...">
      {/* Content */}
    </motion.div>
  );
}
```

### Styling

- **Tailwind CSS 4** with `@import "tailwindcss"` syntax
- Use `tailwind-merge` + `clsx` for conditional classes
- Component-specific color themes (e.g., emerald for LocalGuide, slate for FlightFinder)

### TypeScript

- Props defined inline: `({ prop }: { prop: Type })` for simple components
- Use Zod (`zod@4`) for runtime prop validation in registry

## Development Commands

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
```

## File Structure

```
app/
  page.tsx       # Main chat UI with world map, message handling
  layout.tsx     # Root layout with Geist fonts
  globals.css    # Tailwind + CSS variables
components/
  tambo/         # AI-rendered components only
tambo-registry.ts # Component registry for Tambo AI
```

## Important Notes

- The `page.tsx` is a large client component (`'use client'`) containing the main chat interface
- Background images dynamically change based on selected destination
- All Tambo components must be self-contained (no external data fetching)
