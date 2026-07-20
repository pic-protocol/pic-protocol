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
[Legal Appendices](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md)
incorporated by reference into every document.

## Current specification (0.2 draft)

Each document is available as rendered **HTML**, plain **text**, and RFC
**XML**; the **Source** column links to the authoritative Markdown.

| Document | HTML | Text | XML | Source |
| --- | --- | --- | --- | --- |
| PIC Prover and Verifier | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-prover-verifier-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-prover-verifier-spec.md) |
| PIC Revocation | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-revocation-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-revocation-spec.md) |
| PIC Sandboxed Execution | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-lineage-guardrail-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-lineage-guardrail-spec.md) |
| PIC Architecture and Deployment | [HTML](https://htmlpreview.github.io/?https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.html) | [TXT](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.txt) | [XML](https://raw.githubusercontent.com/pic-protocol/pic-spec/main/draft/0.2/rfc/pic-architecture-deployment-spec.xml) | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-architecture-deployment-spec.md) |
| PIC Legal Appendices | — | — | — | [md](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-legal.md) |

## Releases

| Version | Status | Description | Reference |
| --- | --- | --- | --- |
| 0.2 | *Draft — current* | Specification set: entry point with Documents table, Prover and Verifier, Revocation, Sandboxed Execution, Architecture and Deployment, and shared Legal Appendices | [pic-spec 0.2](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.2/pic-spec.md) |
| 0.1 | *Draft — superseded* | Initial generic specification draft (single document) | [pic-spec 0.1](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.1/pic-spec.md) |

All releases are **drafts**: expect clarifications, additional normative
text, and structural adjustments driven by community feedback and
implementation experience from emerging **PIC-compliant protocols**.
