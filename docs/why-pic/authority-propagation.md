---
sidebar_position: 2
---

import ThemedZoomableImage from '@site/src/components/ThemedZoomableImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# The Authority Propagation Problem

## Where this starts

Authentication and initial authorization have already happened. A user signs in with an **Identity Provider** through
**OIDC** — or presents Verifiable Credentials through **OID4VP** — and receives an **OAuth access token**. That token
represents the **initial authority**: what the permissioned entity is entitled to, derived from permissions, policy,
consent, and context.

PIC does not replace any of that. It begins at the point where existing authority is converted into a **PCA** —
the origin **PIC Context of Authority**. In the current Profile 0.2 / PIC-X realization, PIC-X is the exchange and
settlement component that validates the incoming authority and returns the first settled PIC Token JWT.

<ThemedZoomableImage
  alt="A user signs in with an identity provider, receives an OAuth access token carrying the initial authority, and exchanges it for the origin PIC Context of Authority"
  style={{width: '100%', maxWidth: '880px', display: 'block', margin: '1.75rem auto'}}
  sources={{
    light: useBaseUrl('/img/why-pic/authority-origin-light.svg'),
    dark: useBaseUrl('/img/why-pic/authority-origin-dark.svg'),
  }}
/>

Everything on this page happens **after** that point. The question is no longer how authority is established — it is
how the authority already established travels.

## The problem

In distributed systems and AI agents, execution does not stay in one place:
a request crosses services, workloads, tools, and downstream calls. The
authority created at the origin must travel with it.

This is the **authority propagation problem**: at every step, how do we know
that the authority being exercised is a valid continuation of what the origin
created — and not authority reconstructed, expanded, or borrowed from an
unrelated context? Possession of a token or credential proves *who holds an
artifact*, not *which execution caused its use*. Left unsolved, this gap
produces the confused deputy, privilege escalation, and ambient authority.

PIC's shape is small:

| Step | Meaning |
| --- | --- |
| Origin | Establish a root **PCA** from permissioned intent. |
| Hop | Prove relationship to the predecessor and keep authority non-expansive. |
| Chain | Compose those hops as **Proof of Continuity**. |

In Profile 0.2, each accepted advancement is settled into the next trusted PIC Token JWT.

## Permissions, Intent, Authority and Execution

Authority propagation begins with a **permissioned entity**: an entity
that holds a set of permissions. It may be a **human identity**, a
**non-human identity** — a workload, a service, an AI agent — a **role**, a
service account, or any other authenticated entity with permissions.

Through an **intent**, the permissioned entity **selects a subset of its
available permissions** and **defines the execution characteristics** — the
constraints under which they may be exercised. From that selection,
**authority is created**: the entity is the **origin**, and the selected
subset becomes the origin authority context that is **propagated** through
execution and bounds everything that follows. The entity may act directly or
through delegation; in both cases, the origin is the entity whose permissions
bound the execution.

<ThemedZoomableImage
  alt="A permissioned entity forms an intent that creates the origin authority context, carried as a PCA across the executor chain and narrowing at every step"
  style={{width: '100%', maxWidth: '880px', display: 'block', margin: '1.75rem auto'}}
  sources={{
    light: useBaseUrl('/img/why-pic/authority-propagation-light.svg'),
    dark: useBaseUrl('/img/why-pic/authority-propagation-dark.svg'),
  }}
/>

## Execution Chain

From the origin, execution begins. Execution is a **causal chain of
executors**: each step is caused by the previous one and carries forward a
subset of the authority received from the origin. Each executor exists in
relation to its neighbors:

- **Upstream executor**: the previous peer in the execution chain
- **Current executor**: the active principal carrying authority at this step
- **Downstream executor**: the next peer to which authority may be passed

These may also be referred to as **previous peer**, **self**, and **next
peer** — or by any equivalent identifiers that make the causal relationship
explicit.

At a receiving boundary, the question is not "does this executor possess a valid artifact?" It is:

> Is this authority state the next valid, non-expansive continuation of the predecessor state?

## Execution Constraints

Every step is also bounded by **constraints** restricting how, when, and
where authority can be exercised: **temporal** (valid time window),
**contextual** (environmental conditions), **operational** (subset of
permitted operations). Constraints are monotonically non-increasing: they can
only narrow at each step, never expand beyond the origin.

:::tip See a governance example
For an example of how governance is applied to an execution chain,
see [ZTAuth*](https://spec.ztauthstar.com).
:::

Authority is created from intent and propagated through execution. At every
step, it can only stay the same or narrow.
