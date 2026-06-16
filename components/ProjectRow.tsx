import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="flex gap-5 border-b border-line py-8 last:border-b-0 sm:gap-8">
      <div className="font-mono text-sm text-muted/70">{project.num}</div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-semibold">{project.title}</h3>
        <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-muted">{project.description}</p>
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
      </div>
      <div className="relative hidden h-[88px] w-[140px] shrink-0 overflow-hidden rounded border border-line sm:block">
        {project.image ? (
          <Image src={project.image} alt={project.imageAlt ?? project.title} fill className="object-cover" sizes="140px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-line/40 font-mono text-[10px] text-muted">
            screenshot
          </div>
        )}
      </div>
    </article>
  );
}
