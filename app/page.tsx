import Arrow from "@/components/Arrow";
import Shot from "@/components/Shot";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { projectBySlug } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { skills } from "@/lib/skills";

// type: software (a portfolio: what is shown is software Alex built)
// deal: hero statement (flat ground, facts docked), nav nav-cards, close close-type, footer footer-statement,
// buttons arrow, mark arc; palette cool-white-slate (Reddit Sans + JetBrains Mono); moment lines-rise (#work)

const pylot = projectBySlug("pylot");
const aura = projectBySlug("aurajewel");
const more = [projectBySlug("stockseer"), projectBySlug("color-reader")];

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <section className="hero hero--statement hero--intro" data-enter aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text hero__in">
              <div>
                <h1 id="hero-h">{SITE.title}</h1>
                <div className="grid intro__row">
                  <p className="hero__lead span-7">{SITE.lead}</p>
                  <div className="btn-row span-5 start-8">
                    <a className="btn btn--primary" href="#pylot">
                      See the work
                      <Arrow />
                    </a>
                    <a className="btn btn--secondary" href="#contact">
                      Email Alex
                    </a>
                  </div>
                </div>
              </div>
              <dl className="hero__facts">
                {SITE.facts.map((f) => (
                  <div key={f.term}>
                    <dt>{f.term}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section" id="pylot" aria-labelledby="pylot-h">
          <div className="wrap grid feature">
            <div className="feature__text span-6">
              <p className="kicker">Live at pylot.run</p>
              <h2 id="pylot-h">{pylot.headline}</h2>
              <p className="t-lead">{pylot.description}</p>
              <ul className="rows">
                <li>
                  <span className="rows__name">
                    Built and deployed alone<small>API, worker, frontend, Postgres and Redis on Railway</small>
                  </span>
                  <span className="rows__value">Solo</span>
                </li>
                <li>
                  <span className="rows__name">A nike.com scan, after a fix found on the real store</span>
                  <span className="rows__value">302 s → 13 s</span>
                </li>
                <li>
                  <span className="rows__name">Backend and frontend tests, run in CI on every push</span>
                  <span className="rows__value">193 + 11</span>
                </li>
              </ul>
              <div className="btn-row">
                <a className="btn btn--primary" href="/work/pylot">
                  View case study
                  <Arrow />
                </a>
                <a className="btn btn--secondary" href="https://pylot.run">
                  Open pylot.run
                </a>
              </div>
            </div>
            <a className="span-6 start-7" href="/work/pylot" aria-label="Pylot case study">
              <Shot image={pylot.image} sizes="(max-width: 1023px) 100vw, 620px" />
            </a>
          </div>
        </section>

        <section className="section" id="aurajewel" aria-labelledby="aura-h">
          <div className="wrap grid feature">
            <div className="feature__text span-6">
              <p className="kicker">Client work · in daily use</p>
              <h2 id="aura-h">{aura.headline}</h2>
              <p className="t-lead">{aura.description}</p>
              <dl className="facts">
                <dt>Client</dt>
                <dd>Jewelry retailer, paid engagement</dd>
                <dt>Handles</dt>
                <dd>Service tickets, receipts, customer email</dd>
                <dt>Built for</dt>
                <dd>More stores: Postgres row-level security keeps each store&apos;s data apart</dd>
                <dt>Stack</dt>
                <dd>{aura.tech.join(", ")}</dd>
              </dl>
              <p className="me-links">
                {aura.links.map((l) => (
                  <a key={l.href} className="link" href={l.href}>
                    {l.label}
                  </a>
                ))}
              </p>
            </div>
            <Shot image={aura.image} className="span-6 start-7" sizes="(max-width: 1023px) 100vw, 620px" />
          </div>
        </section>

        <section className="section" id="work" data-moment="lines-rise" aria-labelledby="work-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="work-h">Two more products, both live</h2>
            </div>
            <div className="grid pair mo-lr__follow">
              {more.map((p) => (
                <article key={p.slug} className="pair__item span-6">
                  <Shot image={p.image} box="16 / 10" sizes="(max-width: 1023px) 100vw, 620px" />
                  <h3>{p.headline}</h3>
                  <p>{p.description}</p>
                  <div className="links">
                    {p.links.map((l) => (
                      <a key={l.href} className="link" href={l.href}>
                        {l.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-h">
          <div className="wrap grid grid--top">
            <div className="span-6 intro">
              <h2 id="about-h">I&apos;m Alex, a software engineer in Jacksonville</h2>
              <p className="t-lead">{SITE.about[0]}</p>
              {SITE.about.slice(1).map((para) => (
                <p key={para} className="body">
                  {para}
                </p>
              ))}
              <p className="me-links">
                <a className="link" href={SITE.resume}>Résumé</a>
                <a className="link" href={SITE.github}>GitHub</a>
                <a className="link" href={SITE.linkedin}>LinkedIn</a>
              </p>
            </div>
            <div className="span-6 start-7 skills">
              <h3 className="skills-h">What I work with</h3>
              <ul className="rows">
                {skills.map((s) => (
                  <li key={s.group}>
                    <span className="rows__name">
                      {s.group}
                      <small>{s.items.join(", ")}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
