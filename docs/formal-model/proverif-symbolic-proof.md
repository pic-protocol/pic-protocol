---
sidebar_position: 3
---

# PIC ProVerif Symbolic Proof

The PIC ProVerif model checks the **authentication core** of a minimal
centralized PIC continuity protocol against an active symbolic attacker.
The project lives in:

[github.com/ngallo/pic-model/.../pic-proverif](https://github.com/ngallo/pic-model/tree/main/draft/0.1/pic-model-math/pic-proverif)

ProVerif models the message-level protocol: a realm signs accepted
checkpoints, workloads receive Proof of Relationship evidence from a trusted
issuer, and all signed artifacts are public. The attacker is allowed to see
tokens and schedule messages.

## What is ProVerif?

[ProVerif](https://bblanche.gitlabpages.inria.fr/proverif/) is an automated
symbolic protocol verifier. It analyzes cryptographic protocol models in the
Dolev-Yao style: cryptography is treated symbolically, messages are public
unless protected by modeled assumptions, and the tool searches for attacks or
proves that specified events imply other events.

In this page, ProVerif is used to check the authentication core of PIC
continuity: accepted advancement must come from an attested workload key, and
an uncompromised accepted key must have signed the transition it is credited
with.

## What this proves

This proof answers a specific question: when the checker accepts a transition,
was there valid relationship evidence and key control behind it?

It is a complementary proof, not a replacement for Lean or Tamarin:

| Layer | Tool | Role |
| --- | --- | --- |
| Abstract model | Lean | Proves the mathematical PIC theorems for arbitrary chains. |
| Message-level stateful safety | Tamarin | Proves origin-bound authority and irreversible drop with trace induction. |
| Message-level authentication core | ProVerif | Proves PoR eligibility, key control, and non-vacuity as an independent symbolic check. |

## Queries in plain language

| ProVerif query | What it means |
| --- | --- |
| `AcceptedT(k,l,p) ==> Issued(k)` | If PIC-X accepts a transition under workload key `k`, that key must have been attested by the trusted PoR issuer. Holding a token alone is not enough. |
| `AcceptedT(k,l,p) ==> WSignT(k,l,p) or KeyReveal(k)` | If an accepted transition uses an uncompromised workload key, the workload signed exactly that lineage and position. If not, the model records the key as compromised. |
| `event(Settled(l, s(s(zero)), no, no))` is reachable | The two-hop walkthrough `{read, save} -> {save} -> {}` can actually happen in the model. This proves the model is not vacuous. |

## How to read the last result

The final query is intentionally a reachability sanity check. ProVerif reports
the negated query as `false`, which means the event **is reachable**. That is
good: the protocol model can execute the expected two-hop attenuation flow.

## What ProVerif does not claim

ProVerif does not prove the full origin-bound non-expansion theorem for
unbounded checkpoint chains in this model. That property needs induction over
the chain, so it is proved in Tamarin and abstractly in Lean.

It also does not prove concrete SD-JWT deployment security, byte-level
COSE/JOSE encodings, or lineage-origination policy.

## Verify it

```bash
cd draft/0.1/pic-model-math/pic-proverif
proverif pic_continuity.pv
```

Expected results:

```text
RESULT event(AcceptedT(k,l_1,p_1)) ==> event(Issued(k)) is true.
RESULT event(AcceptedT(k,l_1,p_1)) ==> event(WSignT(k,l_1,p_1)) || event(KeyReveal(k)) is true.
RESULT not event(Settled(l_1,s(s(zero)),no,no)) is false.
```
