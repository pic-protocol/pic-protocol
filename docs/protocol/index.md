---
sidebar_position: 3
---

# PIC Protocols

The PIC ecosystem is layered: the **PIC Model** defines the formal semantics
of authority continuity; the **PIC Specification** defines the generic,
implementation-independent requirements that any conforming system MUST
satisfy; on top of it, **multiple PIC Protocols** realize the same model in
specific execution environments, threat models, or deployment domains.

## Generic Specification, Domain-Specific Protocols

The PIC Specification defines required invariants, abstract data structures,
logical roles, and normative constraints on authority evolution. It does
**not** prescribe wire formats, transports, cryptographic suites, or
deployment architectures.

Those choices belong to the **domain-specific PIC Protocols** built on top of
it — for example:

- **Network** — cloud, microservices, service meshes, internet-scale systems
- **Embedded / IoT** — constrained devices, local networks, intermittent connectivity
- **In-Process / OS-Level** — kernels, runtimes, sandboxes, trusted execution environments
- **Decentralized / Ledger-Based** — trustless or consensus-based environments

Each protocol MAY define its own message formats, encodings, trust model
realizations, and trade-offs, and MAY version independently. Versioning
applies to the **protocol**, never to the PIC Model.

## Conformance

A protocol or implementation is **PIC-compliant** if and only if it:

- implements a declared version of the PIC Specification,
- preserves origin immutability,
- enforces monotonic authority restriction,
- validates causal continuity at every execution step.

Different protocols may differ operationally, but they are **semantically
equivalent with respect to authority continuity**.

## How Protocol Specifications Are Published

Each protocol family is specified in its **own specification document**,
developed as a **subordinate specification** of the PIC Specification. The
entry point of the specification set,
[`pic-spec.md`](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md),
maintains a **Documents table** that indexes every published subordinate
specification with its status and date.

Each subordinate protocol specification:

- MUST declare which version of the PIC Specification it implements,
- MUST NOT redefine, extend, or alter the invariants of the PIC Model,
- incorporates the shared
  [PIC Legal Appendices](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md)
  by reference,
- is canonical only in the version designated by the Specification Steward.

## Status

**No domain-specific protocol specification has been published yet.**
Protocol families will be developed incrementally across future versions of
the specification set; each will appear in the Documents table of the entry
point as it is released.
