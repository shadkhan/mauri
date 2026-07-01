# Mauri

Mauri is a women's hormonal health platform for PCOS, PCOD, painful periods, endometriosis-aware screening, and guided recovery education. The app includes a public landing page, Mauri Discovery Assessment, waitlist capture, articles, and an early authenticated-app scaffold for roadmap, tracking, learning, and profile areas.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Resend for optional lead notification emails
- CSV lead storage for the current no-database setup

## Current Features

- Landing page with hero, Mauri Method, trust section, journey section, and waitlist form
- Mauri Discovery Assessment with broader educational pathways:
  - Mirror PCOS Pattern
  - Invisible PCOS Pattern
  - Silent PCOS Pattern
  - Survival PCOS Pattern
  - Possible Endometriosis Pattern
  - Functional / Stress-Related Cycle Disruption
  - Possible Post-Pill Cycle Recovery
  - Mixed Hormonal Pattern
  - Needs Further Clinical Review
- Blog/articles with research links
- Learning Library and Today's Lesson widget
- Placeholder app areas:
  - Dashboard
  - Recovery Roadmap
  - Tracking
  - Learning Library
  - Profile

## Lead Capture

The app currently does not use a database.

Lead submissions are handled by:

- `app/api/leads/route.ts`
- CSV file: `storage/leads.csv`
- Optional Resend email notification

CSV storage is useful for early testing, but for production patient data a proper database should be added later.

## Environment Variables

Copy `.env.local.example` to `.env.local` for local development:

```bash
cp .env.local.example .env.local
```

Available variables:

```env
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFICATION_TO=your@email.com
LEAD_NOTIFICATION_FROM=Mauri <onboarding@resend.dev>

NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

Resend variables are optional, but recommended for live deployment so every waitlist or assessment submission reaches the team by email.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Build

Run TypeScript and production build checks:

```bash
pnpm exec tsc --noEmit
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Hostinger Deployment Notes

This project needs Node.js hosting, not plain static hosting.

Use Hostinger Web Apps / Node.js / Next.js hosting if available on the plan.

Recommended commands:

```bash
pnpm install
pnpm build
pnpm start
```

If Hostinger uses npm instead:

```bash
npm install
npm run build
npm run start
```

Add the Resend environment variables in Hostinger's app environment settings before going live.

## Important Production Notes

- The current app has no authentication enforcement yet.
- The current app has no database yet.
- CSV lead storage may not be durable across all hosting redeploys.
- For production patient profiles, add a database before storing sensitive or long-term health records.
- Keep medical language educational and route users toward the Mauri doctors and care team.

## Useful Paths

- Homepage: `app/page.tsx`
- Discovery Assessment: `components/PhenotypeQuiz.tsx`
- Lead API: `app/api/leads/route.ts`
- Articles: `lib/articles.ts`
- Learning Library data: `lib/learningLibrary.ts`
- Brand assets: `public/brand`
- Brand reference: `brand/README.md`
