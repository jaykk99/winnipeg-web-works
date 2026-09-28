# Winnipeg Web Works

Live: **https://winnipeg-web-works.vercel.app/**

Single-page static marketing site for Winnipeg Web Works — a digital-audit service for Winnipeg businesses ("We Find Where Your Website Is Losing You Customers"). Free 15-minute audit call, written report in 24 hours.

## What's on the site

- `index.html` — the entire site (markup, styles, JS in one file)
- `og-image.png` — social share preview image (1200×630)
- `audit-report-template.md` — template used for delivered audits
- `email-templates.md` — outreach email copy
- `google-ads-campaigns.md` — ad campaign notes

## Deploy

Static site — no build step, no dependencies, no environment variables.
Deploy `index.html` (+ `og-image.png`) to Vercel; push to `main` and Vercel redeploys automatically.

## Lead form

The "Request your free audit" form posts to [FormSubmit](https://formsubmit.co) (keyless, no account secret in code) and submits client-side via fetch.
If the FormSubmit endpoint is unreachable, the form shows the fallback email `winnipegwebworks@gmail.com` so no lead is ever lost.

## "Talk to our AI now" button

Wires into the ElevenLabs conversational-AI widget. If the widget CDN is blocked or fails to load, the button degrades gracefully by scrolling to the booking form instead of doing nothing.
