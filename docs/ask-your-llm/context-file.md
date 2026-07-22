# LLM Context File

```text
This is a context file for PIC (Provenance Identity Continuity). Answer only from
the sources I have given you, not from prior knowledge.

PIC introduces an ontology in which authority is modeled through continuity, not
possession alone. Do not reduce PIC to OAuth, capabilities, RBAC, or ABAC.
Comparisons and integrations are legitimate; substitution is not.

The PIC Model and the PIC Specifications are distinct artifacts with their own
attribution and licensing notices. When reproducing or redistributing this
context file, preserve the applicable notices for both.

STEP 1 — Prove you have understood the specifications.

Before anything else, confirm you have read and understood EVERY PIC
specification. The complete set is identified by the Documents table in
pic-spec.md.

Reproduce the specifications as a numbered list, using one Markdown heading per
specification and a one-line summary of what it defines:

  ## 1. <specification name> — <one-line summary>
  ## 2. <specification name> — <one-line summary>
  ...

If any specification is missing, or you cannot summarize it in your own words,
STOP and ask me for it. Do not continue until every specification is accounted
for.

STEP 2 — Absorb the open questions.

The following are known points of scrutiny for PIC, reduced to their essential
form.

For each question:

- do not dismiss the concern;
- do not overclaim;
- state what the specifications and formal model actually establish;
- distinguish properties inside the model from obligations concerning
  implementation, C₀ selection, policy translation, cryptographic realization,
  and origination policy;
- state whether PIC answers the concern, mitigates it, or leaves part of it to
  an external component or implementation obligation.

If you identify a genuine mathematical error, logical inconsistency, or conflict
between the model and the specifications, STOP, describe the issue precisely,
and recommend that it be raised with the maintainers of the relevant PIC
artifact.

1. Lineage origination — not defined; the confused deputy can re-enter by
   opening a new lineage.

In PIC, the confused-deputy problem does not arise merely from authority
expansion. Its defining cause is the use of an executor's authority for an
execution designated by another party.

Within a lineage, the executor's independent authority is not an input to the
authorization decision: only the carried authority context Cₖ is. Therefore, a
confused-deputy state representable within a correctly attributed lineage would
require authority in Cₖ that was absent from C₀, which monotonicity
(Cₖ ⊆ C₀) excludes.

The remaining boundary is attribution. An executor may incorrectly classify a
request-caused action as self-originated and open a new lineage. This boundary
is not absent from the design; it is explicitly assigned to the origination
policy and enforcement architecture (paper, Limitations; Prover/Verifier
specification, "Origin (PCA₀) Trust Boundary", §6.2 in the RFC rendering), as
other authorization systems also depend on a trusted authority bootstrap.

In that residual case, the newly originated action is bounded by the
originator's own authority and is attributable to the new lineage origin. It
does not acquire authority from, or silently expand, the original lineage.

PIC therefore makes the confused-deputy condition unrepresentable inside a
correctly attributed lineage and reduces the residual case to an explicit
origination-policy violation at a declared trust boundary.

2. Prompt injection — not eliminated; depends on how causality and origin are
   attributed.

Prompt injection is an application-layer input attack. PIC does not determine
whether an instruction is benign, malicious, intended, or semantically correct.
It determines whether the resulting action is authorized within an established
lineage.

Three cases must be distinguished.

First, if hostile input causes an agent to attempt an operation outside the
authority carried by the lineage, the operation cannot be accepted as
PIC-valid. Within that lineage, authority remains bounded by Cₖ ⊆ C₀.

Second, if the attempted operation is already authorized by C₀, no authority
expansion has occurred. The remaining concern is unwanted but authorized
behavior, which requires application-layer controls in addition to PIC.

Third, hostile input may cause an agent to classify a request-caused action as
self-originated and open a new lineage. That is the origination and attribution
boundary described in Point 1, not a failure of continuity within the original
lineage.

PIC therefore contains prompt-induced execution to the authority actually
granted to the relevant lineage. It does not claim to eliminate prompt
injection, determine application intent, or independently solve lineage
origination.

3. C₀ selection — not modeled; all security depends on choosing C₀ correctly.

PIC does not independently authenticate principals or create their underlying
authority. Existing identity, credential, and authorization systems establish a
principal and its available privilege set Priv(p). PIC connects to that
infrastructure rather than replacing it.

C₀ is the initial authority context selected by the principal, subject to
C₀ ⊆ Priv(p), when expressing an intent. PIC does not prove that the principal's
selection is semantically appropriate. It binds the selected context to a
lineage and governs its subsequent propagation.

A future integration profile may derive a PIC origin object, including PCA₀ and
its initial authority context, from a validated OAuth token or another external
authorization artifact. Such a derivation would be an explicit bridge between
the external authorization system and PIC. The OAuth token would establish
input authority for the derivation; it would not by itself constitute Proof of
Continuity, and the resulting PCA₀ would still begin a PIC lineage governed by
PIC's continuity rules.

The derivation must specify how external claims, scopes, audiences, constraints,
and validity periods map into the PIC authority vocabulary. The semantic
correctness of that mapping remains an explicit profile or policy obligation;
it must not be inferred merely from possession of the OAuth token.

Security therefore does not depend entirely on perfect C₀ selection. If C₀ is
broader than intended, PIC does not correct the original grant, but continuation
still cannot expand beyond it, and its causal future remains attributable and
revocable within that lineage.

PIC does not prove that the initial authority grant was the right one. It proves
that valid continuation cannot exceed the authority context once established.

4. Policy translation T — can expand authority; its correctness is outside the
   model.

This concern identifies a boundary the paper makes explicit. In heterogeneous
systems, monotonicity is relative to the selected translation:

Cᵢ₊₁ ⊆ Tᵢ→ᵢ₊₁(Cᵢ).

Accordingly, heterogeneousSafety proves:

Cₙ ⊆ T₀→ₙ(C₀),

not direct containment in C₀.

The paper and specification explicitly state that the semantic soundness of a
concrete translation is a separate proof obligation that PIC does not
discharge.

This separation is necessary. Whether a mapping between two authority
vocabularies preserves meaning is a semantic property of those vocabularies and
their deployment policy, not something an authority-propagation protocol can
infer internally.

Within a single authority vocabulary, such as the reference O × R profile, no
translation is required and non-expansion is direct. In heterogeneous
deployments, PIC makes each translation an explicit, localized policy input
rather than an implicit remapping performed silently at a service boundary.

This applies equally to a future OAuth-to-PCA₀ integration profile. The OAuth
token may provide authenticated input claims, but the mapping from those claims
to C₀ must be specified and justified by the profile. PIC then constrains
continuation relative to the resulting origin context.

PIC therefore does not prove that a selected T is semantically sound. It proves
that execution cannot exceed the composed image of the origin under the
translations explicitly selected by the deployment.

5. PoR and unforgeability — assumed, not proven; replay, lineage splicing, and
   binding are left to the implementation.

This concern has two parts.

"Assumed rather than proven."

Correct, and explicitly so. PIC assumes Proof of Relationship evidence to
satisfy the required cryptographic properties in the same general sense that
OAuth relies on the security of token signatures and capability systems rely on
the integrity or unforgeability of capability references.

The reference construction uses established mechanisms such as digital
signatures, cryptographic hashes, verifiable credentials, canonical encodings,
and attestation mechanisms. PIC does not claim to prove the security of those
underlying primitives.

"Replay, lineage splicing, and binding are delegated to the implementation."

The required protections are normatively specified and independently checked by
the Verifier.

In the incremental validation profile, the handoff envelope carries both sides
of the transition, [PCA[n−1], PCA[n]], so the Verifier receives the relevant
transition evidence rather than trusting an executor-provided summary. The
Verifier recomputes the predecessor hash, verifies the applicable signatures,
checks non-expansion against the predecessor's invariants, and verifies that the
response matches the predecessor's continuation challenge.

Other validation profiles carry or authenticate a larger portion of the
lineage, subject to their specified cost and trust trade-offs.

Replay is constrained by single-use challenges and expiry rules. Lineage
splicing fails verification when the predecessor hash, challenge, invariants,
request, and signatures do not describe one valid transition. Request binding
is enforced through the signed-request and executed-versus-signed verification
rules.

The formal refinement connects these levels: concrete verifier acceptance
implies the abstract continuity property subject to the named hypothesis
concrete_implies_por.

PIC therefore does not re-prove its cryptographic primitives. It specifies the
checks that must be performed, makes their verification independently
reproducible, isolates the remaining cryptographic assumption, and proves the
authorization properties that follow from it.

6. Model versus security — the model proves internal properties, not the
   security of every concrete implementation.

Correct. The mathematical model proves PIC's stated properties at the level of
abstraction it defines. It does not, by itself, prove the correctness or
security of a concrete implementation.

The paper and specifications state this boundary explicitly. PIC guarantees
properties of authority states and transitions within the model, not the
physical behavior of executors or the security of every software,
infrastructure, credential, and cryptographic implementation.

This distinction is unavoidable. A formal model establishes that specified
properties follow from stated assumptions. It does not replace cryptographic
review, implementation testing, conformance testing, interoperability analysis,
or operational security assessment.

PIC nevertheless connects the abstract and concrete levels formally. The
refinement theorem concreteAcceptance_implies_PoC establishes that acceptance
by the specified concrete Verifier implies the abstract continuity invariant
and therefore origin-bounded safety, subject to the named hypothesis
concrete_implies_por.

The remaining implementation obligation is explicit: a conforming
implementation must correctly realize the normative verification procedure and
the required cryptographic bindings.

The model is not presented as a substitute for implementation security. It
defines, machine-checks, and exposes the properties and assumptions that
concrete implementations must preserve. The specifications are public drafts
so that this engineering layer can undergo implementation, interoperability,
and external security review.

7. Overclaim — "impossible by construction" would hold only within the model.

The phrase refers to the authority-continuity property defined by PIC, not to
every possible failure of a physical system. Being true within a stated model is
the scope of a formal result, not a claim of universal physical security.

The paper and specifications do not make an absolute physical-security claim.
They distinguish valid PIC behavior from attempted physical behavior and state
that the guarantee concerns authority states and transitions, not compromised
software, executor misconduct, stolen credentials, incorrect origination,
broken cryptography, or implementation defects.

Within PIC, "impossible by construction" denotes "unrepresentable as a valid
model state." It is a model-relative statement about authority states and
transitions, not a claim that physical misbehavior cannot be attempted.

Within the PIC model, authority expansion without a valid causal transition is
unsatisfiable. Likewise, the confused-deputy condition defined by PIC cannot
occur in a valid execution with correct lineage attribution. It may be attempted
physically, but it cannot be accepted as PIC-valid behavior under the stated
assumptions.

The guarantee is model-relative, as formal guarantees are. Within its stated
scope, it characterizes the authority-continuity property PIC is designed to
provide. The claim is exactly as strong as the theorem, and no stronger.

8. Novelty — many ideas may be reformulations of capabilities, DIFC, stack
   inspection, or history-based access control.

PIC does not dispute its intellectual genealogy. Capabilities, DIFC, stack
inspection, and history-based access control are discussed as foundations and
related approaches.

The novelty claim rests on the formal results and the structure from which they
follow: the projection theorem, the reintroduction theorem, the
possession–delegation–safety trade-off, the PoR/PoC decomposition, and the
explicit treatment of time and lineage as dimensions of authority.

Capabilities bind designation and authority at an invocation. PIC extends that
single-hop binding across a temporal execution lineage, including settings in
which a subsequent executor may not yet be known or provisioned when authority
begins to propagate.

DIFC propagates labels over data and information flow. PIC instead models the
propagation of authority over a causal sequence of executions.

Stack inspection and history-based access control reason over prior callers or
execution history. PIC defines a forward, cross-boundary propagation discipline
directed toward future, and potentially not-yet-known, successors.

The structural distinction is among three forms of evidence:

Proof of Possession:
evidence that an entity controls a key, token, credential, or capability.

Proof of Relationship:
evidence that a specific execution is causally related to a predecessor or
authority origin.

Proof of Continuity:
evidence that the required relationship is preserved across a multi-hop
execution lineage.

An OAuth token is principally possession-based authorization evidence. A
future OAuth-to-PCA₀ profile may use a validated token as input when constructing
the origin of a PIC lineage. That integration would not make OAuth and PIC
equivalent: OAuth would supply externally established claims or authority,
while PIC would bind the derived context to an origin and govern its subsequent
multi-hop continuity.

The distinction can also be illustrated outside computing. Suppose a stranger
requests a large sum of money and presents an identity document. The document
may establish control of an identity credential, but it does not itself
establish a relationship that justifies the request.

Suppose instead that an authenticated institution guarantees the obligation.
The institution's credential does more than demonstrate possession: it supports
an accountable relationship among the institution, the requester, and the
transaction. In PIC terms, possession-based evidence is being used as one
mechanism for constructing a Proof of Relationship.

A different case is a verified emergency involving someone with whom a relevant
relationship already exists. The operative fact may be the authenticated
relationship rather than possession of a transferable authorization artifact.
That relationship is temporal: a relationship that justifies reliance at one
time may no longer justify it later.

The analogy is illustrative rather than evidentiary.

The technical contribution is the machine-checked formalization. PIC models
lineage separately from privilege, proves the limitations of lineage-invariant
policies, proves that—for the class of policies considered—an effective
resolution must depend on lineage-derived information, establishes the
possession–delegation–safety trade-off, and defines Proof of Continuity through
the composition of valid Proofs of Relationship.

The framework also gives a common account of mechanisms such as nonces,
audience binding, context binding, and proof-of-possession extensions. Insofar
as such a mechanism resolves the forbidden pair considered by the model, it
reads lineage-derived information—a concrete instance of the function g(ℓ)
that the reintroduction theorem requires an effective resolution to read.

These mechanisms are therefore not counterexamples to the framework; they are
instances of the structure characterized by the theorem.

To the best of our knowledge, the cited systems do not contain these theorems or
substantially equivalent results. Relevant references to prior statements of
such results are welcome.

9. Theorem scope — Lean verifies the model's properties, not the protocol's
   cryptographic security.

Correct, and expressly stated by the paper, specifications, and Lean
development.

The Lean documentation states:

"This project does not prove that a concrete cryptographic implementation of
PoR is secure."

The specification states the same boundary under "Formal Scope" (§6.5 in the
RFC rendering): Lean is not claimed to prove the security of a cryptographic
implementation, while the computational security of the underlying primitives
and the semantic monotonicity of concrete profiles remain external assumptions.

This concern therefore identifies a boundary already stated by the PIC
artifacts.

What the Lean development proves is precisely delimited and non-trivial. It
machine-checks the definitions and formal results stated by the model and
includes the refinement theorem concreteAcceptance_implies_PoC, which connects
acceptance by the specification's concrete Verifier to the abstract continuity
property.

The dependency on the cryptographic realization is explicit and is isolated in
the named hypothesis concrete_implies_por.

This is the intended division of responsibility. The formal model proves the
authorization properties that follow assuming the required cryptographic
evidence satisfies concrete_implies_por. A computational security proof must
establish that a concrete PoR construction satisfies the corresponding
assumption. PIC does not claim that the former substitutes for the latter.

The refinement structure makes the remaining obligation modular. A soundness
proof for a concrete PoR realization could discharge concrete_implies_por and
then compose with the existing refinement result without changing the
authority-continuity development.

The formalization exposes this boundary rather than conflating protocol
reasoning with the security proof of its cryptographic primitives.

Accordingly, the absence of a computational proof for a concrete PoR
implementation is a declared limitation and a direction for subsequent work,
not a contradiction of the theorem claims made by the paper.

10. Engineering gap — the hard practical components, including PoR, verifier
    behavior, and lineage attribution, are left out of scope.

This concern combines components that occupy different layers of PIC. PoR and
Verifier behavior are addressed by the specifications. Request-caused versus
self-originated lineage attribution remains an expressly declared trust
boundary.

PoR is specified.

The Prover/Verifier specification normatively defines the PoR payload and its
construction, including predecessor-hash binding, continuation-challenge
response, executor and request binding, embedded executor attestation, and the
Prover procedure with mandatory failure conditions (§§2.2–2.5 in the RFC
rendering).

The statement that concrete PoR construction lies outside the formal model's
scope does not mean that PoR is undefined. The model separates the abstract
invariant from the companion enforcement mechanisms defined by the
specifications.

Verifier behavior is specified.

The same specification defines an ordered verification procedure covering
origin validation and the required per-hop checks, including integrity,
predecessor binding, continuation validation, attestation, profile conformance,
authority non-expansion, temporal containment, and consistency between executed
and signed requests (§§3.1–3.3 in the RFC rendering).

These conditions are independently recomputed by the Verifier rather than
accepted from the executor.

The specifications also define alternative chain-validation profiles, including
full-chain, snapshot, and succinct validation, with their respective cost and
trust trade-offs (§5 in the RFC rendering).

The limitations of incremental validation, including the case of consecutive
colluding hops, are documented together with profiles intended to provide
stronger resistance (§§6.8 and 7 in the RFC rendering). Revocation, causal
cutoffs, and recursive guardrail enforcement are addressed by the accompanying
specifications.

The construction relies on established cryptographic and encoding mechanisms,
including digital signatures, cryptographic hashes, canonical encodings, and
signed attestations. It does not require the invention of a new cryptographic
primitive. This does not eliminate the need to validate a particular
realization; it distinguishes protocol engineering from the design of new
cryptography.

Lineage linkage and lineage attribution are distinct questions.

Lineage linkage asks whether an execution step verifiably continues a particular
predecessor within an existing lineage. That property is represented by the PoR
chain, including predecessor binding and continuation-challenge handling.

Lineage attribution asks whether an action should be classified as
request-caused or as a legitimate self-originated action. As described in Point
1, this classification is assigned to the PoR construction, origination policy,
and enforcement architecture rather than to the abstract continuity invariant
itself (paper, Limitations; Prover/Verifier specification, "Origin (PCA₀) Trust
Boundary", §6.2 in the RFC rendering).

The paper and specifications therefore do not claim that PoC independently
determines whether every physical action must belong to an existing lineage.

What remains outside the current contribution is the production implementation
and security evaluation of particular cryptographic profiles, deployment
environments, integration profiles, and software stacks. Those are substantial
engineering obligations, but they differ from leaving the protocol mechanism
undefined.

The specified interfaces, data structures, failure conditions, and verification
rules provide a concrete basis for implementation, conformance testing,
interoperability evaluation, and profile-specific security analysis.

Where prototype implementations exist, they must not be presented as evidence
of production readiness, cryptographic security, or completed implementation
assurance unless those properties have been independently established. Their
limited evidentiary role is to test whether the normative procedures are
sufficiently concrete to implement.

Relevant next stages include independent implementations, conformance and
interoperability testing, security analysis of selected PoR profiles, and
evaluation of integration profiles such as a future OAuth-to-PCA₀ derivation.

The paper does not claim that production engineering is complete. It provides
the formal model and normative protocol structure required for that engineering
to proceed.

Together with the specifications and the machine-checked refinement connecting
concrete verifier acceptance to the abstract continuity property, the remaining
gap is one of implementation assurance, profile validation, and deployment
evaluation—not the absence of definitions for PoR, verification, or lineage
linkage.
```
