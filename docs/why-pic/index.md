---
sidebar_position: 1
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Why PIC

**Provenance Identity Continuity (PIC) has its roots in distributed systems.** Its core idea is simple: under a threat model in which execution cannot
be trusted to select authority correctly, propagated authority should be accepted only through a **verifiable
execution relationship** — not merely because a credential is valid and possessed.

## The practical problem

The problem that led to PIC first appeared in stream processing. In an **Apache Kafka** pipeline, authority had to be
propagated to a *consumer that was not yet known*. Passing a bearer access token through the stream looked natural,
but the consumer might not yet exist, might receive the message after the token had expired, or might not hold the
key required to decrypt it.

In that architecture the practical workaround was to give the consumer **its own credentials**. That solved the
delivery problem, but introduced a different risk: a consumer serving many requests could hold *broader authority
than any single request required*, leaving application code to choose which authority to use. A defect, a
compromise, or an incorrect association could then cause **valid authority to be used in the wrong execution
context**.

## What the problem revealed

The first conclusion — that the conventional bearer access token was itself the problem — was too broad.
**Bearer-token protocols work correctly within their stated scope and threat model.** What that architecture
required was an *additional property* which the flow in use did not establish: a **receiver-verifiable relationship**
between propagated authority and the execution for which it was granted.

### The missing property at a glance

| Question | Why it matters |
| --- | --- |
| Is the credential valid? | Necessary, but **not sufficient**. |
| Who possesses it? | Possession does not establish *which execution* it belongs to. |
| Which execution may continue? | This is the **Authority Continuity** question. |
| What should the receiver verify? | A specific, **request-bound**, **non-expansive** continuation under the applicable verification rules. |

## Why this matters for AI agents

An AI agent may hold several valid permissions at the same time. The security question is not only whether those
permissions are *authentic*, but whether the authority selected for the next action is **validly attributable to the
execution being continued**.

Under this threat model, **delegation alone reaches its limit at the moment of choice**. Delegation transfers
permissions and constraints, but it does not prove that an untrusted executor selected the *correct* authority for
the current task.

:::tip The question a receiving boundary must be able to answer

> *"Can this execution prove that it is a valid continuation of the authority and request it received?"*

A receiving boundary should accept **only a verifiable continuation**. That is **Authority Continuity**, and PIC is
one proposed construction for it.

:::

## The governance of choice

Distributed systems teach that unavoidable trade-offs should be made *explicit*. In agentic authorization, three
concerns interact: **authorization protocol**, **freedom of choice**, and **supervised choice**.

<ThemedImage
  alt="The governance of choice: a non-negotiable authorization protocol, freedom of choice maximized safely, and supervised choice used when needed"
  style={{width: '100%', maxWidth: '860px', display: 'block', margin: '1.75rem auto'}}
  sources={{
    light: useBaseUrl('/img/why-pic/governance-of-choice-light.svg'),
    dark: useBaseUrl('/img/why-pic/governance-of-choice-dark.svg'),
  }}
/>

PIC addresses the **authorization-protocol** part of this trade-off by *removing authority selection at that layer*
and converting it into a **verifiable proposal** that the receiving boundary can accept and use to permit the
continuation.

Product and user-experience design must govern the remaining choice between **safe autonomy** and **human
supervision**. The goal is to preserve as much freedom as can be *verified*, escalating to the user only when a safe
continuation cannot be established.

## An ontological shift

PIC changes the role of delegation. Instead of delegating the authority to make an *unconstrained choice*, it allows
the executor to **propose a continuation**. The receiving boundary then verifies whether that proposal is among the
permitted options, and whether it preserves the required relationship with the authority and execution being
continued.

| | Delegation alone | With PIC |
| --- | --- | --- |
| **The executor's act** | *"Choose which authority to use."* | *"Propose a continuation that the next boundary can verify."* |
| **Who decides** | The executor, internally | The **receiving boundary** |
| **What is trusted** | That selection was performed correctly | Nothing — the proposal is **verified** |
| **What is checked** | The credential is valid and possessed | The continuation is *admissible*, *request-bound*, and *non-expansive* |

:::info The executor may propose — the boundary decides

The receiving boundary decides whether the proposal is admissible under the applicable **policy**, **authority
constraints**, and **verification rules**. Authority may only be *preserved* or *attenuated*, **never expanded**.

:::

## A practical illustration

AI agents can hold and use multiple credentials across different tasks and execution contexts. The security question
is not only whether a credential is valid, but whether **its use is validly attributable to the execution currently
being continued**.

An agent holding credentials for two tenants, two customers, or two workflows is one incorrect association away from
acting with authority that is entirely valid — and entirely unrelated to the request it is serving. No credential
check detects that: both credentials are authentic, and both are legitimately held. Only a **continuation check** —
one that binds the authority to the execution it came from — can distinguish them.

## The threat model

None of the above is an absolute claim. It holds under a stated perimeter: **transport is untrusted**, **execution is
untrusted and has no required global mediator**, **executions may overlap or retain state**, the **successor may not
exist yet**, and a receiver must be able to **reject a state that validates but does not belong to the execution being
continued**.

That perimeter — and the receiving requirement it produces, *execution-context non-mixing* — is stated in full on its
own page.

> **[Read the threat model →](./threat-model.md)**

## The scope, stated

PIC addresses the **authorization protocol** by requiring a *verifiable continuation* instead of relying on the
executor's internal authority selection. The boundary of that claim is part of the model, not a caveat added to it.

| PIC establishes | PIC does not claim |
| --- | --- |
| Propagated authority is accepted only as a **verifiable continuation** of the execution it came from | That an executor's **subjective intent** can be proven |
| Authority is **preserved or attenuated** across a hop, never expanded | That an executor's **internal behavior** is correct |
| The **receiving boundary** decides admissibility, not the executor | That any given **implementation or deployment** is secure |

:::tip Define the threat model first — then evaluate the complete system against it

Whether a given architecture satisfies **Authority Continuity** is for its designers to assess. PIC makes that
property **explicit**, and establishes it under its stated model, assumptions, and verification rules.

:::

## Keep reading

The problems behind all of this are treated separately, in order:

- **[The Threat Model](./threat-model.md)** — the perimeter every other claim in this section is relative to: what
  the security argument is *not* permitted to assume.
- **[The Authority Propagation Problem](./authority-propagation.md)** — how authority is created by a permissioned
  entity at a **specific origin** and propagated, only narrowing, through a causal chain of executors.
- **[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)** — the temporal dimension: authority
  is emitted toward a successor that *does not exist yet* when its predecessor acts.
- **[The N+1 Invalid State Problem](./authority-mixing.md)** — executor *n+1* can judge only the state it receives,
  so the protocol must guarantee that *n* can never hand it an **invalid state that validates**.
