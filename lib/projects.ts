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
    title: "Color-Reader — Accessibility Tool",
    summary:
      "A minimal web app that detects dominant colors from any image and displays their HEX, RGB, and HSL values. Designed for designers and developers who need quick palette extraction.",
    description:`
• Upload or drag-and-drop images  
• Auto-extract color palette  
• Copy color codes instantly 
• Features test-to-speech for color names 
• Smooth, responsive UI
`,
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "ColorThief"],
    live: "",
    github: "https://github.com/alexcm24/color-reader",
    image: "/media/color-reader-thumbnail.jpg",
  }
];
