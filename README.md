# Nexora Logics Website + Direct Upwork Outreach Landing Page

This project contains:

- Main Nexora Logics agency website at `/`
- Direct-only Upwork outreach landing page at `/upwork-outreach`
- Custom CMS/admin panel at `/Nexora_Logics_admin`
- Vercel serverless CMS API at `/api/cms`
- Optional Supabase-backed global CMS persistence with browser-local fallback

## Design system

The public site and Upwork page use the visual identity supplied in the Nexora landing-page reference:

- Archivo for display/headings
- Inter for body/UI
- Ink: `#0B0B0C`
- Surface: `#161616`
- Accent teal: `#2E7A9E`
- Deep teal: `#1F5C79`
- Navy: `#1B3F63`
- White: `#FFFFFF`
- Grey: `#A6A6A6`

The exact embedded logo from the supplied landing page is saved as `public/nexora-logo.png`.

## Main routes

- `/` — agency website
- `/about`
- `/services`
- `/portfolio`
- `/blog`
- `/contact`
- `/upwork-outreach` — direct campaign page; intentionally excluded from public navigation, footer, and site search
- `/Nexora_Logics_admin` — CMS

## CMS capabilities

The admin includes:

- Pages: add/edit/delete pages and control navbar/footer visibility
- Section Builder: create custom content blocks and attach them to pages
- Section order/visibility controls
- Main-site hero, text, images, services, portfolio, testimonials and contact settings
- Dedicated **Upwork Landing Page** editor for hero, CTAs and FAQ content
- Blog/posts and media library
- Theme/custom CSS controls
- Inquiry manager
- Import/export backup tools

## Cloud CMS setup (recommended for production)

The app works in browser-local mode without a backend. For one shared production CMS state across visitors/devices, configure Supabase + Vercel:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. In Vercel Project Settings → Environment Variables add:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
CMS_ADMIN_PASSWORD=YOUR_INITIAL_ADMIN_PASSWORD
```

`SUPABASE_SERVICE_ROLE_KEY` is server-side only. Do **not** expose it with a `VITE_` prefix.

4. Redeploy.
5. Open `/Nexora_Logics_admin` and sign in with `CMS_ADMIN_PASSWORD`.
6. The first CMS edit creates the shared `cms_state` row. After that, edits are loaded globally through `/api/cms`.

The API strips `adminConfig` from public CMS reads and requires the CMS password for writes.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Important deployment note

The previous ZIP contained Windows-specific `node_modules` and local Vercel credentials. They are intentionally excluded from this handoff. Run `npm install` on the machine/CI environment that will build the project.

## Content reset/versioning

The CMS browser storage key was bumped to `NEXORA_LOGICS_CMS_DATA_V6` so an older browser cache cannot keep the previous configuration where `/` incorrectly rendered the Upwork page.
