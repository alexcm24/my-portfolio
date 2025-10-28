// components/ProjectCard.tsx
"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  onSelect?: (project: Project) => void;
};

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const handleSelect = (evt: MouseEvent<HTMLElement>) => {
    if (!onSelect || evt.defaultPrevented) {
      return;
    }

    const target = evt.target as HTMLElement | null;
    if (target?.closest("a")) {
      return;
    }

    onSelect(project);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLElement>) => {
    if (!onSelect) {
      return;
    }

    if (evt.key === "Enter" || evt.key === " ") {
      evt.preventDefault();
      onSelect(project);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.25 }}
      className="glass hover-lift hover-glow rounded-2xl p-4 focus-within:ring-2 focus-within:ring-accent cursor-pointer"
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `View details for ${project.title}` : undefined}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
        <Image
          src={project.image ?? "/og.png"}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        {project.live && (
          <Link
            href={project.live}
            prefetch
            className="focus-ring inline-flex items-center gap-1 text-sm underline hover-lift transition-colors duration-200 ease-out hover:text-accent"
            aria-label={`Open live site for ${project.title}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(evt) => evt.stopPropagation()}
          >
            Live <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
