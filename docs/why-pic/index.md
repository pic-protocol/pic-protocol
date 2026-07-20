---
sidebar_position: 1
---

# Why PIC

Think of a post office.

A user can enter in two ways. With a normal login, OIDC authenticates the
user and OAuth issues an access token. With a wallet, the user presents
Verifiable Credentials through OID4VP; after verification, the Authorization
Server issues an OAuth access token.

In both cases, the OAuth access token represents the initial authority
derived from granted permissions, policy, consent, and context.

OAuth works well at the first counter, but it does not define a verifiable
authorization chain for every handoff as the parcel moves through multiple
sorting centers.

Object capabilities solve this differently. Bob receives a key that directly
represents authority over a locker. He can delegate that authority by passing
the key—or a more restricted key—to someone else.

But suppose Bob leaves the company. In a large distributed environment,
revoking every delegated copy may require additional indirection, registries,
or online checks, reducing the simplicity of the capability model.

PIC combines the simplicity of OAuth with capability-style propagation. Using
the OAuth 2.0 Token Exchange profile, the access token is exchanged for a PIC
token—a PCA.

The PCA does not merely carry permissions. It encodes the execution into the
protocol and introduces two new primitives:

- **Proof of Relationship**, proving that the current state is
  cryptographically linked to its specific predecessor.
- **Proof of Continuity**, proving that the new state is a valid continuation
  of the same execution.

Every hop must validate both proofs. Authority may only be preserved or
attenuated, never expanded. If either proof fails, or if policy revokes the
authority, the chain cannot continue.

OIDC or OID4VP provides identity and evidence. OAuth establishes the initial
authority. PIC adds Proof of Relationship and Proof of Continuity, carrying
that authority safely across multiple hops by encoding execution into the
protocol itself.

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

**Authority** defines the effects that a particular execution is entitled to
cause. It is derived from the origin authority context and remains bounded
by the causal continuity of the execution, rather than by the identity or
credentials of the current executor alone.

**Identity** anchors authority at its origin by establishing the immutable
provenance principal. **Authorization** then determines whether a requested
action is a valid continuation of that origin authority within the current
execution, evaluating the propagated authority context, its monotonic
restrictions, and the execution lineage rather than relying on endpoint
identity or credential possession alone.

**Governance** defines the policies under which authority may continue. It
establishes, constrains, and revokes permissions, while PIC guarantees that
any execution which is allowed to continue preserves provenance, origin
identity, and monotonic authority propagation. Governance therefore
constrains continuation; it does not create authority or reconstruct
continuity.

:::note On the name PIC

In Provenance Identity Continuity, the term **Identity** refers to the
security identity or execution identity of the permissioned entity from
which authority is created or anchored at the origin. It does not mean that
identity is propagated as the authorization primitive at every hop. The
model instead shifts the authorization burden from repeatedly interpreting
identity to verifying execution continuity: a causal lineage carrying a
non-expansive authority context.

**Provenance** denotes the causal origin and lineage of the execution,
**Identity** denotes the authenticated permissioned origin, and
**Continuity** denotes the preservation of authority across later hops
without expansion. Identity and identifiers therefore remain essential for
authentication, credential presentation, audit, accountability, and origin
bootstrap; **Proof of Continuity** concerns the authorization continuity
that must hold after that origin has been established.

:::

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
