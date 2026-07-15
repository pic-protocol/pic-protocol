---
sidebar_position: 3
---
# The N+1 Unknown Executor Problem

Distributed execution is not a sequence of positions. It is a sequence of **causal steps across time**.

A workload does not exist because it is next in a list. It exists because it was provisioned at a specific moment, in response to a specific event. It becomes an **executor** in an authority propagation only if it can **securely carry that authority forward** as a valid continuation of the execution chain.

![Canonical Execution Model](/img/why-pic/canonical-execution-model.png)

When Workload *n* receives a message at time *x*, Workload *n+1* is provisioned at time *x + y*, where *y* is a positive offset. The gap is real: **the downstream executor does not exist yet when the upstream executor acts**.

This is the **N+1 unknown executor problem**: authority must reach a successor that is not yet known, selected, or provisioned when the predecessor acts. Pre-binding authority to the holder, key, or channel of an unknown successor is therefore not always possible.

This has three consequences:

- **Authority flows from origin — never re-created**: there is no moment where a new workload can bootstrap its own authority. Authority must arrive causally from what came before.
- **Every hop must prove continuity, not possession**: holding a token is not enough. The workload must demonstrate it is a valid continuation of the execution chain.
- **Execution is temporal and causal, not positional**: the chain is defined by what happened and when — not by topology or configuration.

This is why possession-based models fail in distributed execution. They assume the chain is synchronous and positional. It is not.

## The Canonical Execution Model

This problem is categorized by the **Canonical Execution Model**: execution as a causal chain in which each executor may come into existence only after its predecessor has acted. A system that claims to satisfy authority propagation MUST be designed and tested against the canonical execution model — if it works only when the whole chain is known in advance, it does not solve authority propagation.

## Authority Continuity

`PIC` defines three invariants that must hold at every execution hop:

- **Provenance**: the causal chain is always traceable from origin to current state, unbroken.
- **Identity**: the origin principal `p₀` is immutable throughout the chain.
- **Continuity**: authority can only decrease at each hop. It never expands.

To uphold these invariants, every executor must prove — through a **Proof of Relationship (PoR)** — that its step is part of the temporal execution of that authority propagation: single-hop evidence binding it to its immediate predecessor. Composed transitively, these relationships form a **Proof of Continuity (PoC)**, which preserves the formal model's monotonicity over both the operations and the execution characteristics. Relationship is local; continuity is global.

Under these invariants, authority cannot be re-created mid-chain, cannot escape its origin, and cannot expand across any dimension. The confused deputy problem becomes structurally inexpressible — not mitigated, but impossible by construction.
