# Mauri Codex Development Guide

This file is the Codex-facing project guide for the Mauri landing page and waitlist repo. Treat `CLAUDE.md`, `mauri-claude-code-brief.md`, and the `brand/` folder as source material; this file translates those requirements into day-to-day development instructions for Codex.

## Project Purpose

Build Phase 1 of Mauri: a single-page marketing site for an integrative PCOS/PCOD wellness platform.

The site has one job: convert visitors into waitlist signups and capture early PCOS phenotype quiz leads.

This phase is not the full app. Do not build login, accounts, dashboards, AI protocol generation, period tracking, lab marker entry, payments, affiliate hubs, or practitioner tooling.

Core deliverables:

- Landing page at `/`
- Five-question PCOS phenotype quiz at `/phenotype`
- Email capture that stores leads and quiz answers
- Blog index at `/blog` with graceful Hashnode fallback
- About page at `/about`
- PWA groundwork, favicon, SEO metadata, sitemap, and robots

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- `next/font/google` for Playfair Display and Inter
- `lucide-react` for UI icons
- CSV file storage for leads, with optional Resend email notifications
- Vercel hosting target
- Package manager: `pnpm`

Use the existing repo patterns before introducing new abstractions.

## Commands

Use these from the repo root:

```bash
pnpm dev
pnpm build
pnpm lint
```

Before finishing substantial code changes, run at least:

```bash
pnpm build
```

Run `pnpm lint` when changing TypeScript, React components, or app routes.

## Brand Rules

Use the brand kit in `brand/` and mirrored public assets in `public/brand/`.

Brand files:

- `mauri-mark.svg`: favicon, app icon source, compact nav mark
- `mauri-logo-primary.svg`: wordmark on light backgrounds
- `mauri-logo-reversed.svg`: wordmark on dark teal backgrounds
- `mauri-app-icon-1024.svg`: app store / manifest icon source
- `mauri-icons.svg`: branded module/feature illustration icons only
- `brand/mauri_landing_page_hero_cta.html`: visual reference for the compact hero and waitlist CTA

Use `lucide-react` for normal interface icons. Do not replace UI controls with icons from `mauri-icons.svg` unless they are being used as brand/module illustrations.

## Design Tokens

Use Tailwind theme colors from `tailwind.config.ts`. Do not scatter raw hex values through components unless a file is explicitly defining the theme.

Required tokens:

| Token | Hex | Use |
|---|---|---|
| `teal` | `#1D9E75` | Primary buttons, links, icons |
| `teal-dark` | `#085041` | Headlines, dark CTA background |
| `teal-light` | `#E1F5EE` | Soft section backgrounds and badges |
| `teal-mid` | `#9FE1CB` | Text on dark teal |
| `purple` | `#7F77DD` | Homeopathy/spiritual accents |
| `purple-light` | `#EEEDFE` | Purple soft backgrounds |
| `amber` | `#EF9F27` | Celebration and secondary CTA accents |
| `amber-light` | `#FAEEDA` | Warm highlight backgrounds |
| `rose` | `#D4537E` | Feminine health accents |
| `rose-light` | `#FBEAF0` | Soft rose backgrounds |
| `green` | `#639922` | Diet and nutrition icons |
| `warm-white` | `#F7F6F2` | Page background; never pure white |
| `ink` | `#2C2C2A` | Body text |
| `muted` | `#888780` | Secondary text and microcopy |
| `border` | `#D3D1C7` | Hairline borders |

Typography:

- Headings: Playfair Display, weight 400
- Body/UI: Inter, weights 400 and 500 only
- Wordmark: use the provided SVG where possible; if text wordmark is necessary, use serif styling with generous letter spacing

Tone:

- Warm, clinical-but-not-cold
- Never alarmist
- Sentence case for UI text and headings
- No Title Case for normal headings
- No all-caps except small eyebrow labels when matching the mockup

## Visual Direction

The hero should feel close to `brand/mauri_landing_page_hero_cta.html`:

- Warm-white page background
- Compact centered hero
- Sticky header with Mauri wordmark and waitlist CTA
- Teal-light eyebrow badge
- Playfair headline: "Restore your life force."
- Two CTAs: phenotype quiz and waitlist
- Four-part value strip
- Dark teal waitlist CTA section with amber submit button

Avoid generic SaaS hero tropes, oversized decorative gradients, stock-looking imagery, and a one-note teal-only page. Cards should be simple and purposeful, with restrained radius.

## Required Homepage Copy

Copy in `CLAUDE.md` Section 4 is authoritative. Preserve meaning exactly, and preserve exact wording where the brief says "Use this copy exactly."

Homepage sections, in order:

1. Header
2. Hero
3. Problem section: "Sound familiar?"
4. How Mauri works: "From confusion to clarity"
5. Phenotype quiz entry point
6. Differentiators: "What makes Mauri different"
7. Case study teaser
8. Email capture / waitlist CTA
9. Footer with medical disclaimer

Required disclaimer text must appear verbatim:

> "Mauri provides educational guidance based on integrative research and real case experience. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before making any changes to medication, supplements, or treatment plans."

## Phenotype Quiz

Route: `/phenotype`

The quiz is client-side and rule-based. No AI calls. No permanent storage until the user submits an email.

Questions:

- Q1 cycle pattern: single-select
- Q2 visible symptoms: multi-select
- Q3 energy pattern: single-select
- Q4 cycle history: single-select
- Q5 pain: single-select

Scoring:

- Phenotype A: irregular/missed cycles plus 2 or more androgen symptoms
- Phenotype B: irregular cycles plus androgen symptoms, with lower severity signals
- Phenotype C: regular cycles plus androgen symptoms; include a gentle note that regular cycles can still mask hormonal imbalance
- Phenotype D: irregular cycles plus no androgen symptoms and post-pill/stress trigger, or anxious/wired energy
- If Q5 is severe, add a separate gentle doctor-conversation flag. Do not name endometriosis on the result screen.

The result screen should describe the matched phenotype in plain language. Do not show supplement or diet recommendations before email capture.

## Leads API

Implement `app/api/leads/route.ts` as a Node.js POST endpoint.

Validate name and email format. Expected data:

- `name`
- `email`
- `source`: `hero_cta`, `phenotype_quiz`, or `footer`
- `quiz_result` optional
- `quiz_answers` optional JSON
- `endometriosis_flag` optional boolean

Lead handling:

- Append every valid submission to `storage/leads.csv`.
- Keep `storage/leads.csv` out of git and outside `public/`.
- Use CSV escaping for all values because quiz answers are JSON.
- Send an email notification through Resend when env vars are configured.
- If Resend env vars are missing, still save the CSV and return success.
- If email sending fails after CSV save, return success and log the email error.

Required env vars for email notifications:

```bash
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFICATION_TO=your@email.com
LEAD_NOTIFICATION_FROM=Mauri <onboarding@resend.dev>
```

Use a verified sender/domain for production. `onboarding@resend.dev` is useful for testing only.

## Blog

Route: `/blog`

Fetch public Hashnode posts using the public GraphQL API when publication details are configured. If the publication is missing or the fetch fails, render:

"Coming soon - first stories landing shortly"

Do not fail the build because of blog fetch errors.

## SEO And PWA

Use Next.js Metadata API for every route.

Homepage:

- Title: `Mauri - Restore Your Life Force | Integrative PCOS & PCOD Care`
- Description under 160 characters and including `PCOS`, `PCOD`, `integrative`, and `phenotype`

Add:

- Open Graph image using the Mauri logo or a generated placeholder if conversion is not available
- `sitemap.xml`
- `robots.txt`
- Web manifest
- Favicon from `mauri-mark.svg`

Use semantic HTML and one `h1` per page.

## Accessibility And Responsiveness

Design and test for:

- 390px mobile
- 768px tablet
- 1280px desktop

Requirements:

- Large tap targets for quiz choices
- Visible focus states
- Proper labels for forms
- No overlapping text or controls
- Text must fit inside buttons and cards at mobile widths
- Medical language must stay educational and non-diagnostic

Target Lighthouse:

- Performance >= 85 mobile
- Accessibility >= 95
- SEO >= 95

## Coding Conventions

- Keep components small and local to their feature until reuse is clear.
- Use Tailwind classes and existing theme tokens.
- Prefer `next/image` for bitmap images, but SVG brand logos may be rendered as images from `/public/brand`.
- Use `Link` for internal navigation.
- Keep API-only secrets out of client components.
- Add comments only when they clarify non-obvious logic, especially quiz scoring.
- Do not introduce an AI SDK, agent framework, auth system, dashboard framework, or CMS migration in Phase 1.

## Current Repo Notes

The repo currently has:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/Header.tsx`
- `components/Hero.tsx`
- brand assets in both `brand/` and `public/brand/`
- Tailwind tokens already configured in `tailwind.config.ts`

The current homepage is only header plus hero. Continue by building the remaining sections in the brief unless the user asks for a different task.

## Development Workflow For Codex

When starting work:

1. Read this file and inspect the touched files before editing.
2. Check `CLAUDE.md` for exact copy and scope when adding product sections.
3. Check `brand/README.md` and the hero mockup when touching visual design.
4. Make focused changes that match the existing App Router structure.
5. Run build/lint as appropriate.
6. Report what changed, what was verified, and any known gaps.

If instructions conflict, prioritize:

1. The user's latest request
2. This `AGENT.md`
3. `CLAUDE.md` / `mauri-claude-code-brief.md`
4. Brand assets and `brand/README.md`
5. Existing implementation patterns
