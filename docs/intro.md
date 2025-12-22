---
sidebar_position: 1
---

# Protocol Intro

Welcome to the Official PIC Protocol Website!

**PIC (Provenance Identity Continuity)** is a new authorization model for distributed systems and AI agents.

## The Problem

Today's systems verify possession: "Do you have a valid token? Come in."

But possession can be stolen. And trust doesn't survive multiple hops.

AI agents calling services calling APIs — the chain breaks. Origin lost.

Traditional systems rely on **ambient authority**: services execute using their own credentials. A service can "help" a user do something they are not allowed to do.

This is the **Confused Deputy** problem — unsolved for 40 years.

## The Solution

PIC flips the question.

Old: "Do you have a valid token?"

New: "Can you prove you can continue this chain?"

With PIC:
- Authority is bound to the origin
- No service can use its own elevated permissions on behalf of a user
- If it's not in the user's authority, it doesn't exist in that transaction

## Core Principles

- **Provenance** — The causal chain is always traceable and auditable. From origin to end, unbroken. If it breaks, it stops.

- **Identity** — The origin identity is immutable. It generates authority. It cannot change throughout the chain.

- **Continuity** — Continuity is proven at every step. Proof of Continuity replaces Proof of Possession. Authority never expands.

## Why It Matters for AI

AI agents are just executors in a PIC transaction.

If an API call is safe under PIC, an AI agent calling that API is equally safe.

- AI agents never gain independent authority
- Tools execute only within the user's original bounds
- Confused deputy attacks are structurally impossible
- Fifty hops, one hundred services — doesn't matter. Origin preserved.

## Governance and Auditing

PIC implements the **Authority Continuity** principle.

Governance and Auditing integrate at each step of the execution flow as a PIC extension on top of Continuity enforcement.

## Get Started

- Read the [PIC Specification](/docs/spec)
- Explore the [formal proofs](https://zenodo.org/records/17833000)
- See [examples](/docs/examples)

---

Not "what do you have?" — but "can you prove you can continue?"

That's PIC.