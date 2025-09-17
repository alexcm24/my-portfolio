// app/page.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import Tag from "@/components/Tag";
import { projects } from "@/lib/projects";
import { experience } from "@/lib/experience";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = heroRef.current;
    if (!node) {
      return;
    }

    let raf = 0;

    const updateSpotlight = (evt: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((evt.clientX - rect.left) / rect.width) * 100;
      const y = ((evt.clientY - rect.top) / rect.height) * 100;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.setProperty("--spotlight-x", `${x}%`);
        node.style.setProperty("--spotlight-y", `${y}%`);
      });
    };

    const resetSpotlight = () => {
      node.style.setProperty("--spotlight-x", "50%");
      node.style.setProperty("--spotlight-y", "40%");
    };

    node.addEventListener("pointermove", updateSpotlight);
    node.addEventListener("pointerleave", resetSpotlight);

    return () => {
      cancelAnimationFrame(raf);
      node.removeEventListener("pointermove", updateSpotlight);
      node.removeEventListener("pointerleave", resetSpotlight);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Background layers (robust, class-based) */}
        <div aria-hidden="true" className="hero-grid" />
        <div aria-hidden="true" className="hero-gradient-bg animate-hero-gradient" />
        <div aria-hidden="true" className="hero-spotlight" />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Big brutalist name + small portfolio chip */}
            <h1 className="leading-none tracking-tight flex flex-wrap items-baseline gap-3">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black px-2">
                {SITE.name}
              </span>
              <span className="text-base font-mono px-3 py-1 rounded-md glass self-center">
                Portfolio
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl text-muted">
              {SITE.role} · {SITE.location}
            </h2>

            <p className="max-w-prose text-lg">{SITE.tagline}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="#projects" variant="primary" brutal ariaLabel="View projects">
                View Projects
              </Button>
              <Button
                href={SITE.resume || "#"}
                variant="secondary"
                ariaLabel="Download résumé"
                target={SITE.resume ? "_blank" : undefined}
                rel={SITE.resume ? "noopener noreferrer" : undefined}
              >
                Download Résumé
              </Button>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["TypeScript", "Next.js", "Framer Motion", "Tailwind"].map((s) => (
                <Tag key={s} label={s} />
              ))}
            </div>

            {/* Glass stats row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="glass hover-lift hover-glow rounded-2xl p-4">
                <div className="text-2xl font-semibold">3+</div>
                <div className="text-sm text-muted">Active Projects</div>
              </div>
              <div className="glass hover-lift hover-glow rounded-2xl p-4">
                <div className="text-2xl font-semibold">Let’s chat</div>
                <div className="text-sm text-muted">Open to collabs</div>
              </div>
            </div>

            {/* Social row */}
            <div className="flex gap-4 pt-3">
              <Link
                href={SITE.github}
                prefetch
                className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out underline hover:text-accent"
                aria-label="GitHub profile"
              >
                GitHub
              </Link>
              <Link
                href={SITE.linkedin}
                prefetch
                className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out underline hover:text-accent"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </Link>
              {SITE.x && (
                <Link
                  href={SITE.x}
                  prefetch
                  className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out underline hover:text-accent"
                  aria-label="X profile"
                >
                  X
                </Link>
              )}
              {SITE.email && (
                <Link
                  href={`mailto:${SITE.email}`}
                  prefetch
                  className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out underline hover:text-accent"
                  aria-label="Send email"
                >
                  Email
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" label="— PROJECTS" title="Selected Work" className="pt-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" label="— EXPERIENCE" title="Roles & Impact">
        <div className="space-y-6">
          {experience.map((item) => (
            <ExperienceItem key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" label="— ABOUT" title="A Bit About Me">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <p>
              I’m {SITE.name} — currently a {SITE.role}. I’m exploring different areas of software development and
              enjoy building useful, well-designed projects that put the user first.
            </p>
            <p>
              When I’m not coding, you’ll catch me training at the gym or planning the next trip. I value clean design,
              clear communication, and steady iteration.
            </p>
          </div>
          <div>
            <div className="glass hover-lift hover-glow rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "React", "Tailwind CSS", "Node.js", "Python", "SQL"].map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" label="— CONTACT" title="Say Hello">
        <div className="glass hover-lift hover-glow rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="max-w-prose">
            Interested in working together or just want to say hi? I’m open to chats, collaborations, and interesting ideas.
          </p>
          <div className="flex gap-3">
            <Button
              href={SITE.email ? `mailto:${SITE.email}` : "#"}
              variant="primary"
              ariaLabel="Email me"
            >
              Email Me
            </Button>
            <Button
              href={SITE.linkedin}
              variant="secondary"
              ariaLabel="Open LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
