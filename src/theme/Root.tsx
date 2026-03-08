import React, { type ReactNode, useEffect, useState, useCallback } from "react";
import { useLocation } from "@docusaurus/router";

/**
 * Docusaurus theme Root wrapper.
 * Renders on every page and injects:
 *   1. A scroll-progress bar fixed at the very top of the viewport
 *   2. A "scroll to top" floating button that fades in after scrolling
 */
export default function Root({ children }: { children: ReactNode }): ReactNode {
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const total = scrollHeight - clientHeight;
    const pct = total > 0 ? (scrollTop / total) * 100 : 0;
    setScrollPct(pct);
    setShowTop(scrollTop > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle class on <html> so CSS can hide the navbar border on the homepage
  useEffect(() => {
    document.documentElement.classList.toggle("is-homepage", isHome);
    return () => document.documentElement.classList.remove("is-homepage");
  }, [isHome]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Scroll progress track (background behind the bar) ── */}
      <div
        aria-hidden
        className="scroll-progress-track"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          zIndex: 9998,
          pointerEvents: "none",
          background: "rgba(26, 26, 28, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* ── Scroll progress bar ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollPct}%`,
          height: "3px",
          zIndex: 9999,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, #00543D 0%, #25c2a0 50%, #4fddbf 100%)",
          transition: "width 80ms linear",
          boxShadow: "0 0 8px rgba(37,194,160,0.5)",
        }}
      />

      {children}

      {/* ── Scroll-to-top button ── */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="scroll-to-top-btn"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9998,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1px solid rgba(237,237,237,0.6)",
          background: "rgba(0,84,61,0.9)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,84,61,0.35)",
          backdropFilter: "blur(8px)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          transition: "opacity 300ms ease, transform 300ms ease",
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        {/* Chevron-up icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l5-5 5 5" />
        </svg>
      </button>
    </>
  );
}
