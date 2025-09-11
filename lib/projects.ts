import { SITE } from "@/lib/site";

export type Project = {
  title: string;
  summary: string;
  tech: string[];
  live?: string;
  github?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "AeroAtlas — Travel Companion",
    summary:
      "Personalized trip planner with itinerary generation, activity suggestions, and weather-aware schedules.",
    tech: ["Next.js", "TypeScript", "Tailwind", "OpenStreetMap", "OpenWeather", "Supabase"],
    live: "", // e.g. "https://aeroatlas.app"
    github: SITE.github,
    image: "/og.png"
  },
  {
    title: "Stockseer — Real-Time Insight",
    summary:
      "Minimal dashboard for tracking price moves and simple ML signals. Built for clarity and fast page loads.",
    tech: ["Next.js", "FastAPI", "scikit-learn", "Tailwind"],
    live: "",
    github: SITE.github,
    image: "/og.png"
  },
  {
    title: "Portfolio vNext",
    summary:
      "This site: minimal yet expressive, glass surfaces + brutalist accents, buttery theme transitions.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "next-themes"],
    live: "/",
    github: SITE.github,
    image: "/og.png"
  }
];
