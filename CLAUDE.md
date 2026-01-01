# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 project containing two viral marketing mini-apps built during a vacation in Niseko, Japan:

1. **The Onsen Oracle** (`/`) - A fortune teller inspired by Japanese hot spring culture that generates 2026 fortunes with elemental alignments
2. **A16Z Speedrun** (`/speedrun`) - A ski game where players dodge trees for 69 seconds to "beat Andrew Chen's run" and receive a mock term sheet

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### App Structure (Next.js App Router)
- `app/page.tsx` - Onsen Oracle main page (client component with fortune fetching)
- `app/speedrun/page.tsx` - Ski game page (client component with game state machine)
- `app/api/fortune/route.ts` - API endpoint returning random fortune data (no AI, pure randomization)
- `app/globals.css` - All custom CSS including both Onsen (warm colors) and Speedrun (ski/snow) themes

### Components
- `ParticleEffect.tsx` - Reusable particle system for steam/snow effects
- `FortuneCard.tsx` - Displays fortune with share functionality
- `SkiGame.tsx` - Canvas-based skiing game (orchestrates modules from `ski-game/`)
- `TermSheet.tsx` - Victory screen showing mock VC term sheet
- `GameOver.tsx` - Crash/failure screen

### Ski Game Modules (`components/ski-game/`)
- `types.ts` - TypeScript interfaces (Obstacle, SnowParticle, SkiTrail, GameState)
- `constants.ts` - Game dimensions, speeds, spawn intervals
- `drawing.ts` - All canvas drawing functions (background, skier, trees, rocks, UI)
- `logic.ts` - Game logic (collision detection, spawning, particle updates)

### Utilities (`lib/`)
- `share.ts` - Social sharing helpers (Twitter, native share API)

### Styling Pattern
Custom CSS classes in `globals.css` using CSS variables and Tailwind utilities:
- Onsen theme: `oracle-card`, `fortune-card`, `btn-oracle`, `btn-share`, `.steam-*` animations
- Speedrun theme: `ski-card`, `btn-ski`, `.snow-*` animations, `.term-sheet`

The project uses two distinct visual themes:
- **Onsen**: Warm amber/gold palette (`#d97706`, `#fbbf24`), steam particle effects
- **Speedrun**: Cool blue/slate palette with orange accents, snow particle effects
