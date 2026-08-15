---
sidebar_position: 3
---

# PIC Implementations

PIC is defined solely by the **PIC Formal Model** and the
**PIC Specification**. The implementations listed here do not define PIC and
do not replace them.

An implementation is **PIC-compliant** only if it correctly implements a
PIC-compliant [**PIC Protocol**](/specification/protocols) — or, where no
protocol technical specification is published, if it directly implements the
**PIC Specification** and preserves the invariants of the
**PIC Formal Model**.

## Work in progress

The following open-source implementation projects are being developed against
the current PIC direction. They are useful for experimentation and review, but
they should be treated as **work in progress** until they declare a stable
conformance target.

<div style={{display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", margin: "1.5rem 0"}}>
  <article className="glow-card" style={{borderRadius: "12px", padding: "1.25rem"}}>
    <p className="mono" style={{margin: "0 0 0.75rem", color: "var(--pic-accent)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase"}}>
      Work in progress
    </p>
    <h3 style={{marginTop: 0}}>PIC Rust</h3>
    <p>
      Rust implementation track for PIC components: protocol libraries,
      verifier logic, artifact handling, and strongly typed implementation
      experiments.
    </p>
    <a href="https://github.com/pic-protocol/pic-rust" target="_blank" rel="noopener noreferrer">{"github.com/pic-protocol/pic-rust"}</a>
  </article>

  <article className="glow-card" style={{borderRadius: "12px", padding: "1.25rem"}}>
    <p className="mono" style={{margin: "0 0 0.75rem", color: "var(--pic-accent)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase"}}>
      Work in progress
    </p>
    <h3 style={{marginTop: 0}}>PIC-X</h3>
    <p>
      Open-source <strong>Provenance Identity Continuity Exchange</strong>:
      the practical exchange and trust-plane component for connecting existing
      authority infrastructure with PIC continuity.
    </p>
    <a href="https://github.com/pic-protocol/pic-x" target="_blank" rel="noopener noreferrer">{"github.com/pic-protocol/pic-x"}</a>
  </article>
</div>

## Submit your implementation

Have a PIC-compliant implementation? Open a pull request on
[pic-protocol/pic-protocol.github.io](https://github.com/pic-protocol/pic-protocol.github.io)
adding it to this page, with a short description, the targeted spec version,
and the repository link.
