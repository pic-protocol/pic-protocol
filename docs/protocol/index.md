---
sidebar_position: 3
---

# PIC Protocols

The PIC ecosystem is layered: the **PIC Model** defines the formal semantics
of authority continuity; the **PIC Specification** defines the generic
requirements every conforming system MUST satisfy.

A **PIC Protocol** is a concrete **technical specification** — wire formats,
types and encodings, transport, cryptographic suite — that implements the
PIC Specification. Protocols may be defined by **PIC itself**, by
**providers** of PIC-compliant solutions, or through an open
**working group**; official ones are published as subordinate specifications
of the PIC Specification.

## Conformance

A **PIC Protocol** is PIC-compliant if and only if it implements a declared
version of the **PIC Specification** and preserves the invariants of the
**PIC Formal Model**.

An **implementation** is PIC-compliant if and only if it correctly implements
a PIC-compliant protocol — or, where no protocol technical specification is
published, if it directly implements a declared version of the
**PIC Specification** and preserves the invariants of the
**PIC Formal Model**.

## Protocol Specifications

Protocol technical specifications MAY be published as **subordinate
specifications** of the PIC Specification, indexed in the **Documents table**
of the entry point
[`pic-spec.md`](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md).
Each MUST declare the PIC Specification version it implements, MUST NOT alter
the PIC Model invariants, and incorporates the
[PIC Legal Appendices](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md)
by reference.

**No protocol specification has been published yet.**
