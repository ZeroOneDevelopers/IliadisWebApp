# Iliadis Executive Cars Digital Showroom

A cinematic, luxury-grade Next.js experience for Iliadis Executive Cars. The experience blends Tailwind CSS styling with Framer Motion micro-interactions to create a digital showroom, test-drive concierge and mock admin cockpit for lead management.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [Tailwind CSS](https://tailwindcss.com/) for the "Salt & Pepper" visual language
- [Framer Motion](https://www.framer.com/motion/) for parallax hero, hover glows and animated transitions
- Headless UI Listbox for refined filtering interactions

## Getting Started

```bash
npm install
npm run dev
```

The development server starts on [http://localhost:3000](http://localhost:3000). Pages include:

- `/` – Hero-led home page with cinematic video, highlights and collection teasers
- `/showroom` – Filterable gallery of 12 premium vehicles with hover reveals
- `/showroom/[slug]` – Rich vehicle detail layout with gallery, specs and engine audio
- `/test-drive` – Animated concierge form with calendar/email/WhatsApp follow-ups
- `/dashboard` – Mock admin lead intelligence dashboard with filtering and audio library callouts

## Assets

- `public/images/iliadis-logo.svg` – Iliadis Executive Cars logotype
- `public/images/showroom-preview.svg` – Social preview artwork
- `public/sounds/` – Add your own `engine-start.mp3` and `rev.mp3` (or update the paths in `lib/cars.ts` if you prefer different
  filenames). Drop the mastered audio files into this folder to enable hero/test-drive sound design.

## Schema & SEO

Each page injects [schema.org Vehicle](https://schema.org/Vehicle) metadata and tuned OpenGraph/Twitter cards for elevated search appearance.

## Customisation

Vehicle data lives in `lib/cars.ts`. Update or expand entries to reflect the live inventory, including galleries and audio references. Motion, colour and typography tokens live in `tailwind.config.ts` and `app/globals.css`.
