export type ProjectLink = { label: string; href: string };

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** the screenshot's own edge colour, shown around it when it sits in a shared frame ratio */
  edge?: string;
};

export type Project = {
  num: string; // "01"
  slug: string; // the anchor on the home page
  title: string;
  /** one line for the nav menu */
  tagline: string;
  /** the heading on the home page */
  headline: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  image: ProjectImage;
};

export const projects: Project[] = [
  {
    num: "01",
    slug: "pylot",
    title: "Pylot",
    tagline: "AI readiness scores for online stores",
    headline: "Pylot shows a store what AI shopping assistants can't read",
    description:
      "Enter a store's address. Pylot crawls its product pages the way an AI crawler would, scores them out of 100 and ranks every fix by the points it earns back.",
    tech: ["React", "Vite", "FastAPI", "Celery", "Playwright", "PostgreSQL", "Redis", "Railway"],
    links: [
      { label: "View case study", href: "/work/pylot" },
      { label: "Open pylot.run", href: "https://pylot.run" },
    ],
    image: {
      src: "/media/pylot-thumbnail.jpg",
      alt: "Pylot's report for nike.com: 73 out of 100, Grade B minus, with four sub-scores",
      width: 1400,
      height: 759,
    },
  },
  {
    num: "02",
    slug: "aurajewel",
    title: "AuraJewel",
    tagline: "Client work for a jewelry retailer",
    headline: "AuraJewel runs a jewelry retailer's service desk",
    description:
      "A paid project for a jewelry retailer. I built the web application they use to track service tickets, receipts and customer email, and the store's staff still work in it every day.",
    tech: ["Next.js", "TypeScript", "Supabase", "Resend", "Tailwind", "Radix UI"],
    links: [{ label: "Read the code", href: "https://github.com/alexcm24/AuraJewel" }],
    image: {
      src: "/media/aurajewel-thumbnail.jpg",
      alt: "AuraJewel's dashboard with open service tickets and balances",
      width: 1292,
      height: 747,
    },
  },
  {
    num: "03",
    slug: "stockseer",
    title: "Stockseer",
    tagline: "Next-day price forecasts",
    headline: "Stockseer forecasts tomorrow's closing price",
    description:
      "A FastAPI service trains on two years of daily prices and charts each prediction against what the market did.",
    tech: ["Next.js", "TypeScript", "FastAPI", "scikit-learn", "Twelve Data"],
    links: [
      { label: "Open Stockseer", href: "https://stockseer-three.vercel.app" },
      { label: "Read the code", href: "https://github.com/alexcm24/stockseer" },
    ],
    image: {
      src: "/media/stockseer-thumbnail.jpg",
      alt: "Stockseer chart of actual against predicted closing prices for AAPL",
      width: 1200,
      height: 890,
      edge: "#ffffff",
    },
  },
  {
    num: "04",
    slug: "color-reader",
    title: "Color Reader",
    tagline: "Colour names for colour-blind users",
    headline: "Color Reader names colours for colour-blind users",
    description:
      "K-means clustering in CIE LAB finds an image's main colours, then labels each with a name and a hex code.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Color science"],
    links: [
      { label: "Open Color Reader", href: "https://color-reader-one.vercel.app" },
      { label: "Read the code", href: "https://github.com/alexcm24/color-reader" },
    ],
    image: {
      src: "/media/color-reader-thumbnail.jpg",
      alt: "Color Reader showing an image's main colours with names and hex codes",
      width: 1200,
      height: 718,
      edge: "#0f0f0f",
    },
  },
];

export const projectBySlug = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`No project "${slug}"`);
  return p;
};
