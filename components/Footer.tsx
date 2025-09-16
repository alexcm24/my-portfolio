// components/Footer.tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/20 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <nav aria-label="Footer">
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/#projects"
                  prefetch
                  className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out hover:text-accent"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  prefetch
                  className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out hover:text-accent"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  prefetch
                  className="focus-ring inline-flex items-center hover-lift transition-colors duration-200 ease-out hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
