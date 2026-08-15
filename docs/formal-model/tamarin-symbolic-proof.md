---
sidebar_position: 4
---

# PIC Tamarin Symbolic Proof

The PIC Tamarin theory verifies a **message-level realization** of PIC
continuity against an active Dolev-Yao network attacker. The project lives in:

[github.com/ngallo/pic-model/.../pic-tamarin](https://github.com/ngallo/pic-model/tree/main/draft/0.1/pic-model-math/pic-tamarin)

Where Lean proves the abstract model, Tamarin checks a concrete symbolic
protocol shape: public signed checkpoints, workload attestation, transition
signatures, non-expansion checks, and realm-signed settlement.

## What is Tamarin?

[Tamarin](https://tamarin-prover.com/) is a symbolic verifier for security
protocols. It models protocol executions as traces, lets an active attacker
control the network, and proves temporal properties over those traces.

In this page, Tamarin is used for the stateful part of PIC continuity: proving
that accepted checkpoint traces preserve origin-bound authority, that dropped
authority stays dropped on a branch, and that accepted transitions have the
required attestation and key-control evidence.

## What this proves

Tamarin is used for the stateful properties that need trace reasoning. It
proves that the checker discipline has the intended global consequences even
when the attacker sees every token and can compromise attested workload keys.

All 11 lemmas in the current theory are verified automatically.

## Lemmas in plain language

| Tamarin lemma or mechanism | What it means |
| --- | --- |
| `NonExpansion` restriction | The checker may only accept a privilege flag that stays the same or drops to `n`. It cannot rise from absent to present. |
| `Sanity_TwoHop_Walkthrough` | The example `{read, save} -> {save} -> {}` is reachable. The model can run the intended flow. |
| `Sanity_Sibling_Branches` | Two sibling continuations from the same checkpoint are reachable. Fan-out is allowed, but each branch remains bounded by its predecessor and origin. |
| `Origin_Unique` | Each lineage has one origin authority context. This prevents the proof from mixing two different origins for one lineage. |
| `No_Escalation_Read` / `No_Escalation_Save` | If `read` or `save` was absent at the origin, no checkpoint in that lineage can later carry it. These are inductive invariants. |
| `PIC_Safety_Read` / `PIC_Safety_Save` | No accepted continuation can exercise `read` or `save` if that privilege was absent from the lineage origin. This is PIC Safety at the wire-model level. |
| `Branch_Dropped_Read_Stays_Dropped` / `Branch_Dropped_Save_Stays_Dropped` | Once a branch drops a privilege, later continuations of that branch cannot recover it. |
| `Only_Attested_Advance` | Every accepted advancement used a workload key that was attested by the trusted PoR issuer. |
| `Key_Control_Or_Compromise` | If a transition is accepted under a key and the key was not compromised, the corresponding workload signed that exact lineage and position. |

## Why this matters

The Tamarin proof is the message-level companion to the Lean theorem:

```text
Lean:
  If every transition is PoR + non-expansion,
  then authority is origin-bounded.

Tamarin:
  In this symbolic protocol,
  the checker enforces non-expansion and PoR evidence,
  and accepted traces satisfy origin-bound safety.
```

So Tamarin shows that the protocol skeleton preserves the intended invariant
under an active network attacker, public tokens, persistent checkpoints, and
branching.

## What Tamarin does not claim

The theory uses symbolic cryptography and perfect parsing. It does not prove
byte-level COSE/JOSE encodings, concrete SD-JWT issuer security, runtime
attestation soundness, or governance of when a workload may open a new lineage.

## Verify it

```bash
cd draft/0.1/pic-model-math/pic-tamarin
tamarin-prover --prove PICContinuity.spthy
```

Expected summary: all 11 lemmas verified, none falsified, none incomplete.
