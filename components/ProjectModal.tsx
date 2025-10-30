// components/ProjectModal.tsx
"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  useEffect(() => {
    if (project) {
      containerRef.current?.focus();
    }
  }, [project]);

  const renderMedia = (demoUrl?: string, image?: string) => {
    if (demoUrl) {
      const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(demoUrl);

      if (isEmbed) {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
            <iframe
              src={demoUrl}
              title={`${project?.title ?? "Project"} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        );
      }

      return (
        <video controls className="aspect-video w-full rounded-2xl bg-black" poster={project?.image}>
          <source src={demoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (!image) {
      return null;
    }

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={`${project?.title ?? "Project"} preview`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </div>
    );
  };

  const descriptionParagraphs = project?.description
    ? project.description.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            tabIndex={-1}
            className="relative z-10 max-h-[calc(100vh-4rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-black/80"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="focus-ring absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/40 text-sm font-medium backdrop-blur-md transition hover:bg-white/60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-6 pt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-sm text-muted">{project.summary}</p>
              </div>

              {renderMedia(project.demoUrl, project.image)}

              {descriptionParagraphs.length > 0 && (
                <div className="space-y-4 text-sm leading-relaxed text-muted">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.live && (
                  <Button
                    href={project.live}
                    variant="primary"
                    ariaLabel={`Open live site for ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                  </Button>
                )}
                {project.github && (
                  <Button
                    href={project.github}
                    variant="secondary"
                    ariaLabel={`Open GitHub repo for ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
