@AGENTS.md

# @orsaboni Content Command Center

## Project Overview
Instagram content management system for personal fitness/nutrition brand.
5 screens: competitor feed, content calendar, content creation, kanban, analytics.

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **UI**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: None (single user)
- **Deploy**: Vercel
- **APIs**: Windsor.ai, Meta oEmbed, Claude API, PubMed E-utilities

## Design System
- Background: `#FAFAF8` (bg-background)
- Surface: `#FFFFFF` (bg-surface)
- Border: `#E8E8E0` (border-border)
- Accent: `#f0734a` (bg-accent)
- Font Display: Playfair Display (font-display) — headings
- Font Body: Heebo (font-sans) — body text, Hebrew
- Font Numbers: DM Sans (font-numbers)
- Direction: RTL (lang="he", dir="rtl")
- Sidebar: 200px, sticky

## File Structure
```
app/
├── layout.tsx          # RTL, fonts, sidebar
├── page.tsx            # Redirect to /feed
├── feed/page.tsx       # מסך 1 — פיד מתחרים
├── calendar/page.tsx   # מסך 2 — לוח תוכן
├── create/page.tsx     # מסך 3 — יצירת תוכן
├── kanban/page.tsx     # מסך 4 — הכנה לעלייה
├── analytics/page.tsx  # מסך 5 — ניתוח
├── api/
│   ├── windsor/route.ts
│   ├── generate-script/route.ts
│   ├── verify-claim/route.ts
│   └── posts/route.ts
components/
├── Sidebar.tsx
lib/
├── supabase.ts
```

## Commands
- `npm run dev` — start dev server (port 3000)
- `npx next build` — production build
- `npm run lint` — run ESLint

## Conventions
- Hebrew UI, RTL layout
- Tailwind CSS classes (no inline styles)
- Named exports for components
- Supabase client in lib/supabase.ts
