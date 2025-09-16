// components/ExperienceItem.tsx
import type { Experience } from "@/lib/experience";

export default function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="relative rounded-2xl border border-white/20 dark:border-white/10 p-5 glass hover-lift hover-glow">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-lg font-semibold">
          {item.role} · <span className="text-muted">{item.company}</span>
        </h3>
        <div className="font-mono text-xs text-muted">{item.period}</div>
      </div>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {item.impacts.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}
