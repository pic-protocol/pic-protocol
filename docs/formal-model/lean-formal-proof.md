---
sidebar_position: 2
---

# PIC Lean Formal Proof

The definitions and theorems of the paper are formalized and
**machine-checked in Lean 4**. The full project lives in the PIC Model
repository:
[`pic-model/draft/0.1/pic-model-math/pic-lean`](https://github.com/ngallo/pic-model/tree/main/draft/0.1/pic-model-math/pic-lean).

The formalization intentionally uses **only Lean core** — no Mathlib
dependency. It contains **no `sorry` and no added axioms**: every result is
fully proved from Lean's kernel logic. As in the paper, the single-hop
relationship evidence `PoR` is abstract (its concrete, e.g. cryptographic,
construction is out of scope), so it enters as a parameter, mirroring the
paper's unforgeability assumption. The project does not prove that a
concrete cryptographic implementation of `PoR` is secure.

## What the proofs say

The core of the model fits in three declarations. A transition between
execution steps is valid iff it is both causally related (`PoR`) and
non-expansive (`C₁ ⊆ C₀`):

```lean
/-- **Definition (Valid transition).** A transition is valid iff it is both
causally related (`PoR`) and non-expansive (`C₁ ⊆ C₀`). -/
def ValidTransition {Step PrivilegeType : Type}
    (PoR : Step → Step → Prop)
    (s₀ s₁ : Step)
    (C₀ C₁ : AuthorityContext PrivilegeType) : Prop :=
  PoR s₀ s₁ ∧ C₁ ⊆ₚ C₀
```

Proof of Continuity holds for a chain iff **every adjacent transition is
valid** — continuity is the transitive composition of relationships:

```lean
/-- **Definition (Proof of Continuity).** `PoC` holds for a chain iff every
adjacent transition is valid: causally related via `PoR` and non-expansive. -/
def PoC {Step PrivilegeType : Type}
    (PoR : Step → Step → Prop)
    (π : Chain Step PrivilegeType) : Prop :=
  ∀ i, i < π.length →
    ValidTransition PoR (π.step i) (π.step (i + 1)) (π.ctx i) (π.ctx (i + 1))
```

From these two conditions, PIC Safety follows: on a valid continuity chain,
**no hop can exercise a privilege absent from the origin authority
context** — a privilege that was not granted at the origin cannot appear
later in the same valid execution chain:

```lean
/-- **Theorem (PIC Safety), chain form.** On a valid continuity chain, no hop
can exercise a privilege absent from the origin authority context. -/
theorem picSafety {Step PrivilegeType : Type}
    {PoR : Step → Step → Prop}
    {π : Chain Step PrivilegeType}
    (h : PoC PoR π)
    (privilege : PrivilegeType)
    (hAbsent : ¬ π.ctx 0 privilege) :
    ∀ k, k ≤ π.length → ¬ π.ctx k privilege
```

The same development also proves the negative results — a possession-based
policy **admits authority mixing** and provably **cannot individuate
occurrences** that share the same privilege but arise from different
lineages — and the headline corollary: **the confused deputy is impossible
under PIC** (`confusedDeputyImpossible`).

## Paper ↔ Lean mapping

| Paper | Lean declaration | File |
| --- | --- | --- |
| Privilege `(o, r) ∈ O × R` | `Privilege` | `Basic.lean` |
| Authority context `C ⊆ O × R` | `AuthorityContext`, `⊆ₚ` | `Basic.lean` |
| **Thm (PIC Safety)** | `authorityBoundedByOrigin`, `noPrivilegeEscalation` (linear form); `picSafety` (chain form) | `Basic.lean`, `Chain.lean` |
| **Def (Proof of Relationship)** | parameter `PoR : Step → Step → Prop`; transitive composition `CausalReach` | `Chain.lean` |
| **Def (Valid transition)** | `ValidTransition` | `Chain.lean` |
| **Def (Proof of Continuity)** | `PoC` | `Chain.lean` |
| **Lem (Continuity implies origin binding)** | `continuityOriginBinding` | `Chain.lean` |
| Authorization rule `⋂ᵢ Cᵢ = C_n` | `authorizationRule`; monotone-decreasing chain `ctxAntitone`; irreversible drop `droppedAuthorityIsLost` | `Chain.lean` |
| PoP semantics, selection function `σ` | `PopAuthorized` | `Possession.lean` |
| **Thm (PoP admits authority mixing)** | `popAdmitsAuthorityMixing` | `Possession.lean` |
| Event `e = (o, r, ℓ) ∈ O × R × 𝓛`, projection `p` | `Event`, `Event.project` | `Projection.lean` |
| **Def (Possession policy)** | `PossessionBased` | `Projection.lean` |
| **Thm (Lineage-invariant policies cannot individuate occurrences)** | `cannotIndividuate` | `Projection.lean` |
| **Thm (Any resolution reintroduces continuity)** | `anyResolutionReintroducesContinuity`, `lineageDiscriminatorExists` | `Projection.lean` |
| **Def (Lineage-invariant authorization)** | `LineageInvariant` (+ equivalence with `PossessionBased`) | `TradeOff.lean` |
| **Thm (Possession–delegation–safety trade-off)** | `possessionDelegationSafetyTradeOff` | `TradeOff.lean` |
| **Cor (Continuity restores confused-deputy safety)** | `continuityRestoresSafety` | `TradeOff.lean` |
| **Def (Origin-bounded authority)** | `OriginBounded`, `poc_originBounded` | `ConfusedDeputy.lean` |
| **Def (Open passthrough)** | `OpenPassthrough`, `openPassthroughImpossible` | `ConfusedDeputy.lean` |
| **Def 1 (Confused deputy)** | `ConfusedDeputy` (restated inside a lineage) | `ConfusedDeputy.lean` |
| **Thm (Confused deputy is impossible under PIC)** | `confusedDeputyImpossible` | `ConfusedDeputy.lean` |
| Heterogeneous operation spaces, `𝒯_{i→i+1}` | `Translation`, `MonotoneTranslation`, `composedTranslation`, `heterogeneousSafety` | `Translation.lean` |

`Main.lean` instantiates the results on the paper's running examples: the
`C₀ = {(convert, doc)}` chain where `(write, doc)` can never be authorized
(`writeNeverAuthorized`), the impossibility of the confused deputy on that
chain (`demoNoConfusedDeputy`), and the forbidden pair of the projection
section — a possession-based policy provably cannot separate the authorized
use from the confused use (`possessionCannotSeparate`), while any policy
that does separate them is provably not possession-based
(`separationRequiresLineage`).

## Verify it yourself

Install [`elan`](https://leanprover-community.github.io/get_started.html),
the Lean version manager, and open a terminal in the `pic-lean` folder. The
`lean-toolchain` file selects Lean 4.32.0 automatically.

```bash
lake build
```

A successful build means **Lean's kernel accepted all proofs**. To run the
demonstration executable, which prints the list of verified results
(paper → Lean names):

```bash
lake exe pic_verification
```
