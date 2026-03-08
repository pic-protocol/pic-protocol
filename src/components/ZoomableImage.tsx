import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@docusaurus/router";

interface ZoomableImageProps {
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  loading?: "lazy" | "eager";
}

/* ── Figure counter: resets on each route change ── */
let figureCounter = 0;
let lastPathname = "";

function useFigureNumber(): number {
  const { pathname } = useLocation();
  const numberRef = useRef<number>(0);

  if (pathname !== lastPathname) {
    figureCounter = 0;
    lastPathname = pathname;
  }

  // Assign number only once per mount
  if (numberRef.current === 0) {
    figureCounter += 1;
    numberRef.current = figureCounter;
  }

  return numberRef.current;
}

/**
 * A doc image wrapped in <figure> with:
 *  – pointer cursor & subtle glow on hover
 *  – click-to-zoom lightbox overlay with portal
 *  – auto-numbered figcaption with title from alt text
 *  – figure number visible in both page and lightbox
 */
export default function ZoomableImage({
  src,
  alt,
  title,
  ...rest
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const figNum = useFigureNumber();

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeLightbox]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const caption = alt || title;
  const figLabel = `Fig. ${figNum}`;
  const fullCaption = caption ? `${figLabel} — ${caption}` : figLabel;

  return (
    <>
      <figure className="zoomable-figure">
        <div className="zoomable-image-wrapper" onClick={openLightbox}>
          <img src={src} alt={alt} title={title} loading="lazy" {...rest} />
          <div className="zoom-hint" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>
        <figcaption className="zoomable-caption">
          <span className="fig-number">{figLabel}</span>
          {caption && <> — {caption}</>}
        </figcaption>
      </figure>

      {/* Lightbox overlay — portalled to <body> for correct z-index stacking */}
      {open &&
        createPortal(
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={src}
              alt={alt}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="lightbox-caption">
              <span className="fig-number">{figLabel}</span>
              {caption && <> — {caption}</>}
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
