# Mauri — Landing Page & Waitlist
## Claude Code Project Brief + Starter Prompt

This document is both a reference brief and a ready-to-paste first prompt for Claude Code.
Save it as `CLAUDE.md` in the root of a new repo — Claude Code reads this automatically
at the start of every session in that directory.

---

## 0. How to use this

```bash
mkdir mauri-landing && cd mauri-landing
git init
# copy this file in as CLAUDE.md
# copy your brand kit SVGs into ./brand/
claude
```

Then paste the prompt in **Section 9** as your first message. Everything above it
is reference material Claude Code will read from this file as needed.

---

## 1. Project goal

Build a single-page marketing site for **Mauri** — an integrative PCOS/PCOD wellness
platform — with one job: convert visitors into waitlist signups and capture early
"PCOS Phenotype" quiz leads. This is **Phase 1** of the Mauri build sequence
(content-first validation, before the full app).

**This is not the app.** No login, no dashboard, no protocol engine. Just:
1. A landing page that explains Mauri and builds trust
2. A short "Check my PCOS phenotype" quiz (5 questions, no account needed)
3. An email capture that stores leads + quiz answers
4. A blog index page (posts come from Hashnode via RSS/API — see Section 8)

---

## 2. Brand identity — design tokens

Use these exactly. Do not invent new colours.

| Token | Hex | Use |
|---|---|---|
| `teal` (primary) | `#1D9E75` | Primary buttons, links, icons |
| `teal-dark` | `#085041` | Headlines, CTA section background |
| `teal-light` | `#E1F5EE` | Section backgrounds, badges |
| `teal-mid` | `#9FE1CB` | Text on dark teal |
| `purple` (spirit) | `#7F77DD` | Homeopathy/spiritual accents |
| `purple-light` | `#EEEDFE` | Secondary backgrounds |
| `amber` (energy) | `#EF9F27` | Celebration, secondary CTA accents |
| `amber-light` | `#FAEEDA` | Warm highlight backgrounds |
| `rose` (feminine) | `#D4537E` | Period/feminine-health accents |
| `rose-light` | `#FBEAF0` | Soft backgrounds |
| `green` (nutrition) | `#639922` | Diet/food icons |
| `warm-white` (bg) | `#F7F6F2` | Page background — never pure white |
| `ink` (text) | `#2C2C2A` | Body text |
| `muted` | `#888780` | Secondary text, microcopy |
| `border` | `#D3D1C7` | Hairline borders |

**Typography:**
- Headings: `Playfair Display` (serif) — weight 400, generous letter-spacing on the wordmark only
- Body / UI: `Inter` (sans) — weights 400 and 500 only
- Load both via `next/font/google`

**Logo / icons:** `./brand/mauri-mark.svg`, `./brand/mauri-logo-primary.svg`,
`./brand/mauri-logo-reversed.svg`, `./brand/mauri-icons.svg` — copy the brand kit
into this repo before starting. Use the mark for the favicon and nav logo.

**Tone:** warm, clinical-but-not-cold, never alarmist. Sentence case for all UI
text and headings — no Title Case, no ALL CAPS except small eyebrow labels.

---

## 3. Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS — configure the tokens from Section 2 as theme colours
  (`teal`, `teal-dark`, `purple`, `amber`, `rose`, `warm-white`, etc.)
- **PWA:** `next-pwa` — add manifest + service worker now even though this is just
  a landing page, so the same repo can grow into the full app later
- **Forms / leads:** Supabase (free tier) — one table `leads`, see Section 7
- **Hosting:** Vercel
- **Fonts:** `next/font/google` for Playfair Display + Inter
- **Icons:** `lucide-react` for UI icons (not the Mauri brand icon set, which is
  for feature/module illustration only)
- **Analytics:** PostHog (free tier) — track CTA clicks, quiz completions, email
  submissions as events. Add `NEXT_PUBLIC_POSTHOG_KEY` to `.env.local` (stub if
  not available yet — do not block the build on this)

**No agentic framework, no AI API calls in this phase.** The quiz result is a
static lookup table (see Section 6), not an LLM call.

---

## 4. Page structure (single page, anchor sections)

Build these sections in this order, on `/` :

### 4.1 Header (sticky, transparent → solid on scroll)
- Mauri wordmark (left), "Join waitlist" button (right, scrolls to CTA section)

### 4.2 Hero
- Eyebrow badge: "For women navigating PCOS, PCOD & hormonal health"
- H1 (Playfair Display): "Restore your life force."
- Subhead: "One protocol — your labs, supplements, diet, and homeopathic care —
  coordinated in one place. Reviewed by a practising integrative clinician, not
  just AI."
- Primary button → opens the quiz (Section 4.5): "Check my PCOS phenotype — free"
- Secondary button → scrolls to email capture: "Join the waitlist"
- Microcopy under buttons: "Free · 2 minutes · No medical jargon"
- Below the buttons, a 4-column value strip (stack to 2x2 on mobile):
  1. icon `list-check`, teal — "One protocol, not six apps"
  2. icon `sparkles`, purple — "Science, spirit & you"
  3. icon `notebook`, rose — "Real case studies"
  4. icon `soup`, green — "North Indian kitchen-ready"

### 4.3 The problem (3-column section, `teal-light` background)
Heading: "Sound familiar?"
Three cards, each: small heading + 2-sentence body. Use this copy exactly:

- **Fragmented care** — "Labs from one doctor, supplements bought blindly online,
  diet advice from Instagram, your homeopath seen separately. No one is
  coordinating your care."
- **Generic advice** — "Every app gives the same diet tips to every body type. No
  one connects your HOMA-IR to your supplement timing to your constitution."
- **One-sided answers** — "Every platform picks a side — allopathy only, or
  alternative only. Nobody honestly evaluates every stream against what actually
  worked for real people."

### 4.4 How Mauri works (3-step horizontal flow, desktop; stacked on mobile)
Heading: "From confusion to clarity"

1. **Tell us about you** — "Your symptoms, your labs if you have them, your blood
   group. Takes 2 minutes. No account needed."
2. **Get your protocol preview** — "Supplements with timing, a diet framework for
   your phenotype, and a homeopathic direction — all in one view."
3. **Reviewed by a clinician** — "Every protocol is checked by a practising
   integrative doctor before it reaches you. Not AI guesswork."

### 4.5 The Phenotype Quiz (modal or dedicated route `/phenotype`)
See full spec in Section 6. Entry point is the hero primary button.

### 4.6 Why Mauri is different (the 10 pillars, condensed to 6 for the landing page)
Heading: "What makes Mauri different"
2x3 grid of cards, each with an icon (from `lucide-react`) + short title + 1-line
body:

- `book-open` — **Research-based, not bro-science** — "Every claim traceable to a
  study or a real outcome — across allopathic, homeopathic, Ayurvedic, and Unani
  approaches."
- `route` — **One clear next step** — "No overwhelming dashboards. Just what to
  do next, in order."
- `heart-handshake` — **Honest, real stories** — "What worked, what didn't, and
  why — from real anonymised cases, including relapses."
- `salad` — **Diet built for your body** — "Calibrated to your HOMA-IR, blood
  group, and inflammation — not a generic chart."
- `shopping-basket` — **Your kitchen, sorted** — "Weekly grocery lists you can
  send straight to WhatsApp or Blinkit."
- `party-popper` — **Every win, celebrated** — "Regulated cycles. Clearer skin.
  More energy. Mauri notices — and so will you."

### 4.7 Case study teaser (single featured card, `purple-light` background)
Heading: "Real results, real science"
A single card previewing your first case study — title, 2-sentence teaser, "Read
the full story" link (placeholder `/blog/[slug]` route, populated once Hashnode
content exists). Include a small "as featured in our YouTube series" note.

### 4.8 Email capture / waitlist CTA (`teal-dark` background — matches the mockup
already shown in chat)
- H2 (light text): "Be among the first 250 women on the Mauri protocol"
- Subhead (teal-mid text): "Founding members get a personally reviewed
  integrative protocol — free during early access."
- Email input + button "Get early access" (amber button, `teal-dark` text)
- Microcopy: "No spam. One email when we're ready for you."
- On submit: insert into Supabase `leads` table with `source: 'hero_cta'`,
  show inline success state ("You're on the list — check your inbox soon.")

### 4.9 Footer
- Mauri wordmark (reversed/light on `teal-dark` or `warm-white`, your call)
- Links: Blog, About, Privacy Policy, Disclaimer (all can be placeholder pages
  for now except the disclaimer — write it fully, see below)
- Required disclaimer text, verbatim:

> "Mauri provides educational guidance based on integrative research and real
> case experience. It is not a substitute for professional medical advice,
> diagnosis, or treatment. Always consult your physician before making any
> changes to medication, supplements, or treatment plans."

- Social links (placeholder hrefs `#` for now): Instagram, YouTube

---

## 5. About page (`/about`)

One scrolling page. Sections:
1. **The Mauri story** — short, written in first person (you will write the real
   copy later; for now use a 2-paragraph placeholder about an integrative
   clinician's approach to PCOS, body-mind-spirit)
2. **What Mauri means** — explain the Māori concept of *mauri* (life force) and
   *mauri ora* (vitality, wholeness) in 1 paragraph — this is real brand content,
   write it warmly and respectfully
3. **Our approach** — the four streams (allopathic, homeopathic, Unani/herbal,
   nutritional/lifestyle) as a simple 4-item list with one line each

---

## 6. The Phenotype Quiz — full spec

**Route:** `/phenotype` (also embeddable as a modal from the homepage hero button)

**No account required. No data stored permanently until email is given at the
end.** Store quiz answers in component state / URL params until final submit.

### Questions (5 total, single-select, large tap targets for mobile)

**Q1 — Cycle pattern**
"How would you describe your periods over the last 6 months?"
- Regular (24–35 days)
- Irregular or unpredictable
- Often missed (35+ days or skipped months)
- I'm not sure / tracking just started

**Q2 — Visible symptoms** (multi-select)
"Which of these have you noticed? (select all that apply)"
- Acne along jawline or chin
- Excess hair growth (face, chin, body)
- Hair thinning or hair fall
- Sudden weight gain, especially around the abdomen
- None of these

**Q3 — Energy pattern**
"How is your energy through the day?"
- Stable most of the day
- Big afternoon crash / sugar cravings
- Tired most of the day regardless of sleep
- Anxious or wired, hard to relax

**Q4 — Cycle history**
"Were your cycles regular before, and did something change it?"
- Always been irregular since my first period
- Was regular, became irregular after stopping birth control
- Was regular, became irregular after a stressful period/life event
- Not sure

**Q5 — Pain**
"Do you experience period pain that affects daily activities (missing work/school,
needing to lie down)?"
- No, manageable with rest or mild medication
- Yes, sometimes
- Yes, severely — most cycles

### Scoring logic (static lookup — no AI call)

Map answers to one of the 4 Rotterdam phenotypes used in Video 1, using simple
rule-based logic:

```
Phenotype A (Classic) — Q1 irregular/missed + Q2 has 2+ androgen symptoms
  (acne, hair growth, hair fall)
Phenotype B (Hyperandrogenic) — Q1 irregular + Q2 has androgen symptoms,
  but lower severity signals
Phenotype C (Ovulatory) — Q1 regular + Q2 has androgen symptoms
  → flag as "regular cycles can still mask hormonal imbalance"
Phenotype D (Non-androgenic / stress-driven) — Q1 irregular + Q2 "none of these"
  + Q4 indicates post-pill or stress trigger, OR Q3 = anxious/wired

If Q5 = "severely" on ANY phenotype → add a separate flag:
  "Your pain pattern may also be worth discussing with a doctor —
   some causes of severe period pain need direct medical evaluation."
  (This is the Endometriosis-awareness flag from Video 1 — keep it
   gentle, never name Endometriosis directly on this result screen.
   Frame as "worth a conversation with your doctor.")
```

### Result screen
- Shows the matched phenotype name + a 2-3 sentence plain-language description
  (write these from the Video 1 script's phenotype descriptions — paraphrase,
  do not copy verbatim)
- Does NOT show supplement/diet recommendations yet — that requires the email
  gate
- CTA: "Get my full protocol preview by email" → email input → on submit, store
  in `leads` table with `source: 'phenotype_quiz'` and `quiz_result` +
  `quiz_answers` as JSON columns
- After submit: "Thanks! Your protocol preview is being prepared by our team and
  will arrive in your inbox soon." (This sets up the HITL review queue for later
  — for now it's just a holding message, no actual generation happens in this
  phase)

---

## 7. Supabase schema

One table for this phase:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null, -- 'hero_cta' | 'phenotype_quiz' | 'footer'
  quiz_result text,      -- nullable, e.g. 'phenotype_a'
  quiz_answers jsonb,     -- nullable, raw answers
  endometriosis_flag boolean default false,
  created_at timestamptz default now()
);

create index leads_email_idx on leads (email);
```

Add a simple `app/api/leads/route.ts` POST handler that validates email format
and inserts a row. Use environment variables `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to client).

If Supabase credentials are not yet configured, stub the API route to log to
console and return success — do not block the build on missing credentials.

---

## 8. Blog index page (`/blog`)

For this phase: a simple `/blog` page that fetches post titles + summaries from
Hashnode's public GraphQL API (no auth required for public blogs) and lists them
as cards linking out to the Hashnode post URLs directly. Do not build a full CMS
integration yet — that comes in Phase 3 when migrating to MDX.

If the Hashnode publication doesn't exist yet or the API call fails, render a
"Coming soon — first stories landing shortly" placeholder state. Do not let a
failed fetch break the build.

---

## 9. SEO requirements

- Use Next.js Metadata API for title/description on every route
- Homepage title: "Mauri — Restore Your Life Force | Integrative PCOS & PCOD Care"
- Homepage description: under 160 chars, include "PCOS", "PCOD", "integrative",
  "phenotype"
- Add `og:image` using `mauri-logo-primary.svg` converted to PNG (1200x630) —
  if SVG-to-PNG isn't feasible in this environment, use a solid-colour
  placeholder with the wordmark and note it needs a designed OG image later
- Add `sitemap.xml` and `robots.txt` via Next.js conventions
- Semantic HTML throughout — proper heading hierarchy (one `h1` per page)

---

## 10. Explicitly out of scope for this phase

Do not build any of the following — they belong to later PRD phases:

- User accounts / authentication
- The practitioner dashboard
- AI protocol generation (Claude API calls)
- Period/symptom tracker
- Manual lab marker entry
- Affiliate link resource hub (beyond the single case-study teaser link)
- Whisper voice check-in
- Payment integration

---

## 11. Acceptance criteria

- `npm run build` succeeds with no errors
- Lighthouse scores (mobile): Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95
- All copy in Section 4 appears verbatim (you may adjust line-breaks but not
  meaning)
- Phenotype quiz is fully functional client-side without requiring Supabase to
  be configured (graceful degradation on the final email-gated step)
- Site is responsive: test at 390px (mobile), 768px (tablet), 1280px (desktop)
- Colour tokens from Section 2 are used via Tailwind theme config, not
  hardcoded hex values scattered through components
- PWA manifest is present and the site is installable (even though it's just a
  landing page — this groundwork carries forward to Phase 2)

---

## 12. THE STARTER PROMPT — paste this into Claude Code

```
Read CLAUDE.md in full before doing anything else.

Set up a new Next.js 14 (App Router, TypeScript, Tailwind) project in this
directory for the Mauri landing page described in CLAUDE.md.

Build order:
1. Project scaffold + Tailwind theme config with the Mauri design tokens
   from Section 2
2. Fonts (Playfair Display + Inter) via next/font/google
3. Homepage (/) — build each section from Section 4 in order, starting with
   header + hero. Show me the hero before continuing to the rest so I can
   confirm the visual direction matches the mockup I have.
4. Phenotype quiz at /phenotype (Section 6) — client-side state, static
   scoring logic, no AI calls
5. Supabase leads table + API route (Section 7) — stub gracefully if env
   vars are missing
6. /about page (Section 5)
7. /blog index (Section 8) with graceful fallback
8. PWA manifest + favicon from brand/mauri-mark.svg
9. SEO metadata (Section 9)

After step 3, pause and show me the hero section before continuing — I want
to confirm the look before you build the rest of the page.

Use the design tokens and copy exactly as specified in CLAUDE.md sections
2 and 4. Ask me before deviating from any copy.
```
