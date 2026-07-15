---
sidebar_position: 1
---

# Why PIC

Distributed systems execute across services, workloads, and tools — and AI
agents are nothing more than distributed systems. For all of them,
**authority propagation** must be solved: authority created at an origin has
to travel across execution steps without being expanded, reconstructed, or
mixed.

The problems to solve have been classified as:

- **[The Authority Propagation Problem](./authority-propagation.md)** — how
  authority is created by a permissioned entity and propagated, only
  narrowing, through a causal chain of executors.
- **[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)**
  — authority must reach a successor that does not exist yet when its
  predecessor acts.
- **[The Authority Mixing Problem](./authority-mixing.md)** — authority
  belonging to one lineage is drawn into another: selected, borrowed, or
  composed into a valid security state that violates authority.

## The Ontology

**Authority** defines what an execution is entitled to cause. **Identity**
anchors that authority at its origin. **Authorization** decides, in context,
whether a specific action is a valid continuation of that authority — it
reads lineage, not identity. **Governance** constitutes, constrains, and
audits both: how authority is established, restricted, revoked, and evolved,
and how authorization decisions are made accountable.

Identity remains essential for attribution — but **continuity, not
possession, carries authority**. Governance is a separate layer that sits on
top: it may restrict what authority permits, never expand it.

## Authority Continuity

PIC solves the three problems with one principle: **authority is
continuity**. Authority is created once, at the origin, by a permissioned
entity — and exists afterwards only as the ongoing, non-expansive
continuation of that origin. Every hop proves its causal relationship to its
predecessor (**Proof of Relationship**); composed transitively, these
relationships form a **Proof of Continuity** across the whole chain.

Under this ontology, authority cannot be re-created mid-chain, cannot expand,
cannot be pre-bound to executors that do not exist yet, and cannot cross
lineages. Whatever violates continuity is not blocked at runtime — it is
simply **not a valid state of the model**.
