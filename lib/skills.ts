export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Swift", "C"] },
  { group: "Backend", items: ["FastAPI", "Spring Boot", "Node.js", "Celery", "REST APIs"] },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { group: "Data and infrastructure", items: ["PostgreSQL", "Supabase", "Redis", "Docker", "AWS", "Vercel", "Railway"] },
  { group: "Practice", items: ["Tests in CI on every push", "Sentry", "rate limiting", "SSRF protection"] },
];
