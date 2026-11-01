# One Man Show – Website

Marketing website and product documentation for One Man Show, a platform for real estate brokers.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui. The site is in Hebrew and right-to-left. Hosted on Vercel.

## Getting started

Requires Node.js 24.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run `npm run build` and `npm run lint` before opening a PR.

## Project structure

- `src/app/(marketing)/` – marketing pages
- `src/app/docs/` – product documentation (later)
- `src/components/ui/` – shadcn components
- `src/components/layout/` – Header, Footer
- `src/components/sections/` – page sections
- `src/config/site.ts` – site name, nav and links

## Branches

- `feature/*` – work in progress, gets a Vercel Preview
- `dev` – staging, receives PRs from feature branches
- `main` – production, receives PRs from `dev` only

## Secrets

Never commit secrets. Local values go in `.env.local`, production values in Vercel Environment Variables. Keep variable names up to date in `.env.example`, without values.
