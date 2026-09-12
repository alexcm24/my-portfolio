import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import ContactFooter from "@/components/ContactFooter";
import ProjectMedia from "@/components/ProjectMedia";
import { SITE } from "@/lib/site";

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

const FLOW = [
  { name: "Browser", detail: "React app" },
  { name: "API", detail: "FastAPI" },
  { name: "Queue", detail: "Redis" },
  { name: "Worker", detail: "Celery + Playwright" },
  { name: "Database", detail: "PostgreSQL" },
];

// Each one was found by scanning a real store and checking the result against
// the store's actual pages. Keep these to things that happened.
const LESSONS = [
  {
    headline: "Blocked AI crawlers were never detected.",
    body: "The robots.txt check handed its arguments to the parser in reverse order, so a store that blocks GPTBot was scored as open to it. I fixed the call and added a test for each crawler. amazon.com is now correctly flagged for blocking GPTBot.",
  },
  {
    headline: "302 seconds, then 13.",
    body: "nike.com and amazon.com ran into the five-minute timeout because the sitemap library probed dozens of guessed URLs with retries, and kept going after the timeout fired. I replaced it with a step that reads the sitemaps robots.txt lists, prefers product sitemaps, and gives up after 30 seconds. Nike now finishes in 13 seconds, and Amazon gets a clear answer in 35.",
  },
  {
    headline: "An 86/100 report said “No issues found.”",
    body: "The scorer took points off for missing fields and short descriptions without recording why, so the fix list came back empty. Every deduction now produces a finding, and a test runs real scorer output through the fix list so the two can’t drift apart.",
  },
  {
    headline: "Nike was told it had no product images.",
    body: "Shopify, Magento and Nike put price, images and part numbers on each product variant rather than on the product itself. Pylot only read the top level, so it reported problems that weren’t there. Fields published on variants now count.",
  },
  {
    headline: "github.com scored 21 out of 100.",
    body: "Sites that aren’t stores still got a score. Now, when there’s no sign of product pages and no product data, the scan stops with a plain message instead of inventing a number.",
  },
];

const RELIABILITY = [
  "193 backend and 11 frontend tests, run by GitHub Actions on every push along with ruff and ESLint.",
  "Crawler tests swap the network for a fake one and feed in the robots.txt, sitemap and JSON-LD patterns found on the stores above.",
  "Store addresses that point at private or internal networks are rejected before any request goes out.",
  "Scans are rate-limited in Redis, with a daily cap that keeps crawling costs bounded.",
  "Sentry reports errors, and the health check queries the database instead of returning a fixed “ok”.",
  "The API, worker, frontend, Postgres and Redis run on Railway, defined in a config file in the repo.",
];

const NEXT = [
  "Read microdata as well as JSON-LD, so stores that use it, including many BigCommerce shops, score fairly.",
  "Rate-limit by each visitor’s real IP address. Behind Railway’s proxy, visitors currently share a handful of addresses.",
  "Work out why a few stores show their product data to a browser but not to the crawler.",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16 border-t border-line pt-10 sm:mt-20">
      <h2 className="font-serif text-3xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-5 max-w-[62ch] space-y-4 leading-relaxed">{children}</div>;
}

function Figure({
  src,
  alt,
  caption,
  sizes,
  aspect = "aspect-[8/5]",
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <ProjectMedia src={src} alt={alt} title={alt} aspect={aspect} sizes={sizes} priority={priority} />
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

function Meta({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] text-muted">{term}</dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}

export default function PylotCaseStudy() {
  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-content px-6 pb-20 pt-12 sm:pt-16">
          <Link href="/#work" className="font-mono text-xs text-muted transition-colors hover:text-fg">
            ← All work
          </Link>

          <header className="mt-8">
            <h1 className="font-serif text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">Pylot</h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              Pylot checks whether AI shopping assistants like ChatGPT can read an online store’s product data.
              Enter a store, and a minute or two later you get a score out of 100 and a ranked list of fixes.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <Meta term="Role">Solo project</Meta>
              <Meta term="Year">2026</Meta>
              <Meta term="Stack">React, FastAPI, Celery, Playwright, PostgreSQL, Redis, Railway</Meta>
              <Meta term="Live">
                <a href="https://pylot.run" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
                  pylot.run ↗
                </a>
              </Meta>
            </dl>
          </header>

          <div className="mt-12">
            <Figure
              src="/media/pylot/report.jpg"
              alt="Pylot report for nike.com with a score of 73 out of 100 and four sub-scores"
              caption="A live report for nike.com: 73 out of 100, with sub-scores for each area."
              sizes="(max-width: 1024px) 100vw, 976px"
              aspect="aspect-[2000/1085]"
              priority
            />
          </div>

          <Section title="The problem">
            <Prose>
              <p>
                Shoppers are starting to ask AI assistants what to buy. An assistant can only recommend a product if it
                can read that product’s data: name, price, stock, images and description. Most of that lives in
                structured data on the product page, and even large stores leave gaps they don’t know about.
              </p>
            </Prose>
          </Section>

          <Section title="What it does">
            <Prose>
              <p>
                You enter a store’s address. Pylot reads its robots.txt and sitemap, picks up to 10 product pages, and
                loads them in a real browser the way an AI crawler would. It scores what it finds in four areas: whether
                the product markup is valid, which fields are filled in, how rich the content is, and whether AI
                crawlers are allowed in.
              </p>
              <p>The report ranks every issue by how many points it costs and says how to fix it.</p>
            </Prose>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Figure
                src="/media/pylot/landing.jpg"
                alt="Pylot home page with nike.com entered in the scan box"
                caption="Starting a scan takes one field and no account."
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <Figure
                src="/media/pylot/issues.jpg"
                alt="Pylot's list of six issues for nike.com, each with severity, points and how to fix it"
                caption="Each issue shows how many sampled products it affects and how to fix it."
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </Section>

          <Section title="How it’s built">
            <ol
              aria-label="How a scan moves through the system"
              className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-stretch sm:gap-0"
            >
              {FLOW.map((node, i) => (
                <li key={node.name} className="flex flex-col sm:flex-1 sm:flex-row sm:items-center">
                  <div
                    className={`flex-1 rounded-md border px-4 py-3 ${node.name === "Worker" ? "border-accent" : "border-line"}`}
                  >
                    <p className="text-sm font-semibold">{node.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">{node.detail}</p>
                  </div>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden="true" className="self-center px-2 py-1 font-mono text-sm text-muted sm:py-0">
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <Prose>
              <p>
                A crawl takes anywhere from ten seconds to a couple of minutes, which is too long to hold a web request
                open. The API saves the scan, puts a job on a Redis queue and answers straight away. A Celery worker
                picks up the job, crawls the store with Playwright, scores the pages and writes the report to Postgres.
                The browser polls the API and shows each step as it happens.
              </p>
              <p>
                Scoring is a plain function over the parsed product data, kept apart from the crawler so it can be tested
                without a network. The fix list is rebuilt from stored results each time a report is viewed, so wording
                changes reach old reports without a rescan.
              </p>
            </Prose>
          </Section>

          <Section title="What real stores taught me">
            <Prose>
              <p>
                The test suite was green, but scanning real stores and checking every result against the stores’ actual
                pages turned up bugs the tests hadn’t covered. Each fix started with a failing test built from what the
                real store did.
              </p>
            </Prose>
            <ul className="mt-8">
              {LESSONS.map((l) => (
                <li
                  key={l.headline}
                  className="grid gap-3 border-t border-line py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
                >
                  <p className="font-serif text-2xl font-semibold leading-snug tracking-tight">{l.headline}</p>
                  <p className="leading-relaxed text-muted">{l.body}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Keeping it reliable">
            <ul className="mt-6 grid max-w-[62ch] gap-3 md:max-w-none md:grid-cols-2 md:gap-x-10">
              {RELIABILITY.map((item) => (
                <li key={item} className="border-l-2 border-line pl-4 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What’s next">
            <ul className="mt-6 max-w-[62ch] list-disc space-y-3 pl-5 leading-relaxed marker:text-muted">
              {NEXT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <div className="mt-16 flex flex-wrap gap-6 border-t border-line pt-8 font-mono text-sm">
            <a href="https://pylot.run" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80">
              Try it at pylot.run ↗
            </a>
            <Link href="/#work" className="text-muted transition-colors hover:text-fg">
              ← All work
            </Link>
          </div>
        </article>
      </main>
      <ContactFooter />
    </>
  );
}
