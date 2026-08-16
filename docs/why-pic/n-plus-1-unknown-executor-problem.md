---
sidebar_position: 3
---

import ThemedZoomableImage from '@site/src/components/ThemedZoomableImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# The N+1 Unknown Executor Problem

Distributed execution is not a sequence of positions. It is a sequence of **causal steps across time**.

A workload does not exist because it is next in a list. It exists because it was provisioned at a specific moment, in response to a specific event. It becomes an **executor** in an authority propagation only if it can **securely carry that authority forward** as a valid continuation of the execution chain.

<ThemedZoomableImage
  alt="Executor n acts at time x, while executor n+1 is only provisioned at time x plus a positive offset and does not exist yet"
  style={{width: '100%', maxWidth: '880px', display: 'block', margin: '1.75rem auto'}}
  sources={{
    light: useBaseUrl('/img/why-pic/canonical-execution-model-light.svg'),
    dark: useBaseUrl('/img/why-pic/canonical-execution-model-dark.svg'),
  }}
/>

When Workload *n* receives a message at time *x*, Workload *n+1* is provisioned at time *x + y*, where *y* is a positive offset. The gap is real: **the downstream executor does not exist yet when the upstream executor acts**.

This is the **N+1 unknown executor problem**: authority must reach a successor that is not yet known, selected, or provisioned when the predecessor acts. Pre-binding authority to the holder, key, or channel of an unknown successor is therefore not always possible.

This has three consequences:

- **Authority flows from origin — never re-created**: within a chain, there is no moment where a new workload can bootstrap its own authority. Authority must arrive causally from what came before.
- **Every hop must prove continuity, not possession**: holding a token is not enough. The workload must demonstrate it is a valid continuation of the execution chain.
- **Execution is temporal and causal, not positional**: the chain is defined by what happened and when — not by topology or configuration.

This is why possession-based models are incomplete for distributed execution. They assume the chain is synchronous and positional. It is not.

## The Canonical Execution Model

This problem is categorized by the **Canonical Execution Model**: execution as a causal chain in which each executor may come into existence only after its predecessor has acted. A system that claims to satisfy authority propagation MUST be designed and tested against the canonical execution model — if it works only when the whole chain is known in advance, it does not solve authority propagation.

## Authority Continuity

In `PIC`, a transition between execution steps is valid only if two conditions hold at that hop:

- **Causal relationship**: the step is a valid causal continuation of its immediate predecessor within the same execution lineage, witnessed by a **Proof of Relationship (PoR)** — single-hop evidence binding the executor to the step that came before it.
- **Monotonic authority restriction**: the authority carried forward is a restriction of the authority held at the previous hop — it may remain identical or decrease, but it never expands.

Composed transitively along the chain, these valid transitions form a **Proof of Continuity (PoC)**: the proof that the entire lineage, from origin to current state, is unbroken and monotonic. Relationship is local; continuity is global.

From these two conditions the guarantees follow: provenance remains traceable from origin to current state, the origin principal `p₀` is preserved throughout the chain, and authority cannot be re-created mid-chain, cannot escape its origin, and cannot expand across any dimension. The confused deputy problem becomes structurally inexpressible — not mitigated, but impossible by construction.
