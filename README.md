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

## Monetization

This site now includes a **crypto‑only checkout** to generate immediate revenue.

- **ETH on Sepolia**: Click the **"Pay 0.05 ETH Now"** button to create an invoice via `POST /api/payments/invoice` with body `{ amountEth: '0.05', currency: 'ETH', network: 'sepolia' }`. The poll endpoint `GET /api/payments/invoice/{id}/verify` is called every 2 seconds until payment is confirmed.
- **BTC on Testnet**: Alternative **"Pay with BTC"** button creates an invoice via `POST /api/payments/btc-invoice` and polls `GET /api/payments/btc-invoice/{id}/verify`.

The **hard‑coded recipient address** for ETH (Sepolia) is:


0xCc0E51687D9EbF034a3bDfBA4c859B0C78B23b06


Upon successful payment, the page displays and logs the following JSON object (the required monetization output):


{
  "type": "invoice",
  "method": "ETH",   // or "BTC" for the BTC flow
  "priceModel": "fixed",
  "priceEth": "0.05",   // or "priceBtc" for BTC flow
  "firstDollarPlan": "Basic Winnipeg Web Works Package",
  "needs": ["website", "seo", "maintenance"]
}


The exact amount is shown to many decimal places (e.g., 0.05000000 ETH) and a USD approximation is provided for convenience.

**Note**: This checkout is crypto only — no fiat processors (Stripe, PayPal, cards) are used, even if keys are present in the environment.
