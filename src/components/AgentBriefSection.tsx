import Link from "@docusaurus/Link";

const CHECKS = [
  {
    label: "01",
    title: "Provenance identity",
    copy: "Root authority in origin identity and causal provenance, not in bearer possession alone.",
  },
  {
    label: "02",
    title: "PoR to PoC",
    copy: "Verify adjacent Proof of Relationship evidence, then compose it as Proof of Continuity.",
  },
  {
    label: "03",
    title: "Guardrail non-expansion",
    copy: "Reject invalid mixed lineages and authority states that expand beyond their causal path.",
  },
];

export const AgentBriefSection = () => {
  return (
    <section
      id="tw-scope"
      className="px-6 pt-16 md:pt-20 xl:px-24 dark:bg-[#1F1F21]"
    >
      <div className="agent-brief-shell mx-auto max-w-300">
        <div className="agent-brief-copy">
          <span className="mono mb-3 block text-[10px] font-semibold uppercase tracking-normal text-[#00543D] dark:text-[#25c2a0]">
            {"// authority_propagation_for_ai_agents"}
          </span>
          <h2 className="font-[Clash_Grotesk]! m-0 max-w-180 text-[32px] font-medium leading-none tracking-normal text-black dark:text-white md:text-[44px]">
            Protocol-level authority propagation for AI agents.
          </h2>
          <p className="m-0 mt-5 max-w-156 text-[17px] font-light leading-8 text-black/60 dark:text-white/58">
            PIC models authority as provenance identity plus causal
            relationship. Agent systems verify Proof of Relationship, compose
            Proof of Continuity, and enforce non-expansion through Sandboxed
            Execution and multi-lineage guardrails.
          </p>

          <div className="agent-brief-actions">
            <Link className="agent-brief-primary no-underline" href="/ask-your-llm">
              Ask Your LLM
            </Link>
            <Link
              className="agent-brief-secondary no-underline"
              href="/why-pic/authority-propagation"
            >
              Authority Propagation
            </Link>
          </div>
        </div>

        <div className="agent-brief-stage" aria-label="Protocol-level authority propagation for AI agents">
          <div className="agent-brief-core">
            <span className="mono">protocol security layer</span>
            <strong>PoR + PoC, not possession</strong>
          </div>

          <div className="agent-brief-flow" aria-hidden="true">
            <span>Provenance Identity</span>
            <span>Proof of Relationship</span>
            <span>Proof of Continuity</span>
            <span>non-expansion</span>
            <span>Sandboxed Execution</span>
          </div>

          <div className="agent-brief-checks">
            {CHECKS.map((item) => (
              <div className="agent-brief-check" key={item.label}>
                <span className="mono">{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
