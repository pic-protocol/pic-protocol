---
sidebar_position: 4
---

# Libraries and Code

This section collects libraries, projects, and demos related to PIC.

PIC is defined solely by its **formal model** and **generic specification**.
Code listed here does not define PIC and does not replace the specification.

The section is intentionally divided into:

- **Libraries** — reusable code intended to support PIC-based systems
- **Projects & Demos** — external efforts that claim PIC alignment

## Libraries

Libraries provide reusable building blocks for experimenting with
or implementing PIC concepts.

| Language | Project  | Description                                               | Spec version | Repository                               |
|----------|----------|-----------------------------------------------------------|--------------|------------------------------------------|
| Rust     | pic-rust | Experimental Rust library for PIC concepts and structures | 0.1          | https://github.com/pic-protocol/pic-rust |

Libraries may be incomplete, experimental, or evolving.

## Projects & Demos (External Claims)

This section lists **external projects and demos** that **publicly claim**
to implement, demonstrate, or be inspired by the PIC model.

PIC **does not sponsor, certify, test, audit, or verify**
any of the entries listed below.

Projects and demos appear here **solely based on their own claims**.
Their presence does **not** imply:

- correctness
- security
- completeness
- conformance to the PIC Specification

PIC performs **no validation or conformance testing**. Responsibility for correctness and alignment rests entirely with the project maintainers.

If a project or demo is found to:

- misrepresent the PIC model
- violate core PIC invariants
- make misleading or incorrect claims about PIC

it **may be removed** from this list.

PIC remains defined exclusively by its formal model and specification, not by third-party code.

| Name                  | Type    | Maintainer        | Description                                       | Spec version | Repository                                        |
|-----------------------|---------|-------------------|---------------------------------------------------|--------------|---------------------------------------------------|
| Permguard Trust Plane | Project | Nitro Agility Srl | Trust Plane implementation claiming PIC alignment | 0.1          | https://github.com/permguard/permguard-trustplane |
| Provenance            | Demo    | Clay Good         | Demonstration project inspired by PIC concepts    | 0.1          | https://github.com/clay-good/provenance           |
