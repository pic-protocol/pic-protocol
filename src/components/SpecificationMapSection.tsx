import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { CURRENT_SPEC_RELEASE } from "../data/specification";

const getDocumentHref = (href: string) => href;

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 840;
const HUB = { x: 600, y: 420 };
const NODE_WIDTH = 268;
const NODE_HEIGHT = 236;
const NODE_POSITIONS = [
  { x: 52, y: 128 },
  { x: 466, y: 42 },
  { x: 880, y: 128 },
  { x: 880, y: 476 },
  { x: 466, y: 562 },
  { x: 52, y: 476 },
];

const getNodePosition = (index: number) =>
  NODE_POSITIONS[index % NODE_POSITIONS.length];

const getLinePath = (index: number) => {
  const position = getNodePosition(index);
  const nodeCenter = {
    x: position.x + NODE_WIDTH / 2,
    y: position.y + NODE_HEIGHT / 2,
  };
  const controlX = (HUB.x + nodeCenter.x) / 2;
  const controlY =
    index < 3
      ? Math.min(HUB.y, nodeCenter.y) - 76
      : Math.max(HUB.y, nodeCenter.y) + 76;

  return `M ${HUB.x} ${HUB.y} Q ${controlX} ${controlY} ${nodeCenter.x} ${nodeCenter.y}`;
};

export const SpecificationMapSection = () => {
  const current = CURRENT_SPEC_RELEASE;
  const documents = current.documents ?? [];
  const mapRef = useRef<HTMLDivElement>(null);
  const didCenterMapRef = useRef(false);
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

    if (!didCenterMapRef.current) {
      map.scrollLeft = Math.max(0, (map.scrollWidth - map.clientWidth) / 2);
      didCenterMapRef.current = true;
    }

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
        <div className="flex flex-col gap-6">
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
        </div>

        <div className="spec-map-stage mt-10 md:mt-12">
          <div ref={mapRef} className="spec-map-scroll">
            <div className="spec-map-canvas">
              <svg
                className="spec-map-lines"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                aria-hidden="true"
              >
                {documents.map((document, index) => (
                  <path
                    key={document.id}
                    className="spec-map-line"
                    d={getLinePath(index)}
                    style={{ "--node-index": index } as CSSProperties}
                  />
                ))}
              </svg>

              <div className="spec-map-hub">
                <span className="mono">current</span>
                <strong>PIC {current.label}</strong>
                {current.profileId && <small>{current.profileId}</small>}
              </div>

              {documents.map((document, index) => {
                const position = getNodePosition(index);

                return (
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
                    style={
                      {
                        "--node-index": index,
                        "--node-left": `${position.x}px`,
                        "--node-top": `${position.y}px`,
                      } as CSSProperties
                    }
                    aria-label={`Open ${document.title}`}
                  >
                    <span className="spec-map-step">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="spec-map-role">{document.role}</span>
                    <strong>{document.title}</strong>
                    <span className="spec-map-summary">
                      {document.summary}
                    </span>
                    <span className="spec-map-link">Open document -&gt;</span>
                  </a>
                );
              })}
            </div>
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
