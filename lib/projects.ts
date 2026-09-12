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
    title: "Pylot",
    description:
      "Checks whether AI shopping assistants like ChatGPT can read an online store's product data, scores it out of 100, and lists what to fix. Testing it on real stores like Nike and Amazon exposed bugs I fixed test-first, including a robots.txt check that never detected blocked AI crawlers. 193 backend and 11 frontend tests, CI, Sentry, SSRF protection and rate limiting.",
    tech: ["React", "Vite", "FastAPI", "Celery", "Playwright", "PostgreSQL", "Redis", "Railway"],
    links: [
      { label: "Live", href: "https://pylot.run" },
      { label: "Case study", href: "/work/pylot" },
    ],
    image: "/media/pylot-thumbnail.jpg",
    imageAlt: "Pylot agent-readiness report with score gauge and sub-scores",
  },
  {
    num: "02",
    title: "AuraJewel",
    description:
      "A web app a jewelry store uses every day to manage tickets, print receipts and email customers. It has user accounts and is built to host more stores, with Postgres row-level security keeping each store's data separate.",
    tech: ["Next.js", "TypeScript", "Supabase", "Resend", "Tailwind", "Radix UI"],
    links: [{ label: "Code", href: "https://github.com/alexcm24/AuraJewel" }],
    image: "/media/aurajewel-thumbnail.jpg",
    imageAlt: "AuraJewel dashboard",
  },
  {
    num: "03",
    title: "Stockseer",
    description:
      "Forecasts a stock's next-day price with a linear regression model trained on about two years of daily closing prices, and charts each prediction against the real price.",
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
    num: "04",
    title: "Color Reader",
    description:
      "Pulls the main colors out of any image using k-means clustering in the CIE LAB color space, and gives each one a name and hex code. I built it with color-blind users in mind.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Color science"],
    links: [
      { label: "Live", href: "https://color-reader-one.vercel.app" },
      { label: "Code", href: "https://github.com/alexcm24/color-reader" },
    ],
    image: "/media/color-reader-thumbnail.jpg",
    imageAlt: "Color Reader palette extraction",
  },
];
