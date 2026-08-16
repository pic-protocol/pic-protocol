---
sidebar_position: 2
---

import {
  CurrentLegalAppendicesLink,
  SpecificationIndexTables,
} from '@site/src/components/SpecificationIndexTables';

# PIC Specification

The **PIC Specification** defines the generic, implementation-independent
rules and invariants that underlie every **PIC-compliant protocol**. It is
**not a protocol itself**: it states what every conforming system must
guarantee, leaving wire formats, transports, cryptographic suites, and
deployment choices to the protocols built on top of it.

Since version 0.2 the specification is published as a **document set**: an
entry point whose **Documents table** indexes every subordinate
specification, plus shared
<CurrentLegalAppendicesLink />
incorporated by reference into every document.

:::info Public drafts

These specifications are **open, actively developed public drafts**. They are independently developed and are not standards, so
they carry no IETF, RFC, ISO, W3C, or other standards-body status — the RFC-style rendering is simply a familiar, readable
format, and details may still change between versions. As with an open-source license, they are published under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and provided **"as is", without warranties or conditions of any
kind**; implementers and users assume all risks of their use. For the complete picture, see the
[status and legal notice](#status-and-legal-notice) below.

:::

<SpecificationIndexTables />

All releases are **drafts**: expect clarifications, additional normative
text, and structural adjustments driven by community feedback and
implementation experience from emerging **PIC-compliant protocols**.

## Status and legal notice

Every PIC document published here is an **independently developed draft**, not a standard.

- It has **not** been adopted, endorsed, approved, or published by the IETF, IRTF, IAB, RFC Editor, ISO, IEC, W3C, CNCF,
  OpenID Foundation, or any other standards-development organization.
- It is **not** an RFC, an Internet Standard, or an official work item of any working group or standards body. The RFC-style
  HTML / text / XML rendering is a formatting choice only and implies no such status.
- It is published solely for public review, research, experimentation, and implementation feedback, and **may be revised,
  replaced, or withdrawn at any time**.
- Publication does **not** constitute certification, endorsement, security approval, interoperability assurance, or regulatory
  recognition.
- **Implementers use these drafts entirely at their own risk.** Any implementation, interoperability statement, or conformance
  claim applies only to the exact document version referenced.

PIC documents are published and maintained by **Nitro Agility S.r.l.** as **Specification Steward**. The full legal terms —
disclaimer, limitation of liability, licensing, and attribution — are in the
<CurrentLegalAppendicesLink />.
