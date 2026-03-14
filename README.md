# BestAfter website

Mostly-static Astro site for nonprofit open source software projects, with Cloudflare deployment in mind and a small donation progress API route.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your donation provider settings:

```bash
cp .env.example .env
```

3. Start local development:

```bash
npm run dev
```

## Deploy to Cloudflare

This project is configured for Cloudflare Pages via [`wrangler.jsonc`](/Users/cviens/Documents/Programmation/Personnal/bestafter/wrangler.jsonc).

1. Update the project name in [`wrangler.jsonc`](/Users/cviens/Documents/Programmation/Personnal/bestafter/wrangler.jsonc) if needed.
2. Build and deploy:

```bash
npm run deploy
```

## Donation integration

The donation page expects two inputs:

- `DONATION_EMBED_URL`: the hosted donation page or embed URL
- `DONATION_API_URL`: an endpoint that returns campaign totals

Optional settings:

- `DONATION_API_TOKEN`: bearer token for providers that require authentication
- `DONATION_GOAL_AMOUNT`: fallback goal used if the provider response does not include one
- `DONATION_CURRENCY`: fallback ISO currency code, defaults to `USD`
- `DONATION_CACHE_SECONDS`: edge cache duration for `/api/donations/progress`

The API route normalizes a few common response shapes:

- `amountRaised`
- `currentAmount`
- `total`
- `raised`
- `goalAmount`
- `goal`

If your provider uses a different shape, update [`src/lib/donations.ts`](/Users/cviens/Documents/Programmation/Personnal/bestafter/src/lib/donations.ts).
