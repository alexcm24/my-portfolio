import { SITE } from "@/lib/site";

export type Project = {
  title: string;
  summary: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  image?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "AeroAtlas — Travel Companion",
    summary:
      "Personalized trip planner with itinerary generation, activity suggestions, and weather-aware schedules.",
    description:
      "AeroAtlas pulls in live weather data, attraction metadata, and preferred travel styles to build itineraries that feel personal. The dashboard makes it easy to drag and drop days, compare alternate activities, and export to mobile.",
    tech: ["Next.js", "TypeScript", "Tailwind", "OpenStreetMap", "OpenWeather", "Supabase"],
    live: "", // e.g. "https://aeroatlas.app"
    image: "/media/aero-thumbnail.jpg",
    demoUrl: "/media/aero-preview.mp4"
  },
  {
    title: "Stockseer — Real-Time Insight",
    summary:
      "Minimal dashboard for tracking price moves and simple ML signals. Built for clarity and fast page loads.",
    description:
      "Stockseer ingests minute-level price feeds, applies lightweight statistical filters, and flags unusual momentum. Custom alert rules route to Slack or email so traders only see actionable signals.",
    tech: ["Next.js", "FastAPI", "scikit-learn", "Tailwind"],
    live: "",
    github: "https://github.com/alexcm24/stockseer",
    image: "/media/stockseer-thumbnail.jpg"
  },
  {
    title: "Portfolio vNext",
    summary:
      "This site: minimal yet expressive, glass surfaces + brutalist accents, buttery theme transitions.",
    description:
      "An opinionated personal site that leans into playful motion, glassmorphism, and accessible color contrast. Features global spotlights, responsive layouts, and content sections sourced from typed data modules.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "next-themes"],
    live: "/",
    github: "https://github.com/alexcm24/my-portfolio",
    image: "/media/portfolio-thumbnail.jpg",
  }
];
