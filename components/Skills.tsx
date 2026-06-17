import { skills } from "@/lib/skills";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section className="mx-auto max-w-content border-t border-line px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Stack</p>
        <dl className="mt-5 grid gap-6 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.group}</dt>
              <dd className="mt-2 font-mono text-sm leading-relaxed">{s.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
