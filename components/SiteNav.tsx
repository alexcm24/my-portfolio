import { projects } from "@/lib/projects";
import { SITE } from "@/lib/site";

// Plain <a> links throughout: each page loads the kit's scripts fresh, so a full page load is wanted.
export default function SiteNav({ home = "" }: { home?: "" | "/" }) {
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <a className="nav__logo" href={home || "#top"}>
          <span className="mark" data-mark="arc" aria-hidden="true" />
          {SITE.name}
        </a>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href={`${home}#pylot`}>
              Work{" "}
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                {projects.map((p) => (
                  <a
                    key={p.slug}
                    className="menu-card span-3"
                    href={p.slug === "pylot" ? "/work/pylot" : `${home}#${p.slug === "aurajewel" ? "aurajewel" : "work"}`}
                  >
                    <div className="panel">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="frame__img" src={p.image.src} alt="" loading="lazy" />
                    </div>
                    <span className="t-card">{p.title}</span>
                    <span className="t-small muted">{p.tagline}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="nav__item">
            <a className="nav__link" href={`${home}#about`}>
              About
            </a>
          </div>
        </nav>
        <div className="nav__actions">
          <a className="nav__link" href={SITE.resume}>
            Résumé
          </a>
          <a className="btn btn--primary" href="#contact">
            Email Alex
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
