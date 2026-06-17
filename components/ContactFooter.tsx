import { SITE } from "@/lib/site";

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-fg text-bg">
      <div className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Let&apos;s build something.</h2>
        <div className="mt-5 flex flex-wrap gap-4 font-mono text-sm text-accent">
          <a href={`mailto:${SITE.email}`} className="hover:opacity-80">{SITE.email}</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">LinkedIn ↗</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">GitHub ↗</a>
        </div>
        <p className="mt-10 font-mono text-[11px] text-bg/50">© {new Date().getFullYear()} {SITE.name} · {SITE.location}</p>
      </div>
    </footer>
  );
}
