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
