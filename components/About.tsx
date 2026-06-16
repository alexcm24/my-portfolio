import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content border-t border-line px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">About</p>
        <p className="mt-4 max-w-[60ch] font-serif text-xl leading-relaxed">{SITE.about}</p>
        <p className="mt-5 font-mono text-xs text-accent">★ {SITE.recognition}</p>
      </Reveal>
    </section>
  );
}
