// lib/experience.ts
import { SITE } from "@/lib/site";

export type Experience = {
  company: string;
  role: string;
  period: string;
  impacts: string[];
};

export const experience: Experience[] = [
  {
    company: "Apple (Retail · Genius Bar / Technical Specialist)",
    role: "Technical Specialist",
    period: `2024 — Present · ${SITE.location}`,
    impacts: [
      "Achieved top-tier NPS; handled diagnostics, escalations, and bug reports with consistent quality.",
      "Partnered with teammates to streamline triage and improve average queue throughput.",
      "Created internal notes and quick-reference guides to help onboard new teammates faster."
    ]
  },
  {
    company: "University of North Florida",
    role: "CS Student · Projects",
    period: "2023 — Present",
    impacts: [
      "Built projects with a focus on UX and performance (AeroAtlas, dashboard tooling).",
      "Explored data fetching strategies (ISR/SSR) and pragmatic TypeScript patterns.",
      "Collaborated in small teams; practiced code reviews and CI basics."
    ]
  }
];
