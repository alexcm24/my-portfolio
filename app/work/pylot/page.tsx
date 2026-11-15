import type { Metadata } from "next";
import Arrow from "@/components/Arrow";
import Shot from "@/components/Shot";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import type { ProjectImage } from "@/lib/projects";
import { SITE } from "@/lib/site";

// the Pylot case study: the home page's deal; moment lines-rise (#bugs)

const TITLE = `Pylot case study | ${SITE.name}`;
const DESCRIPTION =
  "How I built Pylot, a tool that scores how well AI shopping assistants can read an online store, and what testing it on real stores like Nike and Amazon uncovered.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work/pylot" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/work/pylot`,
    type: "article",
    images: [{ url: "/media/pylot/report.jpg", width: 2000, height: 1085 }],
  },
};

const REPORT: ProjectImage = {
  src: "/media/pylot/report.jpg",
  alt: "Pylot report for nike.com with a score of 73 out of 100, Grade B minus, and four sub-scores",
  width: 2000,
  height: 1085,
};
const LANDING: ProjectImage = {
  src: "/media/pylot/landing.jpg",
  alt: "Pylot's home page with nike.com entered in the scan box",
  width: 2400,
  height: 1500,
};
const ISSUES: ProjectImage = {
  src: "/media/pylot/issues.jpg",
  alt: "Pylot's list of six issues for nike.com, each with severity, points and how to fix it",
  width: 2400,
  height: 1500,
};

const ISSUE_LIST = [
  { title: "Add availability to product offers", pts: 2, sev: "crit", label: "Critical", scope: "9 of 10 products" },
  { title: "Expand product descriptions", pts: 6, sev: "high", label: "High", scope: "8 of 10 products" },
  { title: "Add GTIN, MPN and SKU", pts: 4, sev: "high", label: "High", scope: "10 of 10 products" },
  { title: "Publish an llms.txt file", pts: 8, sev: "med", label: "Medium", scope: "whole site" },
  { title: "Add ratings and reviews to markup", pts: 4, sev: "med", label: "Medium", scope: "10 of 10 products" },
  { title: "Add more product images", pts: 2, sev: "med", label: "Low", scope: "10 of 10 products" },
];

const SUB_SCORES = [
  ["Schema", 100],
  ["Completeness", 67],
  ["Content richness", 55],
  ["Agent protocol", 68],
] as const;

// Each one was found by scanning a real store and checking the result against
// the store's actual pages. Keep these to things that happened.
const LESSONS = [
  {
    headline: "Blocked AI crawlers were never detected",
    body: "The robots.txt check passed its arguments to the parser in reverse, so a store blocking GPTBot scored as open. One test per crawler now; amazon.com is correctly flagged.",
    value: "GPTBot",
  },
  {
    headline: "Nike timed out at five minutes",
    body: "The sitemap library probed dozens of guessed URLs and kept going after the timeout. A new step reads the sitemaps robots.txt lists and stops at 30 seconds.",
    value: "302 s → 13 s",
  },
  {
    headline: "An 86/100 report said “No issues found”",
    body: "The scorer took points off without recording why. Every deduction now writes a finding, and a test runs real scorer output through the fix list.",
    value: "0 → 6 fixes",
  },
  {
    headline: "Nike was told it had no product images",
    body: "Shopify, Magento and Nike put images, prices and part numbers on each variant. Pylot read only the top level; variant fields now count.",
    value: "Variants",
  },
  {
    headline: "github.com scored 21 out of 100",
    body: "Sites with no product pages and no product data now stop with a plain message instead of an invented number.",
    value: "21 → none",
  },
];

const RELIABILITY = [
  "193 backend and 11 frontend tests, run by GitHub Actions on every push with ruff and ESLint.",
  "Crawler tests swap the network for a fake one, fed with the robots.txt, sitemap and JSON-LD patterns of real stores.",
  "Store addresses that point at private or internal networks are rejected before any request goes out.",
  "Scans are rate-limited in Redis, with a daily cap that keeps crawling costs bounded.",
  "Sentry reports errors, and the health check queries the database instead of returning a fixed “ok”.",
  "API, worker, frontend, Postgres and Redis run on Railway, defined in a config file in the repo.",
];

const NEXT = [
  "Read microdata as well as JSON-LD, so stores that use it, including many BigCommerce shops, score fairly.",
  "Rate-limit by each visitor’s real IP. Behind Railway’s proxy, visitors currently share a handful of addresses.",
  "Work out why a few stores show product data to a browser but not to the crawler.",
];

const DIAGRAM = JSON.stringify({
  layout: "lanes",
  alt: "A store address goes to the FastAPI service and a Redis queue, and a Celery worker reads robots.txt, the sitemaps and ten product pages in Playwright.",
  curve: "curve",
  input: { label: "nike.com", icon: "ui:globe", meta: "store address" },
  core: { label: "FastAPI + Redis", icon: "logos:fastapi-icon" },
  lanes: [
    { label: "robots.txt", icon: "ui:file-text", meta: "crawler rules", done: true },
    { label: "Sitemaps", icon: "ui:layers", meta: "product URLs", done: true },
    { label: "Playwright", icon: "logos:playwright", meta: "10 pages", done: true },
  ],
});

export default function PylotCaseStudy() {
  return (
    <>
      <SiteNav home="/" />
      <main id="top">
        <section className="hero cs-hero" data-enter aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid">
              <div className="span-6">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load restarts the kit scripts */}
                <a className="back" href="/#pylot">
                  ← All work
                </a>
                <h1 id="hero-h">Pylot, a readiness score for AI shopping</h1>
                <p className="hero__lead">
                  Pylot checks whether AI shopping assistants like ChatGPT can read an online store&apos;s product data.
                  Enter a store, and a minute or two later you get a score out of 100 and a ranked list of fixes.
                </p>
                <dl className="cs-meta">
                  <dt>Role</dt>
                  <dd>Sole engineer: design, build, deploy</dd>
                  <dt>Year</dt>
                  <dd>2026</dd>
                  <dt>Stack</dt>
                  <dd>React, FastAPI, Celery, Playwright, PostgreSQL, Redis, Railway</dd>
                </dl>
                <div className="btn-row cs-actions">
                  <a className="btn btn--primary" href="https://pylot.run">
                    Open pylot.run
                    <Arrow />
                  </a>
                </div>
              </div>
              <Shot image={REPORT} className="span-6 start-7" sizes="(max-width: 1023px) 100vw, 620px" priority />
            </div>
          </div>
        </section>

        <section className="section" id="problem" aria-labelledby="problem-h">
          <div className="wrap">
            <div className="grid grid--top">
              <h2 className="span-6" id="problem-h">
                Shoppers ask AI what to buy, but stores can&apos;t see what it reads
              </h2>
              <div className="span-6 start-7 prose">
                <p className="t-lead">
                  An assistant can only recommend a product if it can read its name, price, stock, images and
                  description. Even large stores leave gaps in that data they don&apos;t know about.
                </p>
                <p className="muted">
                  Pylot reads a store&apos;s robots.txt and sitemap, loads up to 10 product pages in a real browser the
                  way an AI crawler would, and scores four areas: product markup, filled-in fields, content and crawler
                  access.
                </p>
              </div>
            </div>
            <div className="grid shots2">
              <Shot image={LANDING} className="span-6" sizes="(max-width: 1023px) 100vw, 620px" />
              <Shot image={ISSUES} className="span-6" sizes="(max-width: 1023px) 100vw, 620px" />
            </div>
          </div>
        </section>

        <section className="section" id="fixes" aria-labelledby="fixes-h">
          <div className="wrap">
            <div className="grid grid--top">
              <h2 className="span-6" id="fixes-h">
                Every lost point becomes a fix
              </h2>
              <div className="span-6 start-7">
                <p className="t-lead muted">
                  The report ranks each issue by the points it costs, says how many sampled products it affects and
                  shows the exact markup to add. The fix list is rebuilt from stored results, so better wording reaches
                  old reports without a rescan.
                </p>
              </div>
            </div>
            <div className="ui app fill" role="img" aria-label="Pylot's six issues for nike.com, the first open with its JSON-LD fix">
              <div className="app__pane app__pane--list">
                <div className="iss__bar">
                  <span>All issues</span>
                  <span>6 issues · sorted by impact</span>
                </div>
                <ul className="iss">
                  {ISSUE_LIST.map((i, n) => (
                    <li key={i.title} className={n === 0 ? "is-on" : undefined}>
                      <span className="n">{String(n + 1).padStart(2, "0")}</span>
                      <b>{i.title}</b>
                      <span className="pts">+{i.pts} pts</span>
                      <small>
                        <span className={`sev sev--${i.sev}`}>{i.label}</span> · {i.scope}
                      </small>
                    </li>
                  ))}
                </ul>
                <div className="iss__bar">
                  <span>Sub-scores</span>
                  <span>Methodology</span>
                </div>
                <ul className="iss subs">
                  {SUB_SCORES.map(([name, score]) => (
                    <li key={name}>
                      <b>{name}</b>
                      <span className="pts">{score}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="app__pane app__pane--open">
                <div className="open">
                  <div className="chips">
                    <span className="sev--crit">Critical</span>
                    <span>Schema</span>
                    <span>Completeness</span>
                  </div>
                  <h4>Add availability to product offers</h4>
                  <p>
                    9 of 10 sampled products affected. Agents that only recommend in-stock items filter out products
                    without availability data.
                  </p>
                  <pre className="code">
                    {"{\n  "}
                    <span className="k">&quot;@type&quot;</span>: <span className="s">&quot;Offer&quot;</span>
                    {",\n  "}
                    <span className="k">&quot;price&quot;</span>: <span className="s">&quot;120.00&quot;</span>
                    {",\n  "}
                    <span className="k">&quot;priceCurrency&quot;</span>: <span className="s">&quot;USD&quot;</span>
                    {",\n"}
                    <span className="add">
                      {"  "}
                      <span className="k">&quot;availability&quot;</span>:{" "}
                      <span className="s">&quot;https://schema.org/InStock&quot;</span>
                    </span>
                    {"}"}
                  </pre>
                  <p>
                    <b>Fix:</b> add <code>offers.availability</code> with a value like{" "}
                    <code>https://schema.org/InStock</code> to each Product JSON-LD block.
                  </p>
                  <div className="meta3">
                    <div><b>+2</b>points</div>
                    <div><b>Low</b>effort</div>
                    <div><b>2h</b>engineering</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="built" aria-labelledby="built-h">
          <div className="wrap grid grid--top">
            <div className="span-6 prose">
              <h2 id="built-h">A queue keeps slow crawls out of the request</h2>
              <p className="t-lead" style={{ marginTop: "var(--s-5)" }}>
                A crawl takes from ten seconds to a couple of minutes, too long to hold a web request open.
              </p>
              <p className="muted">
                The API saves the scan, puts a job on a Redis queue and answers straight away. A Celery worker crawls the
                store with Playwright, scores the pages and writes the report to Postgres, while the browser polls and
                shows each step.
              </p>
              <p className="muted">
                Scoring is a plain function over the parsed product data, kept apart from the crawler so it can be tested
                without a network.
              </p>
            </div>
            <div className="span-6 start-7">
              <div className="card">
                <div className="panel">
                  <div className="dg" data-diagram="">
                    <script type="application/json" dangerouslySetInnerHTML={{ __html: DIAGRAM }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="bugs" data-moment="lines-rise" aria-labelledby="bugs-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="bugs-h">
                Real stores found the bugs. <span className="muted">Tests keep them fixed.</span>
              </h2>
            </div>
            <ul className="rows lessons mo-lr__follow">
              {LESSONS.map((l) => (
                <li key={l.headline}>
                  <span className="rows__name">{l.headline}</span>
                  <p>{l.body}</p>
                  <span className="rows__value">{l.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="reliable" aria-labelledby="reliable-h">
          <div className="wrap grid grid--top">
            <div className="span-6">
              <h2 id="reliable-h">Keeping it reliable</h2>
              <ul className="ticks">
                {RELIABILITY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="span-6 start-7">
              <h3 className="sub-h">What&apos;s next</h3>
              <ul className="ticks ticks--next">
                {NEXT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: "var(--s-7)" }}>
                <a className="btn btn--primary" href="https://pylot.run">
                  Try it at pylot.run
                  <Arrow />
                </a>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load restarts the kit scripts */}
                <a className="btn btn--secondary" href="/#pylot">
                  All work
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home="/" />
    </>
  );
}
