# Winnipeg Web Works

Live: **https://winnipeg-web-works.vercel.app/**

Single-page static marketing site for Winnipeg Web Works — a digital-credibility studio for Winnipeg businesses ("We Find Where Your Website Is Losing You Customers"). Free 15-minute audit lead-gen; paid engagements from $10,000.

## What's on the site

- `index.html` — the entire site (markup, styles, JS in one file)
- `og-image.png` — social share preview image (1200×630, brand-matched ink + gold)
- `favicon.svg`, `apple-touch-icon.png` — site icons
- `audit-report-template.md` — template used for delivered audits
- `email-templates.md` — outreach email copy
- `google-ads-campaigns.md` — ad campaign notes (organic marketing only per owner; notes kept for reference)

## Design

Luxury rebrand (2026-09-30): deep ink + champagne gold palette, Fraunces display serif + Inter body (Google Fonts, `display=swap`), scroll-reveal animations with `prefers-reduced-motion` support, animated hero audit-score ring, dark ROI section, sticky header, sticky mobile CTA.

## Deploy

Static site — no build step, no dependencies, no environment variables.
Deploy `index.html` (+ `og-image.png`, icons) to Vercel; push to `main` and Vercel redeploys automatically.

Note: as of 2026-09-30 the live Vercel deployment was observed serving a stale commit (byte-identical to an older git commit while newer commits existed on `main`), so GitHub→Vercel auto-deploy may not be firing. If the live site looks stale after pushing, trigger a manual redeploy in the Vercel dashboard or re-link the GitHub integration.

## Lead form

The "Request your free audit" form posts to [FormSubmit](https://formsubmit.co) (keyless, no account secret in code) and submits client-side via fetch.

Client-side hardening:
- Inline per-field validation (name ≥ 2 chars, email regex, optional website normalized to https:// and URL-validated) with `aria-invalid` / `role="alert"` error messages
- Honeypot field (`_honey`) hidden off-screen, `tabindex="-1"`, `aria-hidden` — bots that fill it are silently dropped
- Speed trap: submissions faster than ~2.5s after page load are rejected as likely bots
- New optional "Business name" field for B2B lead quality
- If the FormSubmit endpoint is unreachable, the form shows a fallback message with the direct email `winnipegwebworks@gmail.com` so no lead is ever lost

## "Talk to our AI now" button

Wires into the ElevenLabs conversational-AI widget. If the widget CDN is blocked or fails to load, the button degrades gracefully by scrolling to the booking form instead of doing nothing.

## Accessibility

Skip link, semantic landmarks (`header`/`main`/`footer`/`nav`), labeled form inputs, native `<details>`/`<summary>` FAQ (keyboard accessible), `:focus-visible` styles, `aria-live` form status, `prefers-reduced-motion` disables animations.
