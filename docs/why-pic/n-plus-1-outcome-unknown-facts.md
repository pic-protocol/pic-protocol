---
sidebar_position: 3.5
---

# The N+1 Outcome on Unknown Facts

Some decisions cannot be closed when the user signs, because the relevant fact does not exist yet.

The user can sign a task, a limit, or a preference. But the concrete option may be born only while the agent works:
a vendor responds, a slot opens, a risk score changes, a model fallback becomes necessary, or a runtime environment
offers a safer path than the one expected at the start.

This is the **N+1 outcome problem**: the authority needed at step *n+1* depends on facts that were unavailable at
step *n*.

## The mistake

Proof of Possession proves what an agent holds. It does not prove which future outcome the world will offer, or
whether that outcome satisfies the user's signed intent.

The missing axis is not identity. It is **runtime evidence**.

| At signing time | At runtime |
| --- | --- |
| The user signs the task and its bounds. | The concrete outcome appears. |
| The agent does not know the final option. | The guardrail can inspect evidence. |
| Possession proves an artifact is held. | Continuity proves the action belongs to a valid signed case. |

The agent's guess must never be the authority. The signed predicate and the runtime proof decide.

## A different example

A user asks an agent to book dinner for two.

The strict rule is simple:

> Keep dinner under the signed meal budget.

But the user may also allow a trade-off:

> A small increase is allowed only if the booking includes a live concert at the restaurant, the concert is included
> in the price, and there are no separate cover charges or surprise fees.

At signing time, that offer does not exist. The user does not know about it, and the restaurant has not created it
yet. While the agent is already executing, the restaurant decides to add a live-music package for that night: a table
slightly above the meal budget, but with the concert included.

That is the unknown fact. It is not hidden information the user failed to write down. It is an outcome that was born
after delegation and can be evaluated only when it materializes.

## Strict vs trade-off

| Outcome type | Closes when | What is signed |
| --- | --- | --- |
| **Strict** | At signing | A closed bound: never external, never above limit, never outside scope. |
| **Trade-off** | At commit | A signed conditional context: allow this only if these runtime facts are proven. |

A trade-off is not the agent deciding that an exception is reasonable. It is the guardrail proving that the concrete
outcome satisfies one of the signed cases.

## The PIC shape

The discipline is the same as the N+1 unknown executor problem:

- **do not pre-bind to the unknown**
- **sign the predicate**
- **require proof when the unknown materializes**
- **issue a signed bounded result**
- **carry that result forward as authority continuity**

The decision point does not create the outcome. The world creates the outcome. The decision point establishes, from
evidence, which signed case the outcome satisfies.

## PIC of PIC

This is where policy evaluation itself becomes an ordinary verified execution.

The guardrail evaluates the signed conditional context against runtime evidence and returns a **signed decision
result** containing the authority actually granted for the next step. That result is not a bare `Permit` or `Deny`.
It is the next bounded authority context.

In that sense, the authorization decision becomes the base context for the following execution:

```text
signed task + signed conditional contexts
        +
runtime evidence at commit
        v
signed bounded decision result
        v
next PIC authority context
```

The agent may discover options, collect evidence, and propose the next action. It does not get to decide that a
trade-off is acceptable. The signed case waits until the fact exists.

## Why this belongs in Why PIC

The problem is not only that the next executor may be unknown. The next **outcome** may be unknown too.

PIC's answer is the same in both cases: never trust possession or prediction where the required fact does not yet
exist. Accept only a signed, bounded, evidence-backed continuation at the moment the action commits.
