---
sidebar_position: 2
---

# PIC Lean Formal Proof

The PIC paper is formalized in **Lean 4**, a proof assistant whose kernel
checks every theorem mechanically. The project lives in:

[github.com/ngallo/pic-model/.../pic-lean](https://github.com/ngallo/pic-model/tree/main/draft/0.1/pic-model-math/pic-lean)

The Lean development uses only Lean core. It has no Mathlib dependency, no
`sorry`, and no added axioms. A successful `lake build` means Lean accepted
the definitions and proofs from its kernel logic.

## What is Lean?

[Lean](https://lean-lang.org/) is an open-source programming language and
proof assistant. In this page, it is used as a machine checker for the PIC
mathematical model: definitions and theorems are written in Lean, and Lean's
small trusted kernel verifies that each proof is valid.

That matters because the result is not just an argument written in prose. The
proof object is checked by software designed specifically to reject invalid
formal reasoning.

## What this proves

Lean proves the **abstract PIC model**: arbitrary privilege sets, arbitrary
finite execution chains, and theorems about what can and cannot happen in a
valid continuity chain.

The central formal shape is:

```text
Valid transition
= Proof of Relationship between adjacent steps
  AND successor authority is no larger than predecessor authority

Valid(s_i, C_i, s_{i+1}, C_{i+1})
  iff PoR(s_i, s_{i+1}) and C_{i+1} subset C_i
```

Then Proof of Continuity is the whole chain:

```text
PoC(chain)
  iff every adjacent transition in the chain is valid
```

From that, Lean proves the core safety result:

```text
If PoC(chain), then C_n subset C_0.
```

In plain language: if a privilege was not present at the origin, it cannot
appear later in the same valid PIC lineage.

## Proofs in plain language

| Lean result | What it means |
| --- | --- |
| `picSafety` / `authorityBoundedByOrigin` | Downstream authority is bounded by origin authority. No hop can gain a privilege absent from `C0`. |
| `continuityOriginBinding` | The last hop is linked back to the origin through the composed chain of single-hop relationships. |
| `authorizationRule` | On a valid decreasing chain, the authority available at the end is exactly the final carried context. |
| `droppedAuthorityIsLost` | Once a privilege is removed on a branch, it cannot reappear later on that branch. |
| `popAdmitsAuthorityMixing` | Possession-only authorization permits an executor to choose unrelated authority it happens to hold. |
| `cannotIndividuate` | A possession-based policy cannot distinguish two uses of the same privilege that come from different lineages. |
| `anyResolutionReintroducesContinuity` | If a policy can distinguish those two uses, it is reading lineage information, so it has become continuity-aware. |
| `possessionDelegationSafetyTradeOff` | A system cannot simultaneously keep lineage-invariant possession, allow authority mixing, and guarantee confused-deputy safety. |
| `confusedDeputyImpossible` | In a valid PIC execution, the confused-deputy condition is not representable as valid model behavior. |
| `heterogeneousSafety` | If systems use different operation vocabularies, safety is relative to monotone policy translations between them. |
| `concreteAcceptance_implies_PoC` | A concrete verifier that satisfies the required relationship checks refines to the abstract `PoC` model. |

## What Lean does not claim

Lean proves the mathematical model and the logical shape of the refinement.
It does not prove the cryptographic security of a concrete SD-JWT issuer,
runtime, COSE encoding, key-management deployment, or attestation system.
Those are implementation assumptions and protocol-verification concerns.

## Verify it

```bash
cd draft/0.1/pic-model-math/pic-lean
lake build
```

To print the demonstration mapping from paper results to Lean declarations:

```bash
lake exe pic_verification
```
