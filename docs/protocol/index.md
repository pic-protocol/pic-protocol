---
sidebar_position: 3
---

# PIC Protocols

The PIC ecosystem is intentionally layered.

The **PIC Model** defines the formal semantics of authority continuity.
The **PIC Specification** defines the generic, implementation-independent
requirements that any conforming system MUST satisfy.

On top of this generic specification, **multiple PIC Protocols may exist**.

Each PIC Protocol is a concrete realization of the same underlying model,
adapted to a specific execution environment, threat model, or deployment
domain.

## Generic vs Domain-Specific Protocols

The PIC Specification is **generic by design**.

It defines:

- required invariants
- abstract data structures
- logical roles and responsibilities
- normative constraints on authority evolution

It does **not** prescribe:

- a single wire format
- a single transport
- a single cryptographic suite
- a single deployment architecture

Instead, the specification is intended to be implemented by
**multiple domain-specific PIC Protocols**, including but not limited to:

- **Network PIC Protocols**  
  Designed for cloud, microservices, service meshes, and internet-scale systems.

- **Embedded / IoT PIC Protocols**  
  Designed for constrained devices, local networks, and intermittently connected environments.

- **In-Process / OS-Level PIC Protocols**  
  Designed for kernels, runtimes, sandboxes, and trusted execution environments.

- **Decentralized / Ledger-Based PIC Protocols**  
  Designed for trustless or consensus-based environments.

All such protocols **share the same generic specification**
and MUST enforce the same PIC invariants.

## Protocol Families and Versions

Each PIC Protocol MAY define:

- its own message formats
- its own encoding rules
- its own trust model realizations
- its own performance and security trade-offs

Protocols MAY evolve independently and MAY introduce versioning
appropriate to their domain.

Versioning applies to the **protocol**, not to the PIC Model.

All protocol versions MUST:

- clearly declare which version of the PIC Specification they implement
- demonstrate conformance to the required invariants

## Conformance

A protocol or implementation is considered **PIC-compliant** if and only if:

- it implements the PIC Specification
- it preserves origin immutability
- it enforces monotonic authority restriction
- it validates causal continuity at every execution step

Different protocols MAY differ operationally,
but they are **semantically equivalent with respect to authority continuity**.

## How Protocol Specifications Are Published

Each protocol family is specified in its **own specification document**,
developed as a **subordinate specification** of the PIC Specification —
one spec file per protocol domain (network, embedded, in-process,
ledger-based, and so on).

The entry point of the specification set,
[`pic-spec.md`](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md),
maintains a **Documents table** that indexes every published subordinate
specification, with its status and date.

Each subordinate protocol specification:

- MUST declare which version of the PIC Specification it implements,
- MUST NOT redefine, extend, or alter the invariants of the PIC Model,
- incorporates the shared
  [PIC Legal Appendices](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md)
  by reference,
- is canonical only in the version designated by the Specification Steward.

## Status

The generic PIC Specification is stable at the model level.

**No domain-specific protocol specification has been published yet.**
Protocol families will be developed incrementally across future versions of
the specification set; each one will appear in the Documents table of the
entry point as it is released.
