import type { Project } from "@/lib/projects";
import ProjectMedia from "@/components/ProjectMedia";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="border-b border-line py-10 last:border-b-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-muted/70">{project.num}</span>
        <h3 className="font-serif text-2xl font-semibold">{project.title}</h3>
      </div>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
        <span>{project.tech.join(" · ")}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
        {project.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
            {l.label} ↗
          </a>
        ))}
      </div>
      <div className="mt-6 max-w-[760px]">
        <ProjectMedia src={project.image} alt={project.imageAlt ?? project.title} title={project.title} />
      </div>
    </article>
  );
}
