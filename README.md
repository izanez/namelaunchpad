# NameLaunchpad

Premium username platform built with Next.js App Router, TypeScript, and TailwindCSS.

## Stack

- Next.js
- TypeScript
- TailwindCSS
- App Router

## Features

- Username generator
- Mass username generator
- Fortnite, Roblox, Fantasy, Clan, and SEO landing generators
- Favorites with local storage
- Sharing and copy actions
- SEO metadata, schema, sitemap, category pages, and internal linking
- AdSense-ready ad slots

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values if needed.

## Global stats with Supabase

NameLaunchpad now supports shared generator statistics and trending usernames through Supabase/Postgres.

1. Create a Supabase project
2. Open the SQL editor and run [`supabase/global-stats.sql`](./supabase/global-stats.sql)
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
4. Restart the app

Without Supabase configured, the app falls back to the previous browser-local statistics behavior.

## Vercel deploy

1. Create a new GitHub repository, for example `NameLaunchpad`
2. Push this project to GitHub
3. Import the repository into Vercel
4. Add environment variables from `.env.example`
5. Deploy

## GitHub push example

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/izanez/NameLaunchpad.git
git push -u origin main
```
