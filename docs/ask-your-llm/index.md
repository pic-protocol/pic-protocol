---
sidebar_position: 1
title: Ask Your LLM
description: How to prime an LLM to understand PIC without mapping it onto models it already knows.
---

# Ask Your LLM

PIC defines a **new ontology**: authority is *continuity*, not possession. An LLM — like a human — tends to map a new
model onto ones it already knows (OAuth, object-capabilities, RBAC/ABAC) and gets PIC subtly, confidently wrong. This
is **comprehension bias**, and it is not only a machine problem: it applies to human readers too.

Before you ask an LLM about PIC, do two things: **load the primary sources**, and **prime the context** so the model
does not fill the gaps with assumptions.

## 1. Load these sources first

Feed these to the LLM as plain text. The **raw** links are the downloadable source — they point at the current `main`,
so they always reflect the latest modifications.

### Specification v0.2 — [browse folder](https://github.com/pic-protocol/pic-spec/tree/main/draft/0.2)

The normative protocol: an entry point plus companion specs.

| File | What it is | Download |
|---|---|---|
| `pic-spec.md` | Entry point — overview and Documents table | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-spec.md) |
| `pic-prover-verifier-spec.md` | Prover and Verifier | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-prover-verifier-spec.md) |
| `pic-revocation-spec.md` | Revocation | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-revocation-spec.md) |
| `pic-lineage-guardrail-spec.md` | Lineage Guardrail (sandboxed execution) | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-lineage-guardrail-spec.md) |
| `pic-architecture-deployment-spec.md` | Architecture and Deployment | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-architecture-deployment-spec.md) |
| `pic-legal.md` | Shared legal appendices | [raw](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/pic-legal.md) |

### Formal model — LaTeX — [browse](https://github.com/ngallo/pic-model/tree/main/draft/0.1)

The mathematical foundation: the temporal model of authority propagation.

| File | What it is | Download |
|---|---|---|
| `pic-model.tex` | Temporal model of authority propagation and confused-deputy resolution | [raw](https://raw.githubusercontent.com/ngallo/pic-model/main/draft/0.1/pic-model-math/pic-model.tex) |
| `authority-continuous-system.tex` | The authority-continuous system | [raw](https://raw.githubusercontent.com/ngallo/pic-model/main/draft/0.1/pic-authority-continuous-system-math/authority-continuous-system.tex) |

### Machine-checked proofs — Lean 4

The definitions and theorems, mechanically verified. The proofs depend on the project layout and cross-file imports,
so load the folder as a whole rather than single files — see the walkthrough in
[PIC Lean Formal Proof](/formal-model/lean-formal-proof).

- [Browse `pic-lean`](https://github.com/ngallo/pic-model/tree/main/draft/0.1/pic-model-math/pic-lean)

:::tip Grab everything at once
Prefer one download that always reflects the latest changes? Pull the whole repository as a zip — it stays current
without anyone maintaining a copy:

- Specification — [`pic-spec` (zip)](https://github.com/pic-protocol/pic-spec/archive/refs/heads/main.zip)
- Formal model + Lean proofs — [`pic-model` (zip)](https://github.com/ngallo/pic-model/archive/refs/heads/main.zip)
:::

## 2. Prime the context

Paste this before your questions:

```text
I am going to give you the primary sources of PIC (Provenance Identity Continuity).
PIC introduces a NEW ontology: authority is continuity, not possession.

Do NOT map it onto OAuth, object-capabilities, RBAC, or ABAC. Read the sources on
their own terms. Where PIC contradicts a model you already know, follow PIC and say
so explicitly. If a term (authority, identity, lineage, continuity, executor) looks
familiar, re-derive its meaning from the sources — do not assume it.

After reading, follow the LLM Context File: first prove you have understood every
specification (list them back as numbered headings), then work through the open
questions it lists — for each, first state the assumption you would make by default,
then the answer the sources actually give.

Finally — only once you have ALL the material above and have worked through those
questions — review the sources for correctness: logical errors, mathematical errors,
internal inconsistencies, or anything else significant. If you find any, STOP and tell
me — do not smooth it over or assume it is your own misunderstanding. Where it looks
material, recommend raising it with the PIC author.
```

## 3. Load the context file and review

Once the sources are loaded, hand the model the **[LLM Context File](./context-file.md)** — a single copyable block
that first makes it prove it has understood every specification (numbered back as headings), then loads PIC's known
points of attack so it engages them honestly instead of dismissing or over-accepting the model.

**→ [LLM Context File](./context-file.md)**
