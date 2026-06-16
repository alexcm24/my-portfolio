# Portfolio Redesign — Design Spec

**Date:** 2026-06-15
**Owner:** Alex Cañizares
**Repo:** `my-portfolio` (rebuild in place, new `redesign` branch)
**Live URL (unchanged):** https://my-portfolio-alexcanizares.vercel.app

## 1. Goal

Replace the current outdated portfolio (stale project descriptions, missing flagship project, generic positioning, ~190MB of unoptimized assets) with a modern, distinctive **editorial-minimal** site that positions Alex as a strong candidate for **software engineering internships and full-time / new-grad roles**.

Quality over quantity: 3 polished, accurate, mostly-live projects, in a layout built to drop in a 4th later with a one-line data change.

## 2. Positioning & Copy

- **Name:** Alex Cañizares
- **Role line (mono eyebrow):** `Software Engineer · CS @ UNF · Dec 2026`
- **Hero headline (serif):** "I build software people actually use." *(working line; refine during build)*
- **Hero intro:** CS student who ships real products — a production SaaS used by a live business, plus ML and accessibility tools. **Open to internship _and_ full-time / new-grad roles, remote or on-site.**
- **Location:** Jacksonville, FL
- **Contact:** canizaresalex24@gmail.com · GitHub [alexcm24](https://github.com/alexcm24) · LinkedIn [canizaresalex](https://www.linkedin.com/in/canizaresalex) · Résumé (`/resume.pdf`)

## 3. Information Architecture (single-page scroll)

Sticky minimal nav: name (left) · Work / About / Contact / Résumé ↗ / theme toggle (right).

1. **Hero** — eyebrow, serif headline, intro, primary "View Work" + GitHub/LinkedIn/Email.
2. **Selected Work** — numbered editorial rows (01–03), data-driven.
3. **About** — short, confident, accurate (UNF, graduating Dec 2026). Includes a compact **recognition line**: 1st place / 45 teams, UNF Computing Symposium 2025 (credential only, no project link).
4. **Stack** — real skills grouped.
5. **Contact** — dark closing panel; email + socials.

Cut from the current site: `/gallery` route, `lib/gallery.ts`, `public/gallery/*` (~190MB), `app/gallery/page.tsx`, and gallery-only components.

## 4. Project Content (accurate — `lib/projects.ts`)

**01 · AuraJewel** — Production multi-tenant SaaS for independent jewelry retailers: authentication, Postgres row-level security, ticketing, printable receipts, and transactional email. Live and used by a real business.
- Tech: Next.js · TypeScript · Supabase (Postgres + RLS) · Resend · Tailwind · Radix UI
- Links: **Code** https://github.com/alexcm24/AuraJewel (now public) · **Case study** (screenshots — Alex to provide). No public live link (client production instance).

**02 · Stockseer** — Full-stack ML app that forecasts next-day stock prices with linear regression trained on ~2 years of daily closes, visualized as an interactive actual-vs-predicted chart.
- Tech: Next.js · TypeScript · FastAPI · scikit-learn · Twelve Data API
- Links: **Live** https://stockseer-three.vercel.app · **API** https://stockseer-api.onrender.com · **Code** https://github.com/alexcm24/stockseer

**03 · Color Reader** — Accessible web app that extracts dominant colors from any image using k-means clustering in CIE LAB color space, returning named colors with hex codes. Built with color-vision accessibility in mind.
- Tech: Next.js · TypeScript · Tailwind · Color science (k-means, LAB, delta-E)
- Links: **Live** https://color-reader-one.vercel.app · **Code** https://github.com/alexcm24/color-reader

Each project entry supports optional `live`, `code`, `caseStudy`, `image`, `demoUrl`. Adding a 4th project = one object in the array.

## 5. Skills (`lib/skills.ts`)

- **Languages:** Python, TypeScript, JavaScript, Java, SQL, Swift, C
- **Frameworks:** React, Next.js, FastAPI, Spring Boot, Node.js, Tailwind CSS
- **Tools & Platforms:** Docker, Git, Supabase, PostgreSQL, AWS, Vercel

## 6. Visual System

**Aesthetic:** Editorial minimal, elevated — confident scale, generous whitespace, hairline rules, numbered index, monospace metadata to keep an engineer signal.

**Type (via `next/font`):**
- Display/headlines: **Fraunces** (characterful modern serif)
- Body: **Inter**
- Metadata/labels: **JetBrains Mono**

**Color tokens:**
| Token | Light | Dark |
|---|---|---|
| bg | `#f5f3ee` (warm off-white) | `#16150f` (warm near-black) |
| ink/text | `#1a1a1a` | `#ece9e0` |
| muted | `#6b6862` | `#9a958a` |
| hairline | `#e2ded3` | `#2b2925` |
| accent (gold) | `#b08d57` | `#c9a467` |

**Dark mode:** `next-themes`, **light default**, respects system preference, toggle in nav. Both themes fully polished.

**Motion:** One tasteful moment — subtle fade/slide-up as sections enter the viewport (Framer Motion), plus a small accent/arrow shift on project-row hover. All motion gated behind `prefers-reduced-motion`.

**Layout:** content max-width ~64rem, large vertical rhythm, fully responsive (mobile-first); project rows collapse gracefully on small screens.

## 7. Components

- `Nav` (sticky, anchors, résumé, `ThemeToggle`)
- `Hero`
- `ProjectList` → `ProjectRow` (data-driven from `lib/projects.ts`)
- `About` (includes the recognition line)
- `Skills`
- `ContactFooter`
- `ThemeToggle`

No standalone Experience section (Apple role cut per decision).

## 8. Tech Approach

- Rebuild **in place** on branch `redesign`; main untouched until merge. Vercel URL preserved; ship via preview deploy first.
- **Upgrade Next 14 → 15** (matches other repos; security). Keep React 18, Tailwind 3.4 to limit churn.
- Remove unused deps and the gallery feature entirely.
- **Image optimization:** `next/image` everywhere; recompress project thumbnails (current `portfolio-thumbnail.jpg` is 2.2MB) to web-appropriate sizes; AuraJewel screenshots provided by Alex.
- Update SEO metadata (title, description, OpenGraph), set `SITE.url` to the real Vercel URL; keep existing `sitemap.ts` / `robots.ts`.
- Accessibility: semantic landmarks, keyboard-navigable, visible focus states, AA contrast in both themes.

## 9. Out of Scope

- **AeroAtlas** as a project (not Alex's repo; no permission). Only the award credential appears.
- **aurajewel-agentic** — not portfolio-ready yet; slot in later when polished.
- Building any net-new project (e.g., a systems project) — separate effort.

## 10. Acceptance Criteria

1. Clean `next build`; deploys to a Vercel **preview** from `redesign`.
2. All external links resolve; live demos return 200.
3. Content is accurate — no stale/incorrect descriptions; AuraJewel present; positioning reflects internship **and** full-time.
4. Gallery and ~190MB of assets removed; Lighthouse performance strong (optimized images).
5. Responsive across mobile/tablet/desktop; light **and** dark both polished.
6. Accessible: keyboard nav, focus-visible, reduced-motion respected, AA contrast.
7. Adding a 4th project requires only a new entry in `lib/projects.ts`.
