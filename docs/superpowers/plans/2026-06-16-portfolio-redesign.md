# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `my-portfolio` as a modern editorial-minimal single-page site with accurate content, light/dark themes, and a data-driven project list.

**Architecture:** Next.js App Router, single `app/page.tsx` composed of focused section components. Content lives in typed data files under `lib/` so projects/skills are edited without touching markup. Theming via `next-themes` + CSS variables; type via `next/font/google`. Verified by `tsc`, `eslint`, `next build`, a small Vitest data test, and a Vercel preview deploy.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS 3.4, next-themes, Framer Motion, Vitest, fonts: Fraunces / Inter / JetBrains Mono.

**Working on branch:** `redesign` (already created; spec committed there).

**Testing note:** Presentational components are verified by `next build` + the live preview, not unit tests — that's the honest call for visual code. The one place a unit test earns its keep is the **data layer** (guards the "add a 4th project = one data entry" contract), so that gets a real TDD task.

---

### Task 1: Upgrade dependencies and add test tooling

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Confirm on the redesign branch**

Run: `cd /Users/alex24/Developer/my-portfolio && git branch --show-current`
Expected: `redesign`

- [ ] **Step 2: Upgrade Next.js + matching eslint config, add Vitest**

Run:
```bash
npm install next@15 eslint-config-next@15
npm install -D vitest@2
```
Expected: installs succeed; `package.json` shows `next` at `^15` and a `vitest` devDependency.

- [ ] **Step 3: Remove now-unused deps (forms/typography plugins are not used in the new design)**

Run:
```bash
npm uninstall @tailwindcss/forms @tailwindcss/typography
```
Expected: removed from `package.json`. (Keep `framer-motion`, `lucide-react`, `next-themes`, `tailwindcss-animate`.)

- [ ] **Step 4: Add scripts**

In `package.json` `"scripts"`, ensure these exist:
```json
"typecheck": "tsc --noEmit",
"test": "vitest run"
```

- [ ] **Step 5: Verify the project still builds before changing code**

Run: `npm run build`
Expected: build completes (existing pages compile). If the old `app/gallery` references removed deps, that's fine — it's deleted in Task 11; if the build fails *only* on `@tailwindcss/forms`/`typography` imports, proceed (those are removed in Task 2).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade to Next 15, add vitest, drop unused tailwind plugins"
```

---

### Task 2: Tailwind config + design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { content: "64rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #f5f3ee;
  --fg: #1a1a1a;
  --muted: #6b6862;
  --line: #e2ded3;
  --accent: #b08d57;
}

.dark {
  --bg: #16150f;
  --fg: #ece9e0;
  --muted: #9a958a;
  --line: #2b2925;
  --accent: #c9a467;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--fg);
  font-feature-settings: "liga" 1, "calt" 1;
}

/* Theme transition, disabled for reduced motion */
@media (prefers-reduced-motion: no-preference) {
  body { transition: background-color 250ms ease, color 250ms ease; }
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: compiles (pages may still reference old components — that's fine until later tasks). If it fails only because old `globals.css` classes were removed, continue; those components are replaced in later tasks.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: editorial design tokens and tailwind theme"
```

---

### Task 3: Data layer (TDD)

**Files:**
- Create: `lib/site.ts`
- Create: `lib/projects.ts`
- Create: `lib/skills.ts`
- Create: `vitest.config.ts`
- Test: `lib/__tests__/projects.test.ts`
- Delete: `lib/experience.ts`, `lib/gallery.ts`

- [ ] **Step 1: Write Vitest config**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node" },
});
```

- [ ] **Step 2: Write the failing test**

`lib/__tests__/projects.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { projects } from "@/lib/projects";

describe("projects data", () => {
  it("has at least 3 projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it("every project has required, non-empty fields", () => {
    for (const p of projects) {
      expect(p.num).toMatch(/^\d{2}$/);
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.description.trim().length).toBeGreaterThan(0);
      expect(p.tech.length).toBeGreaterThan(0);
      expect(p.links.length).toBeGreaterThan(0);
    }
  });

  it("every link href is absolute http(s) or root-relative", () => {
    for (const p of projects) {
      for (const l of p.links) {
        expect(l.label.trim().length).toBeGreaterThan(0);
        expect(l.href).toMatch(/^(https?:\/\/|\/)/);
      }
    }
  });
});
```

- [ ] **Step 3: Run the test, verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/projects`.

- [ ] **Step 4: Create `lib/projects.ts`**

```ts
export type ProjectLink = { label: string; href: string };

export type Project = {
  num: string; // "01"
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "AuraJewel",
    description:
      "Production multi-tenant SaaS for independent jewelry retailers: authentication, Postgres row-level security, ticketing, printable receipts, and transactional email. Live and used by a real business.",
    tech: ["Next.js", "TypeScript", "Supabase", "Resend", "Tailwind", "Radix UI"],
    links: [{ label: "Code", href: "https://github.com/alexcm24/AuraJewel" }],
    image: "/media/aurajewel-thumbnail.jpg",
    imageAlt: "AuraJewel dashboard",
  },
  {
    num: "02",
    title: "Stockseer",
    description:
      "Full-stack ML app that forecasts next-day stock prices with linear regression trained on ~2 years of daily closes, visualized as an interactive actual-vs-predicted chart.",
    tech: ["Next.js", "TypeScript", "FastAPI", "scikit-learn", "Twelve Data"],
    links: [
      { label: "Live", href: "https://stockseer-three.vercel.app" },
      { label: "API", href: "https://stockseer-api.onrender.com/health" },
      { label: "Code", href: "https://github.com/alexcm24/stockseer" },
    ],
    image: "/media/stockseer-thumbnail.jpg",
    imageAlt: "Stockseer forecast chart",
  },
  {
    num: "03",
    title: "Color Reader",
    description:
      "Accessible web app that extracts dominant colors from any image using k-means clustering in CIE LAB color space, returning named colors with hex codes. Built with color-vision accessibility in mind.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Color science"],
    links: [
      { label: "Live", href: "https://color-reader-one.vercel.app" },
      { label: "Code", href: "https://github.com/alexcm24/color-reader" },
    ],
    image: "/media/color-reader-thumbnail.jpg",
    imageAlt: "Color Reader palette extraction",
  },
];
```

- [ ] **Step 5: Run the test, verify it passes**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 6: Create `lib/site.ts`**

```ts
export const SITE = {
  name: "Alex Cañizares",
  role: "Software Engineer",
  eyebrow: "Software Engineer · CS @ UNF · Dec 2026",
  headline: "I build software people actually use.",
  intro:
    "I'm a computer science student who ships real products — a production SaaS used by a live business, plus ML and accessibility tools. Open to internship and full-time / new-grad roles, remote or on-site.",
  about:
    "Computer science student at the University of North Florida, graduating December 2026. I like turning messy real-world problems into clean, reliable software — and I care about the details users feel.",
  recognition: "1st place (of 45 teams) · UNF Computing Symposium 2025",
  location: "Jacksonville, FL",
  email: "canizaresalex24@gmail.com",
  github: "https://github.com/alexcm24",
  linkedin: "https://www.linkedin.com/in/canizaresalex",
  resume: "/resume.pdf",
  url: "https://my-portfolio-alexcanizares.vercel.app",
} as const;
```

- [ ] **Step 7: Create `lib/skills.ts`**

```ts
export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Swift", "C"] },
  { group: "Frameworks", items: ["React", "Next.js", "FastAPI", "Spring Boot", "Node.js", "Tailwind CSS"] },
  { group: "Tools & Platforms", items: ["Docker", "Git", "Supabase", "PostgreSQL", "AWS", "Vercel"] },
];
```

- [ ] **Step 8: Delete obsolete data files**

Run: `git rm lib/experience.ts lib/gallery.ts`
Expected: both removed.

- [ ] **Step 9: Commit**

```bash
git add lib/site.ts lib/projects.ts lib/skills.ts vitest.config.ts lib/__tests__/projects.test.ts
git commit -m "feat: typed content data layer with data-integrity tests"
```

---

### Task 4: Fonts + ThemeProvider in layout

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/ThemeProvider.tsx`

- [ ] **Step 1: Create `components/ThemeProvider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.intro,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.intro,
    url: SITE.url,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: no errors from `layout.tsx` / `ThemeProvider.tsx`. (Errors from not-yet-replaced `app/page.tsx` are expected and handled in Task 10.)

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/ThemeProvider.tsx
git commit -m "feat: wire editorial fonts and theme provider"
```

---

### Task 5: ThemeToggle

**Files:**
- Modify: `components/ThemeToggle.tsx`

- [ ] **Step 1: Replace `components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded text-muted hover:text-fg transition-colors"
    >
      {mounted && (isDark ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: no new errors in `ThemeToggle.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/ThemeToggle.tsx
git commit -m "feat: theme toggle (light/dark)"
```

---

### Task 6: Nav

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Replace `components/Nav.tsx`**

```tsx
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="#top" className="text-sm font-semibold tracking-tight">
          {SITE.name}
        </Link>
        <div className="flex items-center gap-5 font-mono text-xs text-muted">
          <Link href="#work" className="hover:text-fg transition-colors">Work</Link>
          <Link href="#about" className="hover:text-fg transition-colors">About</Link>
          <Link href="#contact" className="hover:text-fg transition-colors">Contact</Link>
          <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
            Résumé ↗
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: no new errors in `Nav.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: sticky editorial nav"
```

---

### Task 7: Reveal helper + Hero

**Files:**
- Create: `components/Reveal.tsx`
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Reveal.tsx` (the one tasteful motion moment, reduced-motion safe)**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/Hero.tsx`**

```tsx
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-content px-6 pt-20 pb-16 sm:pt-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{SITE.eyebrow}</p>
        <h1 className="mt-5 max-w-[12ch] font-serif text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
          {SITE.headline}
        </h1>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">{SITE.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <a href="#work" className="rounded-sm bg-fg px-4 py-2 text-bg transition-opacity hover:opacity-90">
            View Work →
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-line px-4 py-2 transition-colors hover:border-fg">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">LinkedIn</a>
          <a href={`mailto:${SITE.email}`} className="text-muted hover:text-fg transition-colors">Email</a>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: no new errors in `Reveal.tsx` / `Hero.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/Reveal.tsx components/Hero.tsx
git commit -m "feat: hero section and reveal-on-scroll helper"
```

---

### Task 8: ProjectRow + ProjectList

**Files:**
- Create: `components/ProjectRow.tsx`
- Create: `components/ProjectList.tsx`

- [ ] **Step 1: Create `components/ProjectRow.tsx` (graceful placeholder when no image)**

```tsx
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="flex gap-5 border-b border-line py-8 last:border-b-0 sm:gap-8">
      <div className="font-mono text-sm text-muted/70">{project.num}</div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-semibold">{project.title}</h3>
        <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
          <span>{project.tech.join(" · ")}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
      <div className="relative hidden h-[88px] w-[140px] shrink-0 overflow-hidden rounded border border-line sm:block">
        {project.image ? (
          <Image src={project.image} alt={project.imageAlt ?? project.title} fill className="object-cover" sizes="140px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-line/40 font-mono text-[10px] text-muted">
            screenshot
          </div>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `components/ProjectList.tsx`**

```tsx
import { projects } from "@/lib/projects";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export default function ProjectList() {
  const last = projects[projects.length - 1].num;
  return (
    <section id="work" className="mx-auto max-w-content border-t border-line px-6 py-10">
      <Reveal>
        <div className="flex items-baseline gap-3 font-mono text-xs">
          <span className="text-accent">{projects[0].num} — {last}</span>
          <span className="uppercase tracking-[0.18em] text-muted">Selected Work</span>
        </div>
        <div className="mt-4">
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: no new errors in `ProjectRow.tsx` / `ProjectList.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectRow.tsx components/ProjectList.tsx
git commit -m "feat: data-driven project list"
```

---

### Task 9: About (with recognition) + Skills + ContactFooter

**Files:**
- Create: `components/About.tsx`
- Create: `components/Skills.tsx`
- Create: `components/ContactFooter.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content border-t border-line px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">About</p>
        <p className="mt-4 max-w-[60ch] font-serif text-xl leading-relaxed">{SITE.about}</p>
        <p className="mt-5 font-mono text-xs text-accent">★ {SITE.recognition}</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Skills.tsx`**

```tsx
import { skills } from "@/lib/skills";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section className="mx-auto max-w-content border-t border-line px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Stack</p>
        <dl className="mt-5 grid gap-6 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.group}</dt>
              <dd className="mt-2 font-mono text-sm leading-relaxed">{s.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/ContactFooter.tsx`**

```tsx
import { SITE } from "@/lib/site";

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-fg text-bg">
      <div className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Let&apos;s build something.</h2>
        <div className="mt-5 flex flex-wrap gap-4 font-mono text-sm text-accent">
          <a href={`mailto:${SITE.email}`} className="hover:opacity-80">{SITE.email}</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">LinkedIn ↗</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">GitHub ↗</a>
        </div>
        <p className="mt-10 font-mono text-[11px] text-bg/50">© {new Date().getFullYear()} {SITE.name} · {SITE.location}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: no new errors in the three new files.

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx components/Skills.tsx components/ContactFooter.tsx
git commit -m "feat: about (with recognition), skills, contact footer"
```

---

### Task 10: Assemble the page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ContactFooter from "@/components/ContactFooter";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectList />
        <About />
        <Skills />
      </main>
      <ContactFooter />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds — unless old components still imported elsewhere (handled in Task 11). If it fails on `app/gallery/page.tsx` importing deleted `lib/gallery.ts`, proceed to Task 11 then rebuild.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble editorial homepage"
```

---

### Task 11: Remove gallery + obsolete components + heavy assets

**Files:**
- Delete: `app/gallery/page.tsx` (+ empty `app/gallery/`)
- Delete: `public/gallery/` (~190MB)
- Delete unused components: `components/ProjectCard.tsx`, `components/ProjectModal.tsx`, `components/ExperienceItem.tsx`, `components/HeroBackdrop.tsx`, `components/Section.tsx`, `components/Tag.tsx`, `components/Button.tsx`, `components/Footer.tsx`

- [ ] **Step 1: Delete the gallery route and assets**

Run:
```bash
git rm -r app/gallery
git rm -r public/gallery
```

- [ ] **Step 2: Confirm no remaining imports of the old components**

Run: `grep -rEl "ProjectCard|ProjectModal|ExperienceItem|HeroBackdrop|components/Section|components/Tag|components/Button|components/Footer" app components`
Expected: no output. If any file lists, it must be one being deleted in Step 3.

- [ ] **Step 3: Delete unused components**

Run:
```bash
git rm components/ProjectCard.tsx components/ProjectModal.tsx components/ExperienceItem.tsx components/HeroBackdrop.tsx components/Section.tsx components/Tag.tsx components/Button.tsx components/Footer.tsx
```

- [ ] **Step 4: Verify build + tests + lint**

Run: `npm run build && npm test && npm run lint`
Expected: all pass; route list shows `/` (and not `/gallery`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove gallery, obsolete components, and 190MB of assets"
```

---

### Task 12: Optimize images + AuraJewel placeholder

**Files:**
- Modify: `public/media/*` (recompress)
- Note: `public/media/aurajewel-thumbnail.jpg` is supplied later by Alex; until then the row renders a styled placeholder (handled in `ProjectRow`).

- [ ] **Step 1: Recompress oversized thumbnails (macOS `sips`)**

Run:
```bash
cd /Users/alex24/Developer/my-portfolio/public/media
sips -Z 1200 -s formatOptions 72 color-reader-thumbnail.jpg --out color-reader-thumbnail.jpg
sips -Z 1200 -s formatOptions 72 stockseer-thumbnail.jpg --out stockseer-thumbnail.jpg
```
Expected: file sizes drop to tens of KB. (`aero-thumbnail.jpg` is already ~37KB; leave it. It is unused now but harmless — delete if desired.)

- [ ] **Step 2: Remove the unused 2.2MB hero/OG source and the 41MB aero video (no longer referenced)**

Run:
```bash
cd /Users/alex24/Developer/my-portfolio
git rm public/media/portfolio-thumbnail.jpg public/media/aero-preview.mp4 public/media/aero-thumbnail.jpg
```
Expected: removed. (These are not referenced by any project after the redesign.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds. AuraJewel row shows the "screenshot" placeholder since `aurajewel-thumbnail.jpg` does not exist yet — this is expected and acceptable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "perf: optimize thumbnails, drop unused heavy media"
```

---

### Task 13: SEO metadata + sitemap/robots

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`

- [ ] **Step 1: Inspect both files**

Run: `cat app/sitemap.ts app/robots.ts`
Expected: they reference a site URL (possibly the old `SITE.url` or a placeholder).

- [ ] **Step 2: Ensure both derive the URL from `SITE.url`**

`app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

`app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; `/sitemap.xml` and `/robots.txt` listed in the route output.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: sitemap and robots derive from SITE.url"
```

---

### Task 14: Full verification + Vercel preview deploy

**Files:** none (verification only)

- [ ] **Step 1: Run the full gate**

Run: `npm run typecheck && npm run lint && npm test && npm run build`
Expected: all green.

- [ ] **Step 2: Local smoke test**

Run: `npm run dev` then open `http://localhost:3000`.
Verify by eye: hero, three project rows with working links, light/dark toggle flips and persists, About + recognition line, Stack, contact footer. Stop the dev server when done.

- [ ] **Step 3: Push branch and create a preview deploy**

Run:
```bash
git push -u origin redesign
cd /Users/alex24/Developer/my-portfolio && vercel --yes
```
Expected: a preview URL (NOT production). Open it and re-verify.

- [ ] **Step 4: Check external links resolve**

Run:
```bash
for u in https://stockseer-three.vercel.app https://stockseer-api.onrender.com/health https://color-reader-one.vercel.app https://github.com/alexcm24/AuraJewel https://github.com/alexcm24/stockseer https://github.com/alexcm24/color-reader; do
  printf "%s -> " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "$u";
done
```
Expected: all 200 (Stockseer API may take ~30–60s to wake on first hit, then 200).

- [ ] **Step 5: Stop the visual companion server (brainstorm done)**

Run: `/Users/alex24/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/brainstorming/scripts/stop-server.sh /Users/alex24/Developer/my-portfolio/.superpowers/brainstorm/88370-1781583402` (ignore if already stopped).

---

### Task 15: Go-live (gated on Alex's approval)

**Do NOT run this task until Alex has reviewed the preview URL and the AuraJewel screenshot is in place.**

**Files:**
- Add: `public/media/aurajewel-thumbnail.jpg` (provided by Alex)

- [ ] **Step 1: Add AuraJewel screenshot (when provided)**

Place the image at `public/media/aurajewel-thumbnail.jpg`, then:
```bash
cd /Users/alex24/Developer/my-portfolio/public/media
sips -Z 1200 -s formatOptions 72 aurajewel-thumbnail.jpg --out aurajewel-thumbnail.jpg
cd /Users/alex24/Developer/my-portfolio
git add public/media/aurajewel-thumbnail.jpg && git commit -m "feat: add AuraJewel screenshot"
```

- [ ] **Step 2: Merge to main**

Run:
```bash
git checkout main && git merge --no-ff redesign -m "Redesign portfolio (editorial minimal)"
git push origin main
```

- [ ] **Step 3: Promote to production**

Run: `vercel --prod --yes`
Expected: production URL updates. Verify `https://my-portfolio-alexcanizares.vercel.app` shows the new site in both themes.

---

## Self-Review Notes

- **Spec coverage:** Positioning/copy → Task 3 (`site.ts`). IA sections → Tasks 7–10. Project content → Task 3. Skills → Task 3/9. Visual system (tokens, fonts, dark mode, motion) → Tasks 2, 4, 5, 7. Components → Tasks 5–9. Tech approach (Next 15, branch, image opt, gallery removal, SEO) → Tasks 1, 11, 12, 13. Light default → Task 4. Apple cut / award folded into About → Tasks 3, 9. Acceptance criteria → Task 14. Extensibility (4th project = one entry) → Task 3 test + Task 8.
- **Placeholders:** none — every code step has complete content. (The AuraJewel *image* is an intentional, gracefully-handled runtime placeholder, not a plan placeholder.)
- **Type consistency:** `Project`/`ProjectLink` (Task 3) used identically in Tasks 8; `SkillGroup` (Task 3) used in Task 9; `SITE` fields referenced (`eyebrow`, `headline`, `intro`, `about`, `recognition`, `email`, `github`, `linkedin`, `resume`, `url`, `location`, `name`, `role`) all defined in Task 3.
