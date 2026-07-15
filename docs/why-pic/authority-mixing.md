---
sidebar_position: 4
---
# The Authority Mixing Problem

An executor rarely holds a single authority. It holds many at once — its own ambient privileges, delegated tokens, credentials belonging to concurrent lineages. In capability systems — and in every model that ignores the temporal dimension — lineages are flattened: an artifact, once held, is usable in any execution, and nothing keeps each authority bound to the lineage it belongs to.

**Authority mixing** is the result: authority belonging to one lineage is drawn into another. No composition is required — it is enough for an executor to *select the wrong source*, satisfying a request with an authority the requester never had. That is the classic confused deputy.

## Example: Cross-Lineage Composition

Composition is the sharpest instance of the problem — two individually valid authorities merged into a state no origin ever granted:

![Bug Creates a Valid Security State](/img/why-pic/bug-valid-security-state.png)

Consider two concurrent lineages flowing through the same executors:

- **Lineage 1** originates with `read foo, share files` and is attenuated to `share files`.
- **Lineage 2** originates with `read all, backup` and is attenuated to `read all`.

At executor *n*, an application **bug** composes the `read all` capability from lineage 2 with lineage 1's `share files`, and passes the result downstream. Executor *n+1* — the unknown executor, not yet provisioned when the lineages began — receives `read all, share files` and continues, unaware.

Every artifact in that state is individually valid: correctly attenuated, correctly signed. **The bug has created a valid security state.** Yet the origin of lineage 1 never granted `read all`: authority is violated while the security protocol is fully satisfied.

The problem is not limited to composition: any use of an authority outside the lineage that caused the request — selected, borrowed, or merged — is the same mismatch. In these models the violation is invisible at the protocol level, so safety rests on the behavior and posture of whoever builds and operates the system: avoid bugs, audit code, trust every executor in the chain. The model itself cannot help.

## Continuity Makes the State Inexpressible

PIC introduces the spatio-temporal dimension: every authority context is bound to the lineage that caused it. Using authority across lineages — by selection or by composition — is not a valid transition: there is no Proof of Relationship linking lineage 2's `read all` to lineage 1's chain, so the mixed state is **not representable in the model**. A bug may still attempt it, but it cannot produce a valid state: within the model, the violation is inexpressible.

As with the N+1 unknown executor problem, **Proof of Continuity** solves it by respecting lineage across space and time: each hop is authorized only against the authority context of the lineage that caused it. Authority sources may be carried together, but they are **never merged into a combined authority**.
