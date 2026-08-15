---
sidebar_position: 1.5
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# The Threat Model

Every claim PIC makes is relative to a threat model. This page states that model **before** the problems it gives rise
to, because a security property can only be evaluated against a declared perimeter.

:::note This model is stated, not universal

The threat model below is the one PIC is defined against. It is **not** presented as the only valid model for every
distributed system. A protocol may legitimately address a different perimeter — the question is always whether the
required property is *internal* to the acceptance construction being examined, or delegated to assumptions outside
it.

:::

## What "untrusted execution" means here

An executor is treated as **untrusted** when the security argument is *not permitted to assume* that its internal
behavior will preserve correct request-to-authority attribution. That may include defects, compromise,
non-deterministic authority selection, retained state, or execution across boundaries that do not themselves prove
which request an authority state belongs to.

This classification concerns **what the proof may assume**. It is not an allegation about any particular executor or
implementation. An executor may in fact behave perfectly; the model simply refuses to use that internal correctness
as the *evidence presented to the next boundary*.

## The five elements

| Element | Meaning in this model |
| --- | --- |
| **Transport is untrusted** | Channel location, routing, or possession of an artefact is not proof that the authority belongs to the execution being continued. |
| **Execution is untrusted, with no required global mediator** | The executor's internal choice is not accepted as proof of correct attribution, and the model does not require a separate globally trusted component to separate every execution step. A conforming receiving boundary still performs trusted protocol verification and enforcement. |
| **Execution may overlap or retain state** | Independent requests and authority contexts may coexist, interleave, or remain available after an earlier step. Concurrency is the principal operational case, but retained state can create the same attribution question sequentially. |
| **[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)** | A concrete successor occurrence may not exist or be identifiable when authority is originated. Eligibility may be defined in advance; the concrete successor is evaluated when it materializes. |
| **[The N+1 Invalid State Problem](./authority-mixing.md)** | A receiver must reject a successor state that expands the authenticated predecessor context, or that presents authority from one execution as a valid continuation of another. The executor's own selection is not the proof of that attribution. |

These five elements define the perimeter against which a protocol is evaluated. The last two are treated in full on
their own pages — this page states them only as elements of the model.

## Application to long-running AI agents

The model becomes especially visible for a **long-running agent**: one that can serve overlapping requests, retain
authority across time, and select later tools, workloads, services, or agents at runtime.

Such an agent may correctly preserve request-local separation. The threat model simply refuses to use that internal
correctness as the proof presented to the next execution boundary. The receiving boundary must independently evaluate
the authority state it is asked to accept.

:::tip The question is not about expectation

The relevant question is *not* whether the agent is expected to choose correctly. It is whether the **receiver can
verify** that the presented authority belongs to the execution being continued.

:::

## Execution-context non-mixing

One executor may host several distinct execution occurrences. They may share the same principal, the same executor
identity, and overlapping or identical privilege sets while continuing **different requests**.

<ThemedImage
  alt="One untrusted executor hosting two execution occurrences; which authority states are locally attributable and which must not be accepted without a verified execution relationship"
  style={{width: '100%', maxWidth: '880px', display: 'block', margin: '1.75rem auto'}}
  sources={{
    light: useBaseUrl('/img/why-pic/execution-non-mixing-light.svg'),
    dark: useBaseUrl('/img/why-pic/execution-non-mixing-dark.svg'),
  }}
/>

Authority valid for *Execution B* does not become valid for *Execution A* merely because:

- the same executor possesses it;
- both executions belong to the same principal;
- both executions concern the same resource;
- both executions carry the same privileges;
- the artefact is authentic;
- the authority was validly delegated in another context.

The required receiving property is **execution-context non-mixing**:

> Authority presented as the continuation of one execution may be accepted only when its relationship to that
> **concrete execution occurrence** is valid under the applicable receiving predicate.

This is not a sixth element of the threat model. It is the **receiving requirement derived from it** — from untrusted
execution, from overlapping or retained authority state, and from
[The N+1 Invalid State Problem](./authority-mixing.md).

### Occurrence-sensitive, not privilege-set-sensitive

The requirement is sensitive to the *occurrence*, not merely to the privilege set. Two executions may carry exactly
the same authority context without becoming the same execution. Two identical permissions granted within two
different execution occurrences are therefore **not interchangeable**: the permission value may be equal, while the
authorized continuation each use belongs to remains different.

| Two occurrences may share | And still require | Because |
| --- | --- | --- |
| The same principal | Different decisions | The predecessor execution differs. |
| The same resource and operation | Different decisions | The request being continued differs. |
| The same privilege set | Different decisions | Equal privileges do not make one execution the other. |
| The same authentic artefact | Different decisions | Authenticity is not attribution. |

Non-expansion alone therefore cannot distinguish every cross-execution substitution. A complete receiving predicate
must also verify the applicable **predecessor**, **request**, **lineage**, **relationship**, **integrity**, and
**freshness** conditions.

## What follows from the model

Given this perimeter, a receiving boundary cannot rely on the credential, on possession, or on the executor's
assurance that it selected correctly. It must verify a relationship it can check for itself — which is exactly the
property named [Authority Continuity](./index.md).

The main problem pages this model gives rise to are treated separately:

- **[The Authority Propagation Problem](./authority-propagation.md)** — how authority is created by a permissioned
  entity at a **specific origin** and propagated, only narrowing, through a causal chain of executors.
- **[The N+1 Unknown Executor Problem](./n-plus-1-unknown-executor-problem.md)** — the temporal dimension: authority
  is emitted toward a successor that *does not exist yet* when its predecessor acts.
- **[The N+1 Outcome on Unknown Facts](./n-plus-1-outcome-unknown-facts.md)** — the runtime-outcome dimension: a
  concrete option may appear only while the execution is already in flight.
- **[The N+1 Invalid State Problem](./authority-mixing.md)** — executor *n+1* can judge only the state it receives,
  so the protocol must guarantee that *n* can never hand it an **invalid state that validates**.

:::info On the word *protocol*

Throughout this section, *protocol* means **application security protocol**, and more precisely **authorization
protocol**. Authentication, transport, wire formats, runtime isolation, and deployment controls are named separately
where relevant.

:::
