import React, { useState, useCallback, useEffect } from "react";

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
 *  – click-to-zoom lightbox overlay
 *  – auto-numbered figcaption (via CSS counter) with title from alt text
 */
export default function ZoomableImage({
  src,
  alt,
  title,
  ...rest
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

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
        {caption && <figcaption className="zoomable-caption">{caption}</figcaption>}
      </figure>

      {/* Lightbox overlay */}
      {open && (
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
          {caption && <p className="lightbox-caption">{caption}</p>}
        </div>
      )}
    </>
  );
}
