// components/Nav.tsx
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-neutral-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" prefetch className="focus-ring inline-flex items-center hover-lift transition-transform duration-200 ease-out">
            <span className="brutal rounded-md px-2 py-1 text-sm font-bold tracking-wide">AC</span>
            <span className="sr-only">Home</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-5">
              {[
                { href: "/#about", label: "About" },
                { href: "/#projects", label: "Projects" },
                { href: "/#experience", label: "Experience" },
                { href: "/#contact", label: "Contact" }
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch
                    className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out hover:text-accent"
                    aria-label={l.label}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
