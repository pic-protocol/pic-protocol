---
sidebar_position: 1
---

# Why PIC

Distributed systems execute across services, workloads, and tools. AI agents
raise trust problems of their own — how to govern them, how much autonomy to
grant — but those belong to a different layer. **With respect to authority
propagation and authorization, AI agents are distributed systems**: authority
created at an origin must travel across execution steps without being
expanded, reconstructed, or mixed. PIC focuses on exactly this — and on this
ground, the two are the same.

**Authority propagation is a necessary element for AI agents and distributed
systems to work: a low-level building block on which governance sits.**

The problems to solve have been classified as:

- **[The Authority Propagation Problem](./authority-propagation.md)** — how
  authority is created by a permissioned entity at a **specific origin** and
  propagated, only narrowing, through a causal chain of executors.
- **[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)**
  — the temporal dimension spans **past, present, and future**: delegation is
  not made to a known identity. Authority is emitted toward a successor that
  does not exist yet when its predecessor acts; the successor proves it is a
  continuation of the past, and carries the authority forward.
- **[The Authority Mixing Problem](./authority-mixing.md)** — authority
  belonging to one lineage is drawn into another: selected, borrowed, or
  composed into a valid security state that violates authority. A bug can
  create a state **indistinguishable from a valid one** for the *n+1*
  executor — addressed today with posture, when it requires elimination in
  the model itself.

## What a Security Model Can Guarantee

If an executor ignores the model and physically does something else, no
security model can stop it — that is the nature of code and execution
control. An executor that receives a token saying `READ` and performs
`DELETE` is not a failure of the security model; it is a failure of the
implementation, and no model can prevent it.

What a security model does guarantee is that the **next step validates
within the model** — and it must be correct in exactly that. Validating is
not enough on its own: each step must also **prove to its successor a
security state that is valid within the lineage that carries the
authority** — so that what the next executor continues is, provably, a state
of that lineage and not of another. This is where the temporal dimension
matters: it makes the class of problems caused by bugs that forge
valid-looking security states — indistinguishable to the *n+1* executor —
**unable to exist**. Not behavioral mitigation, which only limits behavior:
**total elimination in the model itself**.

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
