import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="whitespace-nowrap text-sm font-semibold tracking-tight">
          {SITE.name}
        </Link>
        <div className="flex items-center gap-3 whitespace-nowrap font-mono text-xs text-muted sm:gap-5">
          <Link href="/#work" className="hover:text-fg transition-colors">Work</Link>
          {/* Hidden on phones so the bar fits on one line; the page scrolls straight into About */}
          <Link href="/#about" className="hidden hover:text-fg transition-colors sm:inline">About</Link>
          <Link href="/#contact" className="hover:text-fg transition-colors">Contact</Link>
          <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
            Résumé ↗
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
