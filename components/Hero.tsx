import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-content px-6 pt-20 pb-16 sm:pt-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{SITE.eyebrow}</p>
        <h1 className="mt-5 max-w-[12ch] font-serif text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
          {SITE.headline}
        </h1>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">{SITE.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <a href="#work" className="rounded-sm bg-fg px-4 py-2 text-bg transition-opacity hover:opacity-90">
            View Work →
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-line px-4 py-2 transition-colors hover:border-fg">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">LinkedIn</a>
          <a href={`mailto:${SITE.email}`} className="text-muted hover:text-fg transition-colors">Email</a>
        </div>
      </Reveal>
    </section>
  );
}
