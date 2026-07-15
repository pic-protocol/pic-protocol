---
sidebar_position: 2
---
# Permissions, Intent, Authority and Execution

**Authority propagation** begins with a **permissioned entity**: an entity
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

![Intent and Execution](/img/ontology/intent-execution.png)

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
step, it can only narrow.
