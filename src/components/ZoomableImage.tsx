import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ZoomableImageProps {
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  loading?: "lazy" | "eager";
}

/**
 * A doc image wrapped in <figure> with:
 *  – pointer cursor & subtle glow on hover
 *  – click-to-zoom lightbox overlay (portalled to body)
 *  – auto-numbered figcaption derived from DOM position
 *  – figure number visible in both page and lightbox
 */
export default function ZoomableImage({
  src,
  alt,
  title,
  ...rest
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [figNum, setFigNum] = useState(0);
  const figureRef = useRef<HTMLElement>(null);

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  // Compute figure number from DOM position (stable across refreshes)
  useEffect(() => {
    if (!figureRef.current) return;
    const allFigures = document.querySelectorAll(".zoomable-figure");
    const index = Array.from(allFigures).indexOf(figureRef.current);
    setFigNum(index + 1);
  }, []);

  // Native click listener on the wrapper
  useEffect(() => {
    const wrapper = figureRef.current?.querySelector(
      ".zoomable-image-wrapper"
    ) as HTMLElement | null;
    if (!wrapper) return;
    const handler = () => setOpen(true);
    wrapper.addEventListener("click", handler);
    return () => wrapper.removeEventListener("click", handler);
  }, []);

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
  const figLabel = figNum > 0 ? `Fig. ${figNum}` : "";

  return (
    <>
      <figure ref={figureRef} className="zoomable-figure">
        <div
          className="zoomable-image-wrapper"
          role="button"
          tabIndex={0}
          aria-label={`Zoom: ${caption || "image"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openLightbox();
          }}
        >
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
          {figLabel && <span className="fig-number">{figLabel}</span>}
          {figLabel && caption && " — "}
          {caption}
        </figcaption>
      </figure>

      {/* Lightbox overlay — portalled to <body> for correct z-index stacking */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
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
              {figLabel && <span className="fig-number">{figLabel}</span>}
              {figLabel && caption && " — "}
              {caption}
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
