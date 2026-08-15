import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import picxArticlesData from "../data/picxArticles.json";

const GITHUB_URL = "https://github.com/pic-protocol/pic-x";
const WEBSITE_REPO_URL = "https://github.com/pic-protocol/pic-protocol.github.io";

type PicxArticle = {
  id: string;
  title: string;
  url: string;
  date: string;
  author: string;
  summary: string;
  bannerKicker: string;
  bannerTitle: string;
  bannerFlow: string[];
  tags: string[];
  variant: string;
};

const PICX_ARTICLES = picxArticlesData as PicxArticle[];

const CAPABILITIES = [
  {
    title: "Authority bootstrap",
    text: "Validate an incoming authority source, derive the first PIC Context of Authority, and issue the PIC token that starts a protected lineage.",
  },
  {
    title: "Non-expanding hops",
    text: "Accept only workload transitions that prove relationship, preserve lineage, and never add authority beyond the predecessor checkpoint.",
  },
  {
    title: "Trust-plane settlement",
    text: "Bring realm keys, discovery, PoR evidence, policy, revocation, and conformance checks into one exchange layer that can settle the next checkpoint.",
  },
];

export default function PicXPage(): ReactNode {
  return (
    <Layout
      title="PIC-X"
      description="PIC-X is the open-source Provenance Identity Continuity Exchange project."
    >
      <main id="tw-scope" className="bg-white text-black dark:bg-[#1A1A1C] dark:text-white">
        <section className="techy-grid techy-grid-full relative overflow-hidden border-b border-black/10 bg-[#f7fbfa] px-5 py-12 dark:border-[#25c2a0]/10 dark:bg-[#0d1211] sm:px-6 md:py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#25c2a0]/60 to-transparent" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <p className="tech-badge mb-6">Authority continuity exchange</p>
              <Heading
                as="h1"
                className="font-[Clash_Grotesk]! m-0 text-[44px] font-semibold leading-[0.95] tracking-normal text-black dark:text-white md:text-[68px]"
              >
                PIC-X
              </Heading>
              <p className="mt-5 max-w-xl text-lg font-light leading-8 text-black/65 dark:text-white/70 md:text-xl">
                The open-source trust-plane component that turns token
                possession into verifiable authority continuity across services,
                workloads, and AI agents.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-[#25c2a0] px-5 py-3 text-sm font-semibold text-[#05231b] no-underline transition hover:bg-[#32d8b4]"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-black no-underline transition hover:border-[#25c2a0] hover:text-[#007d5b] dark:border-white/20 dark:text-white dark:hover:border-[#25c2a0] dark:hover:text-[#25c2a0]"
                  href="/pic-in-action.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the Demo
                </a>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-2">
                {["origin-bound", "lineage-aware", "non-expanding"].map((label) => (
                  <span
                    key={label}
                    className="mono rounded-xl border border-black/8 bg-white/70 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-black/45 dark:border-white/8 dark:bg-white/5 dark:text-white/45"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="picx-hero-card relative overflow-hidden rounded-[22px] border border-black/10 bg-white/70 p-5 shadow-[0_24px_80px_rgba(5,35,27,0.08)] dark:border-[#25c2a0]/14 dark:bg-[#111917]/72 dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:rounded-[28px] sm:p-7">
              <div className="relative z-10 flex justify-end">
                <span className="picx-profile-chip mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                  profile 0.2
                </span>
              </div>

              <div className="picx-logo-stage relative z-10 mx-auto mt-5 flex min-h-[300px] items-center justify-center py-8 sm:mt-6 sm:min-h-[400px] sm:py-10 lg:min-h-[480px]">
                <img
                  src="/img/pic-x/pic-x.png"
                  alt="PIC-X logo"
                  className="h-auto max-h-[250px] w-auto max-w-[78%] object-contain drop-shadow-[0_18px_50px_rgba(37,194,160,0.18)] sm:max-h-[330px] lg:max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mono mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#25c2a0]">
                  Why it matters
                </p>
                <Heading
                  as="h2"
                  className="font-[Clash_Grotesk]! m-0 text-[32px] font-semibold leading-tight tracking-normal md:text-[44px]"
                >
                  Security breaks when authority loses its lineage.
                </Heading>
              </div>
              <div className="space-y-4 text-[17px] leading-8 text-black/65 dark:text-white/65">
                <p>
                  <strong className="font-semibold text-black dark:text-white">
                    Tokens prove possession.
                  </strong>{" "}
                  PIC-X asks the harder question: can this workload prove the
                  authority lineage behind the action?
                </p>
                <p>
                  <strong className="font-semibold text-black dark:text-white">
                    PIC-X bridges existing authority into PIC
                  </strong>
                  , derives the initial context, and issues signed artifacts
                  that let workloads continue execution{" "}
                  <strong className="font-semibold text-black dark:text-white">
                    without expanding authority
                  </strong>
                  . It is the open-source path for making PIC testable in real
                  infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="techy-grid techy-grid-full overflow-hidden bg-[#f3f8f7] py-16 dark:bg-[#0d1211] md:py-24">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <div>
                <p className="mono mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#25c2a0]">
                  Learn about PIC-X
                </p>
                <Heading
                  as="h2"
                  className="font-[Clash_Grotesk]! m-0 text-[32px] font-semibold leading-tight tracking-normal md:text-[44px]"
                >
                  Follow the design series as the exchange layer takes shape.
                </Heading>
              </div>
              <p className="m-0 max-w-2xl text-[17px] leading-8 text-black/65 dark:text-white/65 lg:justify-self-end">
                <strong className="font-semibold text-black dark:text-white">
                  Architecture notes, protocol artifacts, discovery metadata,
                  and end-to-end exchange flows
                </strong>{" "}
                for engineers who want to understand, run, or contribute to
                PIC-X.
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-12 max-w-7xl px-5 sm:px-6 md:mt-16">
            <div
              className="picx-article-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-1 md:gap-6"
              aria-label="PIC-X article series"
            >
              {PICX_ARTICLES.map((article) => (
                <a
                  key={article.id}
                  className="picx-article-card group flex min-h-[548px] w-[78vw] max-w-[360px] shrink-0 snap-start flex-col rounded-lg border border-black/10 bg-white p-3 text-black no-underline shadow-[0_20px_60px_rgba(5,35,27,0.08)] ring-1 ring-transparent transition hover:border-[#25c2a0]/55 hover:text-black hover:ring-[#25c2a0]/35 dark:border-white/10 dark:bg-[#171d1c] dark:text-white dark:shadow-[0_22px_70px_rgba(0,0,0,0.24)] dark:hover:text-white sm:w-[380px] sm:max-w-[390px]"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${article.title}`}
                >
                  <div
                    className={`picx-article-banner picx-article-banner--${article.variant} rounded-md`}
                  >
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <span className="mono rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                          {article.bannerKicker}
                        </span>
                        <span className="mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                          PIC-X
                        </span>
                      </div>

                      <div>
                        <p className="font-[Clash_Grotesk]! m-0 max-w-[15rem] text-3xl font-semibold leading-none tracking-normal text-white">
                          {article.bannerTitle}
                        </p>
                        <div className="mt-5 grid grid-cols-3 gap-2">
                          {article.bannerFlow.map((item) => (
                            <span
                              key={item}
                              className="mono min-w-0 rounded-md border border-white/16 bg-black/20 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.06em] text-white/70"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#007d5b] dark:text-[#25c2a0]">
                        {article.date}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-black/25 dark:bg-white/25" />
                      <span className="text-xs text-black/45 dark:text-white/45">
                        {article.author}
                      </span>
                    </div>

                    <h3 className="font-[Clash_Grotesk]! m-0 mt-4 text-[24px] font-semibold leading-tight tracking-normal text-black dark:text-white">
                      {article.title}
                    </h3>
                    <p className="m-0 mt-4 text-[15px] leading-7 text-black/62 dark:text-white/58">
                      {article.summary}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/52 dark:border-white/8 dark:bg-white/[0.04] dark:text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-sm font-semibold text-[#007d5b] transition group-hover:translate-x-1 dark:text-[#25c2a0]">
                        Read article
                        <span className="ml-2" aria-hidden="true">
                          -&gt;
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-3 max-w-7xl px-6">
            <div className="flex flex-col gap-4 rounded-lg border border-[#25c2a0]/20 bg-white/75 p-5 dark:bg-[#121817]/78 sm:flex-row sm:items-center sm:justify-between">
              <p className="m-0 max-w-3xl text-[15px] leading-7 text-black/62 dark:text-white/58">
                Writing about PIC or PIC-X, or building on it? Add your article
                to{" "}
                <code className="rounded border border-black/10 bg-black/[0.04] px-1.5 py-0.5 text-[13px] dark:border-white/10 dark:bg-white/[0.06]">
                  src/data/picxArticles.json
                </code>{" "}
                and open a pull request so the series can grow with the
                ecosystem.
              </p>
              <a
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#25c2a0]/40 px-5 py-3 text-sm font-semibold text-[#007d5b] no-underline transition hover:bg-[#25c2a0] hover:text-[#05231b] dark:text-[#25c2a0]"
                href={`${WEBSITE_REPO_URL}/pulls`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open a PR
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] px-6 py-14 dark:bg-[#1F1F21] md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3">
              {CAPABILITIES.map((item) => (
                <article
                  key={item.title}
                  className="glow-card rounded-2xl bg-white p-6 dark:bg-[#212123]"
                >
                  <h3 className="font-[Clash_Grotesk]! m-0 mb-4 text-2xl font-medium tracking-normal text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[15px] leading-7 text-black/60 dark:text-white/55">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="mono mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#25c2a0]">
                Open source
              </p>
              <Heading
                as="h2"
                className="font-[Clash_Grotesk]! m-0 text-[32px] font-semibold leading-tight tracking-normal md:text-[44px]"
              >
                Built in public for experimentation and review.
              </Heading>
            </div>
            <div className="text-[17px] leading-8 text-black/65 dark:text-white/65">
              <p>
                PIC-X is developed as an open-source project so implementers can
                inspect the exchange flow, test PIC authority continuity, and use
                it as a foundation for integrations, SDKs, runtimes, gateways, or
                other PIC-compatible infrastructure.
              </p>
              <a
                className="mt-4 inline-flex items-center justify-center rounded-full border border-[#25c2a0]/40 px-5 py-3 text-sm font-semibold text-[#007d5b] no-underline transition hover:bg-[#25c2a0] hover:text-[#05231b] dark:text-[#25c2a0]"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/pic-protocol/pic-x
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
