---
sidebar_position: 2
---

# PIC Specification

The **PIC Specification** defines the generic, implementation-independent
rules and invariants that underlie every **PIC-compliant protocol**. It is
**not a protocol itself**: it states what every conforming system must
guarantee, leaving wire formats, transports, cryptographic suites, and
deployment choices to the protocols built on top of it.

Since version 0.2 the specification is published as a **document set**: an
entry point whose **Documents table** indexes every subordinate
specification, plus shared
[Legal Appendices](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-legal.html)
incorporated by reference into every document.

:::info Public drafts

These specifications are **open, actively developed public drafts**. They are independently developed and are not standards, so
they carry no IETF, RFC, ISO, W3C, or other standards-body status — the RFC-style rendering is simply a familiar, readable
format, and details may still change between versions. As with an open-source license, they are published under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and provided **"as is", without warranties or conditions of any
kind**; implementers and users assume all risks of their use. For the complete picture, see the
[status and legal notice](#status-and-legal-notice) below.

:::

## Current specification (0.2 draft)

The current profile identifier is
[`https://pic-protocol.org/profiles/0.2`](/profiles/0.2). It redirects to the
rendered PIC 0.2 specification entry point.

Each document is available as rendered **HTML**, plain **text**, and RFC
**XML**; the **Source** column links to the authoritative Markdown.

| Document | HTML | Text | XML | Source |
| --- | --- | --- | --- | --- |
| PIC Specification Set | [HTML](/profiles/0.2) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md) |
| PIC Prover and Verifier | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-prover-verifier-spec.md) |
| PIC Revocation | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-revocation-spec.md) |
| PIC Sandboxed Execution | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-lineage-guardrail-spec.md) |
| PIC Architecture and Deployment | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-architecture-deployment-spec.md) |
| PIC Legal Appendices | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-legal.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-legal.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-legal.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md) |

## Releases

| Version | Status | Description | Reference |
| --- | --- | --- | --- |
| 0.2 | *Draft — current* | Specification set: entry point with Documents table, Prover and Verifier, Revocation, Sandboxed Execution, Architecture and Deployment, and shared Legal Appendices | [pic-spec 0.2](/profiles/0.2) |
| 0.1 | *Draft — superseded* | Initial generic specification draft (single document) | [pic-spec 0.1](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.1/pic-spec.md) |

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
[Legal Appendices](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-legal.html).
