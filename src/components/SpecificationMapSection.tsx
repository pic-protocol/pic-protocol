import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "@docusaurus/Link";
import { CURRENT_SPEC_RELEASE } from "../data/specification";

const getDocumentHref = (href: string) => href;

export const SpecificationMapSection = () => {
  const current = CURRENT_SPEC_RELEASE;
  const documents = current.documents ?? [];
  const mapRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const maxScrollLeft = map.scrollWidth - map.clientWidth;
    setCanScrollLeft(map.scrollLeft > 4);
    setCanScrollRight(map.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    updateScrollState();
    map.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(map);

    return () => {
      map.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [documents.length, updateScrollState]);

  const scrollMap = (direction: "left" | "right") => {
    const map = mapRef.current;
    if (!map) return;

    map.scrollBy({
      left: direction === "right" ? map.clientWidth * 0.86 : -map.clientWidth * 0.86,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="tw-scope"
      className="px-6 pt-16 md:pt-20 xl:px-24 dark:bg-[#1F1F21]"
    >
      <div className="mx-auto max-w-300">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-180">
            <span className="mono mb-3 block text-[10px] font-semibold uppercase tracking-normal text-[#00543D] dark:text-[#25c2a0]">
              {"// current_specification"}
            </span>
            <h2 className="font-[Clash_Grotesk]! m-0 text-[32px] font-medium leading-none tracking-normal text-black dark:text-white md:text-[44px]">
              PIC {current.label} as a navigable map.
            </h2>
            <p className="m-0 mt-4 max-w-168 text-[17px] font-light leading-8 text-black/58 dark:text-white/55">
              The homepage reads this from the same specification data used by
              the Specification page, so the map follows the latest release.
            </p>
          </div>

          <Link
            href="/specification"
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#00543D]/25 px-5 py-3 text-sm font-semibold text-[#00543D] no-underline transition hover:bg-[#00543D] hover:text-white dark:border-[#25c2a0]/40 dark:text-[#25c2a0] dark:hover:bg-[#25c2a0] dark:hover:text-[#05231b]"
          >
            Open Specification
          </Link>
        </div>

        <div className="spec-map-stage mt-10 md:mt-12">
          <div ref={mapRef} className="spec-map-grid">
            {documents.map((document, index) => (
              <a
                key={document.id}
                className="spec-map-node no-underline"
                href={getDocumentHref(document.html)}
                target={document.html.startsWith("/") ? undefined : "_blank"}
                rel={
                  document.html.startsWith("/")
                    ? undefined
                    : "noopener noreferrer"
                }
                style={{ "--node-index": index } as CSSProperties}
                aria-label={`Open ${document.title}`}
              >
                <span className="spec-map-step">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="spec-map-role">{document.role}</span>
                <strong>{document.title}</strong>
                <span>{document.summary}</span>
                <span className="spec-map-link">Open document -&gt;</span>
              </a>
            ))}
          </div>

          <div className="spec-map-overlay" aria-hidden={!canScrollLeft && !canScrollRight}>
            {canScrollLeft && (
              <button
                type="button"
                className="spec-map-arrow spec-map-arrow--left"
                onClick={() => scrollMap("left")}
                aria-label="Scroll specification map left"
              >
                <span aria-hidden="true">&lt;</span>
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                className="spec-map-arrow spec-map-arrow--right"
                onClick={() => scrollMap("right")}
                aria-label="Scroll specification map right"
              >
                <span aria-hidden="true">&gt;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
