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
- Hostinger MySQL lead storage

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

Lead submissions are handled by:

- `app/api/leads/route.ts`
- MySQL table: `leads`
- Optional Resend email notification

The API creates the `leads` table automatically on the first successful submission.

## Environment Variables

Copy `.env.local.example` to `.env.local` for local development:

```bash
cp .env.local.example .env.local
```

Available variables:

```env
DB_HOST=your_hostinger_mysql_host
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_SSL=false

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

Add the database and Resend environment variables in Hostinger's app environment settings before going live.

## Important Production Notes

- The current app has no authentication enforcement yet.
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
