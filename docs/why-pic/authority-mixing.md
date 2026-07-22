---
sidebar_position: 4
---
# The N+1 Invalid State Problem

## Executor *n+1* Sees Only the State

Distributed execution is a causal chain: executor *n* acts, and executor *n+1* continues. Looking backward, the
predecessor is always known: *n+1* knows exactly which executor handed it the state. Looking forward, *n+1* itself
may be known in advance or still unknown — not yet provisioned when the chain began (see
[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)). **This problem does not depend on that
distinction**: the invalid state is created at *n*, and it reaches *n+1* whether *n+1* was known or unknown.

Knowing the predecessor, however, does not mean knowing what it did. Executor *n+1* cannot inspect the code that ran
at *n*, cannot observe its intent, cannot replay what happened before. Everything it knows is contained in **the
security state it receives**. Its entire authorization decision reduces to one question: *is this state valid?*

## What No Protocol Can Prevent

No security protocol can prevent a bug inside an executor. If executor *n* receives authority to `read` and its
application logic performs a `write`, nothing in the protocol can stop it: the deviation happens inside code, at the
endpoint, after every check has already passed. Misbehaving application logic — bugs, defects, compromise — is
**physically beyond the reach of the protocol itself**.

This is not a weakness of one design or another; it is the boundary of the problem space. A protocol governs the
**security state that travels between executors** — not what code does inside one.

## The One Guarantee That Matters

Because local misbehavior cannot be prevented, a security protocol must be correct at the single point that *is*
within its reach: executor *n* — buggy or malicious — must never be able to hand executor *n+1* an **invalid state
that validates**. An invalid state is a state that violates the authority of the lineage; if it is nonetheless
accepted as valid, *n* has convinced *n+1* to do something the originating caller never had permission for.

The distinction matters because of scale. A bug confined to executor *n* is a local incident. A bug that can forge a
state that validates at *n+1* turns **every downstream executor into its amplifier**.

## When the Protocol Fails, Valid Is Valid

If a protocol fails to prevent a bug from creating a state that validates, that state **will be executed and
propagated**. Executor *n+1* has no way to know that what it received derives from a bug: every artifact is
correctly signed, correctly attenuated, fully compliant. Valid is valid — so it continues. And at the next hop,
*n+1* becomes the new *n*: the forged authority propagates, each executor faithfully extending an authority the
origin never granted.

## Example: A Bug Composes an Invalid Security State

An executor rarely holds a single authority: it holds many at once — its own ambient privileges, delegated tokens,
credentials belonging to concurrent lineages. In capability systems — and in every model that ignores the temporal
dimension — lineages are flattened: an artifact, once held, is usable in any execution, and nothing keeps each
authority bound to the lineage it belongs to. Authority belonging to one lineage can then be drawn into another —
this is **authority mixing**, and it does not even require composition: it is enough for an executor to *select the
wrong source*, satisfying a request with an authority the requester never had. That is the classic confused deputy.

**Composition** is the sharpest instance — a bug merges two individually valid authorities into a state no origin
ever granted:

![Bug Creates a Valid Security State](/img/why-pic/bug-valid-security-state.png)

Consider two concurrent lineages flowing through the same executors:

- **Lineage 1** originates with `read foo, share files` and is attenuated to `share files`.
- **Lineage 2** originates with `read all, backup` and is attenuated to `read all`.

At executor *n*, an application **bug** composes the `read all` capability from lineage 2 with lineage 1's
`share files`, and passes the result downstream. Executor *n+1* receives `read all, share files` and continues,
unaware — whether it was known in advance or provisioned only after the lineages began makes no difference.

Every artifact in that state is individually valid: correctly attenuated, correctly signed. **The bug has created an
invalid state that validates.** Yet the origin of lineage 1 never granted `read all`: authority is violated while
the security protocol is fully satisfied.

The problem is not limited to composition: any use of an authority outside the lineage that caused the request —
selected, borrowed, or merged — is the same mismatch. In these models the violation is invisible at the protocol
level, so safety rests on the behavior and posture of whoever builds and operates the system: avoid bugs, audit
code, trust every executor in the chain. The model itself cannot help.

## Authority Continuity: The Application Can Misbehave, the Invalid State Cannot Be Created

PIC does not exclude the bug — no protocol can. What it removes is the bug's power to produce an invalid state that
validates.

With **authority continuity**, every authority context is bound to the lineage that caused it. Using authority
across lineages — by selection or by composition — is not a valid transition: there is no **Proof of Relationship**
linking lineage 2's `read all` to lineage 1's chain, so the mixed state is **not representable in the model**. The
bug may still execute, but the state it attempts to build can never validate: executor *n+1* never faces the
dilemma, because an invalid state can never reach it as valid.

As with the N+1 unknown executor problem, **Proof of Continuity** solves it by respecting lineage across space and
time: each hop is authorized only against the authority context of the lineage that caused it. Authority sources may
be carried together, but they are **never merged into a combined authority**.

Not detection, not mitigation: **at executor *n+1*, an invalid state cannot exist as valid — even in the presence of
bugs.**
