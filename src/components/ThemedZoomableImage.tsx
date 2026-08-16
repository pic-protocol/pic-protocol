import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ThemedImage from "@theme/ThemedImage";

type ThemedZoomableImageProps = {
  alt: string;
  title?: string;
  sources: {
    light: string;
    dark: string;
  };
  style?: React.CSSProperties;
};

export default function ThemedZoomableImage({
  alt,
  title,
  sources,
  style,
}: ThemedZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [figNum, setFigNum] = useState(0);
  const figureRef = useRef<HTMLElement>(null);

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!figureRef.current) return;
    const allFigures = document.querySelectorAll(".zoomable-figure");
    const index = Array.from(allFigures).indexOf(figureRef.current);
    setFigNum(index + 1);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeLightbox]);

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
      <figure ref={figureRef} className="zoomable-figure" style={style}>
        <div
          className="zoomable-image-wrapper"
          style={{ width: "100%" }}
          role="button"
          tabIndex={0}
          aria-label={`Zoom: ${caption || "image"}`}
          onClick={openLightbox}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openLightbox();
          }}
        >
          <ThemedImage
            alt={alt}
            sources={sources}
            style={{ display: "block", width: "100%" }}
          />
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
          {figLabel && caption && " - "}
          {caption}
        </figcaption>
      </figure>

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
              x
            </button>
            <ThemedImage
              alt={alt}
              sources={sources}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="lightbox-caption">
              {figLabel && <span className="fig-number">{figLabel}</span>}
              {figLabel && caption && " - "}
              {caption}
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
