import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * LlmContextPack — fetches the PIC primary sources straight from the
 * repositories (raw.githubusercontent.com, always current `main`),
 * concatenates them in order into a single text, and offers one-click
 * copy / download. No local copy of the sources is ever maintained.
 */

interface SourceFile {
  /** Short path shown in the UI and in the pack separators. */
  path: string;
  /** Raw URL fetched at page load. */
  url: string;
}

const SOURCES: SourceFile[] = [
  {
    path: "pic-spec/draft/0.2/pic-spec.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-spec.md",
  },
  {
    path: "pic-spec/draft/0.2/pic-legal.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-legal.md",
  },
  {
    path: "pic-spec/draft/0.2/pic-prover-verifier-spec.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-prover-verifier-spec.md",
  },
  {
    path: "pic-spec/draft/0.2/pic-revocation-spec.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-revocation-spec.md",
  },
  {
    path: "pic-spec/draft/0.2/pic-lineage-guardrail-spec.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-lineage-guardrail-spec.md",
  },
  {
    path: "pic-spec/draft/0.2/pic-architecture-deployment-spec.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/pic-architecture-deployment-spec.md",
  },
  {
    path: "pic-model/draft/0.1/pic-model-math/pic-model.md",
    url: "https://raw.githubusercontent.com/ngallo/pic-model/refs/heads/main/draft/0.1/pic-model-math/pic-model.md",
  },
  {
    path: "pic-spec/draft/0.2/ontology-for-llm/context-file.md",
    url: "https://raw.githubusercontent.com/pic-protocol/pic-spec/refs/heads/main/draft/0.2/ontology-for-llm/context-file.md",
  },
  {
    path: "pic-model/draft/0.1/pic-model-math/pic-lean/PICVerification.md",
    url: "https://raw.githubusercontent.com/ngallo/pic-model/refs/heads/main/draft/0.1/pic-model-math/pic-lean/PICVerification.md",
  },
];

type FileState =
  | { status: "loading" }
  | { status: "ok"; content: string }
  | { status: "error"; message: string };

const SEP = "=".repeat(72);

function buildPack(states: FileState[]): string {
  const parts: string[] = [];
  parts.push(
    [
      SEP,
      "PIC (Provenance Identity Continuity) — LLM Context Pack",
      `Assembled live from the primary repositories on ${new Date().toISOString()}.`,
      `Files: ${SOURCES.length}, in reading order. Each file starts after its`,
      "separator banner. Interpretation rules are in ontology-for-llm/context-file.md",
      "(included below): follow them before answering questions about PIC.",
      "-".repeat(72),
      "NOTICE — READ BEFORE USE",
      "The documents in this pack are published under the Creative Commons",
      'Attribution 4.0 International (CC BY 4.0) license and are provided "as',
      'is", without warranty of any kind; the governing legal terms are those',
      "in the included pic-legal.md. This pack is a comprehension aid, not a",
      "substitute for reading the primary sources: by using it, the user",
      "undertakes to read and study the sources themselves. LLM output",
      "produced from this material can be wrong or misleading; no",
      "responsibility or guarantee is accepted for any model's behavior or",
      "answers. The human user remains solely responsible for verifying and",
      "evaluating both these files and any LLM response, and for deciding",
      'what to accept or reject. "An LLM told me so" does not transfer that',
      "responsibility.",
      SEP,
    ].join("\n")
  );
  SOURCES.forEach((src, i) => {
    const st = states[i];
    const body = st.status === "ok" ? st.content : "";
    parts.push(
      [
        "",
        SEP,
        `FILE ${i + 1}/${SOURCES.length}: ${src.path}`,
        `SOURCE: ${src.url}`,
        SEP,
        "",
        body.trimEnd(),
      ].join("\n")
    );
  });
  return parts.join("\n") + "\n";
}

function formatKb(chars: number): string {
  return `${(chars / 1024).toFixed(0)} KB`;
}

export default function LlmContextPack(): React.ReactElement {
  const [states, setStates] = useState<FileState[]>(
    SOURCES.map(() => ({ status: "loading" }))
  );
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fetchOne = useCallback(async (index: number) => {
    setStates((prev) => {
      const next = [...prev];
      next[index] = { status: "loading" };
      return next;
    });
    try {
      const res = await fetch(SOURCES[index].url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setStates((prev) => {
        const next = [...prev];
        next[index] = { status: "ok", content: text };
        return next;
      });
    } catch (e) {
      setStates((prev) => {
        const next = [...prev];
        next[index] = {
          status: "error",
          message: e instanceof Error ? e.message : String(e),
        };
        return next;
      });
    }
  }, []);

  useEffect(() => {
    SOURCES.forEach((_, i) => void fetchOne(i));
  }, [fetchOne]);

  const allOk = states.every((s) => s.status === "ok");
  const anyError = states.some((s) => s.status === "error");
  const loadedChars = states.reduce(
    (sum, s) => (s.status === "ok" ? sum + s.content.length : sum),
    0
  );

  const pack = useMemo(
    () => (allOk ? buildPack(states) : ""),
    [allOk, states]
  );

  const handleCopy = useCallback(async () => {
    if (!pack) return;
    await navigator.clipboard.writeText(pack);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [pack]);

  const handleDownload = useCallback(() => {
    if (!pack) return;
    const blob = new Blob([pack], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pic-llm-context-pack.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [pack]);

  const handleRetry = useCallback(() => {
    states.forEach((s, i) => {
      if (s.status === "error") void fetchOne(i);
    });
  }, [states, fetchOne]);

  const tokenEstimate = Math.round(pack.length / 4);

  const mono: React.CSSProperties = {
    fontFamily: "var(--ifm-font-family-monospace)",
    fontSize: "0.8rem",
  };

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "1.5rem 0",
        background: "var(--ifm-pre-background)",
        boxShadow: "var(--ifm-global-shadow-lw)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0.55rem 1rem",
          borderBottom: "1px solid var(--ifm-color-emphasis-300)",
          background: "var(--ifm-color-emphasis-100)",
        }}
      >
        <span style={{ display: "flex", gap: 6 }} aria-hidden="true">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: c,
                display: "inline-block",
              }}
            />
          ))}
        </span>
        <span style={{ ...mono, fontWeight: 600 }}>
          pic-llm-context-pack.txt
        </span>
        <span
          style={{
            ...mono,
            marginLeft: "auto",
            color: "var(--ifm-color-emphasis-600)",
          }}
        >
          always current — fetched from main
        </span>
      </div>

      {/* File list */}
      <ul style={{ listStyle: "none", margin: 0, padding: "0.75rem 1rem" }}>
        {SOURCES.map((src, i) => {
          const st = states[i];
          return (
            <li
              key={src.url}
              style={{
                ...mono,
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                padding: "0.18rem 0",
              }}
            >
              <span
                style={{
                  width: "1.2em",
                  textAlign: "center",
                  color:
                    st.status === "ok"
                      ? "var(--ifm-color-success)"
                      : st.status === "error"
                        ? "var(--ifm-color-danger)"
                        : "var(--ifm-color-emphasis-500)",
                }}
                aria-label={st.status}
              >
                {st.status === "ok" ? "✓" : st.status === "error" ? "✗" : "•"}
              </span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={src.url}
              >
                {src.path}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--ifm-color-emphasis-600)",
                  flexShrink: 0,
                }}
              >
                {st.status === "ok"
                  ? formatKb(st.content.length)
                  : st.status === "error"
                    ? st.message
                    : "fetching…"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Footer / actions */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
          padding: "0.75rem 1rem",
          borderTop: "1px solid var(--ifm-color-emphasis-300)",
        }}
      >
        <button
          className="button button--primary"
          onClick={handleCopy}
          disabled={!allOk}
        >
          {copied ? "Copied ✓" : "Copy context pack"}
        </button>
        <button
          className="button button--secondary"
          onClick={handleDownload}
          disabled={!allOk}
        >
          Download .txt
        </button>
        {anyError && (
          <button className="button button--warning" onClick={handleRetry}>
            Retry failed
          </button>
        )}
        <span
          style={{
            ...mono,
            marginLeft: "auto",
            color: "var(--ifm-color-emphasis-600)",
          }}
        >
          {allOk
            ? `${formatKb(pack.length)} · ~${tokenEstimate.toLocaleString()} tokens`
            : anyError
              ? "some files failed to load"
              : `loading… ${formatKb(loadedChars)}`}
        </span>
      </div>

      {/* Preview */}
      {allOk && (
        <div
          style={{ borderTop: "1px solid var(--ifm-color-emphasis-300)" }}
        >
          <button
            onClick={() => setShowPreview((v) => !v)}
            style={{
              ...mono,
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ifm-color-emphasis-700)",
            }}
            aria-expanded={showPreview}
          >
            {showPreview ? "▾ hide preview" : "▸ show preview"}
          </button>
          {showPreview && (
            <pre
              style={{
                margin: 0,
                maxHeight: 340,
                overflow: "auto",
                borderRadius: 0,
                fontSize: "0.72rem",
              }}
            >
              {pack}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
