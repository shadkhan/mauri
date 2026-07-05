# Mauri Hostinger Deployment Checklist

## Domain

- Confirm the primary domain is `https://www.mauri.in`.
- Add both environment variables in Hostinger Node.js app settings:
  - `NEXT_PUBLIC_APP_URL=https://www.mauri.in`
  - `NEXT_PUBLIC_API_URL=https://www.mauri.in/api`
- Confirm SSL is active for `www.mauri.in`.
- Redirect the bare domain `mauri.in` to `https://www.mauri.in` if both are connected.

## Build Settings

- Node.js version: `20.x` or newer.
- Install command: `pnpm install`
- Build command: `pnpm build`
- Start command: `pnpm start`
- Output directory: `.next`

## Required Runtime Environment Variables

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_TO`
- `LEAD_NOTIFICATION_FROM`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`

Optional:

- `DB_SSL=true` if Hostinger requires SSL for MySQL connections
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

## Post-Deployment Checks

- Open `https://www.mauri.in`.
- Open `https://www.mauri.in/about`.
- Open `https://www.mauri.in/blog`.
- Open `https://www.mauri.in/phenotype`.
- Open `https://www.mauri.in/robots.txt`.
- Open `https://www.mauri.in/sitemap.xml`.
- Open `https://www.mauri.in/manifest.json`.
- Confirm favicon appears in the browser tab.
- Submit a test waitlist lead.
- Submit a test Discovery Assessment lead.
- Check Hostinger logs for API errors.
- Confirm leads are saved and email notifications are sent if Resend is configured.

## SEO Checks

- Inspect page source for canonical tags.
- Inspect page source for Open Graph tags.
- Inspect page source for Twitter card tags.
- Test `https://www.mauri.in` in a social preview debugger.
- Submit `https://www.mauri.in/sitemap.xml` in Google Search Console.
