import { useCallback, useEffect, useRef, useState } from "react";
import picxArticlesData from "../data/picxArticles.json";

export type PicxArticle = {
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
  sourceLabel?: string;
};

export const PICX_ARTICLES = picxArticlesData as PicxArticle[];

const CONFUSED_DEPUTY_ARTICLE: PicxArticle = {
  id: "hardy-compiler-to-aiagent",
  title: "From Hardy Compiler to Hardy AI Agent",
  url: "https://www.ngallo.it/blog/2026-07-25/fron-hardy-compiler-to-hardy-aiagent/",
  date: "2026-07-25",
  author: "Nicola Gallo",
  summary:
    "Connects compiler-style execution boundaries to AI agents, showing why confused-deputy failures appear when agents act through ambient credentials and why authority continuity matters.",
  bannerKicker: "Agent Security",
  bannerTitle: "Confused deputy to agent authority",
  bannerFlow: ["compiler", "agent", "authority"],
  tags: ["AI agents", "Confused deputy"],
  variant: "agent-security",
  sourceLabel: "Confused deputy",
};

const FORMAL_MODEL_ARTICLE: PicxArticle = {
  id: "proof-of-continuity-formal-model",
  title:
    "Proof-of-Continuity: A Temporal Model for Authority Propagation in Distributed Systems and AI Agents",
  url: "https://arxiv.org/abs/2607.08906",
  date: "2026-07-09",
  author: "Nicola Gallo",
  summary:
    "Formalizes Proof-of-Continuity as a temporal authority-propagation model for distributed systems and AI agents, complementing possession with causal relationship and non-expansion.",
  bannerKicker: "arXiv / Formal",
  bannerTitle: "Temporal proof of continuity",
  bannerFlow: ["por", "poc", "safety"],
  tags: ["Formal model", "arXiv"],
  variant: "formal-model",
  sourceLabel: "Formal Model",
};

export const HOME_ARTICLES: PicxArticle[] = [
  FORMAL_MODEL_ARTICLE,
  CONFUSED_DEPUTY_ARTICLE,
  ...PICX_ARTICLES,
];

type PicxArticleRailProps = {
  articles?: PicxArticle[];
  ariaLabel?: string;
};

export const PicxArticleRail = ({
  articles = PICX_ARTICLES,
  ariaLabel = "PIC-X article series",
}: PicxArticleRailProps) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(rail);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [articles.length, updateScrollState]);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left:
        direction === "right"
          ? rail.clientWidth * 0.86
          : -rail.clientWidth * 0.86,
      behavior: "smooth",
    });
  };

  return (
    <div className="picx-article-rail-wrap">
      <div
        ref={railRef}
        className="picx-article-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-1 md:gap-6"
        aria-label={ariaLabel}
      >
        {articles.map((article) => (
          <a
            key={article.id}
            className="picx-article-card group flex min-h-[548px] w-[78vw] max-w-[360px] shrink-0 snap-start flex-col rounded-xl border border-black/10 bg-white p-3 text-black no-underline shadow-[0_20px_60px_rgba(5,35,27,0.08)] ring-1 ring-transparent transition hover:border-[#25c2a0]/55 hover:text-black hover:ring-[#25c2a0]/35 dark:border-white/10 dark:bg-[#171d1c] dark:text-white dark:shadow-[0_22px_70px_rgba(0,0,0,0.24)] dark:hover:text-white sm:w-[380px] sm:max-w-[390px]"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read ${article.title}`}
          >
            <div
              className={`picx-article-banner picx-article-banner--${article.variant} rounded-lg`}
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono rounded-lg border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                    {article.bannerKicker}
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {article.sourceLabel ?? "PIC-X"}
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
                        className="mono flex min-h-8 min-w-0 items-center justify-center rounded-lg border border-white/16 bg-black/20 px-2 py-2 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.06em] text-white/70"
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
                      className="rounded-lg border border-black/8 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/52 dark:border-white/8 dark:bg-white/[0.04] dark:text-white/50"
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

      <div
        className="picx-article-rail-overlay"
        aria-hidden={!canScrollLeft && !canScrollRight}
      >
        {canScrollLeft && (
          <button
            type="button"
            className="picx-article-arrow picx-article-arrow--left"
            onClick={() => scrollRail("left")}
            aria-label="Scroll articles left"
          >
            <span aria-hidden="true">&lt;</span>
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            className="picx-article-arrow picx-article-arrow--right"
            onClick={() => scrollRail("right")}
            aria-label="Scroll articles right"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        )}
      </div>
    </div>
  );
};
