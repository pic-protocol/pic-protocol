---
sidebar_position: 4
---

# PIC Implementations

PIC is defined solely by the **PIC Formal Model** and the
**PIC Specification**. The implementations listed here do not define PIC and
do not replace them.

An implementation is **PIC-compliant** only if it correctly implements a
PIC-compliant [**PIC Protocol**](/protocol) — or, where no protocol technical
specification is published, if it directly implements the
**PIC Specification** and preserves the invariants of the
**PIC Formal Model**.

## Libraries

Reusable building blocks for experimenting with or implementing PIC concepts.
Libraries may be incomplete, experimental, or evolving.

| Language | Project  | Description                                               | Spec version | Repository                                                        |
|----------|----------|-----------------------------------------------------------|--------------|-------------------------------------------------------------------|
| Rust     | pic-rust | Experimental Rust library for PIC concepts and structures | 0.1          | [pic-protocol/pic-rust](https://github.com/pic-protocol/pic-rust) |

## Projects & Demos (External Claims)

Entries appear **solely on their own claims**: PIC does not sponsor, certify,
or verify them, and listing implies neither correctness nor conformance —
responsibility rests with the maintainers. Entries that misrepresent PIC may
be removed.

| Name                  | Type    | Maintainer        | Description                                       | Spec version | Repository                                                                          |
|-----------------------|---------|-------------------|---------------------------------------------------|--------------|-------------------------------------------------------------------------------------|
| Permguard Trust Plane | Project | Nitro Agility Srl | Trust Plane implementation claiming PIC alignment | 0.1          | [permguard/permguard-trustplane](https://github.com/permguard/permguard-trustplane) |
| Provenance            | Demo    | Clay Good         | Demonstration project inspired by PIC concepts    | 0.1          | [clay-good/provenance](https://github.com/clay-good/provenance)                     |
