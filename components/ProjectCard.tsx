// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-4 focus-within:ring-2 focus-within:ring-accent"
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
            className="focus-ring inline-flex items-center gap-1 text-sm underline"
            aria-label={`Open live site for ${project.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live <ExternalLink className="h-4 w-4" />
          </Link>
        )}
        {project.github && (
          <Link
            href={project.github}
            prefetch
            className="focus-ring inline-flex items-center gap-1 text-sm underline"
            aria-label={`Open GitHub repo for ${project.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <Github className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
