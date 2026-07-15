---
sidebar_position: 2
---

# PIC Specification

The **PIC Specification** defines the generic, implementation-independent
rules and invariants that underlie all PIC Protocols. It is **not a protocol
itself**: it captures semantic requirements, formal invariants on authority
evolution, and the conceptual bindings required for continuity — separating
model obligations from wire formats, transports, cryptographic suites, and
deployment choices, which belong to the protocol families built on top of it.

Architectural components — such as the **Trust Plane**, the
**Causal Authority Transition (CAT)**, and the **PIC Verifier** — are defined
normatively in the specification documents, not on this site.

Since version 0.2 the specification is published as a **document set**: an
entry point that indexes every subordinate specification in a
**Documents table**, plus shared
[Legal Appendices](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md)
incorporated by reference into every document.

## Releases

| Version | Status               | Description                                                                                              | Reference                                                                                |
|---------|----------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 0.2     | *Draft — current*    | Specification set: entry point with Documents table, PIC Verifier Specification, shared Legal Appendices | [pic-spec 0.2](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md) |
| 0.1     | *Draft — superseded* | Initial generic specification draft (single document)                                                    | [pic-spec 0.1](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.1/pic-spec.md) |

All releases are **drafts**: expect clarifications, additional normative
text, and structural adjustments driven by community feedback and
implementation experience from emerging PIC Protocol families.

## Conformance

A protocol or implementation MAY claim PIC compliance only if it:

1. implements a declared version of the PIC Specification,
2. enforces all invariants defined by the specification,
3. does not violate the monotonicity and continuity constraints.

Conformance claims SHOULD include the spec version, any experimental
extensions, and any domain-specific protocol bindings. This enables clear
interoperability expectations and simplifies version negotiation in
multi-protocol environments.
