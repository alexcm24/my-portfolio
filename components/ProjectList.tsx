import { projects } from "@/lib/projects";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export default function ProjectList() {
  const last = projects[projects.length - 1].num;
  return (
    <section id="work" className="mx-auto max-w-content border-t border-line px-6 py-10">
      <Reveal>
        <div className="flex items-baseline gap-3 font-mono text-xs">
          <span className="text-accent">{projects[0].num} — {last}</span>
          <span className="uppercase tracking-[0.18em] text-muted">Selected Work</span>
        </div>
        <div className="mt-4">
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
