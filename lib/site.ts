// lib/site.ts
export const SITE = {
  name: "Alex Cañizares",
  role: "Computer Science Student",
  tagline:
    "Computer Science student exploring different areas of software development with curiosity and a focus on building useful, well-designed projects.",
  location: "Jacksonville, FL",
  email: "canizaresalex24@gmial.com", // optional: "you@example.com"
  github: "https://github.com/alexcm24",
  linkedin: "https://www.linkedin.com/in/canizaresalex",
  x: "", // optional
  resume: "", // optional link e.g. "https://..."
  // Used by metadata/sitemap
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
} as const;
