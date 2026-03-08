---
sidebar_position: 4
---

# The PIC Manifesto

**Authority, not identity, is what makes systems safe**

```text
  CREATE AUTHORITY                          CARRY AUTHORITY
                                                       
  Human  ────┐                               p_0 --> E_1 --> E_2 --> E_3
  AI Agent ────|─> p_0, ops_0       ops_0 ⊇ ops_1 ⊇ ops_2 ⊇ ops_3
  Workload  ───┘                    
                                
  Identity required.                                 Identity not required.
  Someone must own the intent.          Executors prove characteristics.
                                                               Authority must not expand.
```

For many, this discussion started with AI agents. It quickly became clear that the real problem is older, deeper, and not specific to AI.
It is a distributed systems problem we never fully solved. AI agents didn’t create it.
They made it impossible to ignore.

## 1. Identifiers are not the foundation of authority

In real systems, agents are not stable entities.
They are:

- replicated
- rescheduled
- restarted
- re-keyed
- short-lived

A single logical agent can result in thousands of runtime instances and millions of identifiers over time.
Identifiers are useful — for routing, logging, auditing, and debugging.
But they are implementation details.
No human — and no system — can realistically ground trust or authorization on individual identifiers.
The problem is not that identifiers don’t scale.
The problem is that identifiers are the wrong primitive for authority.

## 2. What we actually trust in the real world

In the real world, we do not trust identifiers.
We trust:

- relationships
- authority
- context

A simple example: When I go to a hospital, I don’t ask for the doctor’s personal identifier.
I rely on verified facts such as: “This person is an authorized doctor,
acting under this hospital’s authority, right now.”

That is enough to proceed safely.

If something goes wrong, auditing determines responsibility afterwards.
But trust at runtime does not depend on a persistent identifier.
The same applies to AI agents.

## 3. Identity supports accountability, not authority

You cannot arrest or jail an identifier.

At most, you can hold accountable the authority behind an action:

- the hospital
- the institution
- the owner
- the issuer of authority

With AI agents, this is even clearer:

- the agent itself can never be punished
- only the party behind it can be

Logs and identifiers help after the fact:
to demonstrate diligence or negligence.
They do not solve authorization during execution.
Authorization lives at the level of authority, not identity.

## 4. Context breaks identity-based authorization

Consider context.

A doctor works in two hospitals:

- 08:00–13:00 at St. Thomas
- 14:00–19:00 at St. Peter

At 15:00:

- the doctor’s identity is still valid
- the private key is still valid

But the authority at St. Thomas is not.

If I meet the doctor at 15:00 at St. Thomas, wearing a lab coat, I may trust them — but I shouldn’t. 

Nothing failed about identity. What failed is authority continuity under context. 

Private keys do not enforce context. Identities do not enforce context. 

Authority must stop when context changes.

## 5. Context determines who can create authority

There are cases where the right to act does not come from pre-existing role, skill, or credentials.
A doctor performing a medical act without consent may be committing a crime —
unless there is an emergency.

> In an emergency: even a non-doctor may be authorized to act to save a life
But this does not mean authority appears from nowhere.
The person who acts becomes the origin of authority.
They act under their own responsibility — their identity grounds that authority as its origin.
The emergency context is what makes that authority legitimate, not punishable.
Authority always has an origin.
Context determines who can legitimately become that origin, and under what conditions.
This proves that identity alone cannot be the foundation of authorization —
because the same identity, in a different context, carries different authority.

## 6. Trust without active identity

Consider another everyday case.
A former patient recognizes a doctor outside the hospital and asks for advice.
The doctor may still give medical guidance.

The patient trusts the doctor not because:

- an identity is being presented
- a credential is being verified at that moment

but because of:

- a prior relationship
- remembered behavior
- contextual understanding

Again:
trust and authority arise from relationship and context, not from an active identifier.

## 7. Human-originated authority vs agent-originated authority

This leads to a critical distinction.
When authority originates from a human:

- the authority belongs to the human
- executors (services, workloads, agents) do not need identities
- they must prove they are a valid continuation of that authority

What matters is continuity, not executor identity.
An executor must demonstrate characteristics — attributes, environment, context — that satisfy the continuity requirements. Whether it does so via identity credentials, hardware attestation, or any other verifiable mechanism is an implementation choice, not a model requirement.
This is not a preference or opinion.
It follows from a formal model.

When authority originates from a non-human agent:

- the agent is expressing its own intent
- now identity is required
- identity is needed to ground responsibility and governance

So:

- Identity is required to **create** authority
- Continuity is required to **carry** authority

Confusing these two cases is exactly how we created:

- confused deputy
- privilege escalation

## 8. Signature does not equal authority (legal analogy)

A signature can be cryptographically valid —
and still be legally void.

A manager may have a valid signing key, but:

- not for that contract
- not for that amount
- not under that mandate

The key is valid.

The authority is not.

This is a perfect analogy for distributed systems: cryptographic validity does not imply legitimate authority.

## 9. Access badges and Zero Trust (physical analogy)

A badge can open a door — but not every door, not at every time, not in every situation.

The badge (identity) remains valid.

Access (authority) changes continuously.

In an emergency, access rules change without changing identity. Authority depends on context, not identity.

## 10. Cloud IAM exposes the same flaw

In cloud systems:

- workload identities can be valid
- tokens can be valid

Yet the same workload, with the same identity, in a different context:
should not have the same authority.

Today:

- authority is bound to possession of tokens
- not to continuity of execution
This is why confused deputy and escalation persist:
the primitive is wrong.

## 11. Why policy and configuration are not enough

Policies, configuration, and trace analysis are useful.
But they rely on trusting:

- configuration
- environment
- enforcement points

In open, distributed systems, these assumptions do not hold.
PIC takes a different path.
It encodes authority continuity as a verifiable structural invariant.

By construction:

- authority can be continued
- restricted
- terminated

but never expanded.

This is not policy compliance. This is structural enforcement.

Policies describe what should happen. Continuity proofs constrain what can happen.

## 12. Structural enforcement beats behavioral monitoring

Runtime safety must be structural, not behavioral.
Safety comes from what a system is able to do,
not from predicting what it might do.

Formal methods are best used to prove invariants:

- continuity
- monotonicity
- non-expansion

Monitoring remains valuable — but for observability and forensics, not as the safety foundation.

In short:

- enforce what must never be possible

- monitor what actually happens

- that separation is what scales.

## 13. This is not an AI problem

None of this started with AI.
PIC comes from distributed systems theory and applies everywhere.

AI agents simply remove:

- the perimeter
- the synchrony
- the assumptions we used to hide behind
They didn’t create the problem.
They made it impossible to ignore.

## Closing

Society already understands authority, context, and continuity.

Our systems don’t — because we modeled the wrong primitives.

PIC is not a new protocol. **It is a correction of the model**.

When authority is continuous and monotonic, entire classes of failures disappear, not because we detect them, but because they are no longer expressible.

> **Authority is a continuous system.**
> **Proof of Continuity** is a new security primitive that enables this continuity.
> Continuity is proven through relationships, not possession.
> **Proof of Possession** is one way to establish a relationship, but it is not the only one.
> **Proof of Continuity** introduces a new ontology of authority, formally defined and provable.

That’s the shift.
