import Link from "@docusaurus/Link";
import {
  CURRENT_SPEC_RELEASE,
  SPEC_RELEASES,
  getReleaseStatusLabel,
  type SpecDocument,
} from "../data/specification";

type LinkCellProps = {
  href?: string;
  children: string;
};

const isInternal = (href: string) => href.startsWith("/");

const LinkCell = ({ href, children }: LinkCellProps) => {
  if (!href) return <span aria-hidden="true">-</span>;

  if (isInternal(href)) {
    return <Link to={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const getLegalDocument = () =>
  CURRENT_SPEC_RELEASE.documents?.find((document) => document.id === "legal");

export const CurrentLegalAppendicesLink = ({
  children = "Legal Appendices",
}: {
  children?: string;
}) => (
  <LinkCell href={getLegalDocument()?.html}>{children}</LinkCell>
);

const DocumentRow = ({ document }: { document: SpecDocument }) => (
  <tr>
    <td>
      <strong>{document.title}</strong>
      <br />
      <span className="spec-table-muted">{document.role}</span>
    </td>
    <td>
      <LinkCell href={document.html}>HTML</LinkCell>
    </td>
    <td>
      <LinkCell href={document.text}>TXT</LinkCell>
    </td>
    <td>
      <LinkCell href={document.xml}>XML</LinkCell>
    </td>
    <td>
      <LinkCell href={document.source}>md</LinkCell>
    </td>
  </tr>
);

export const SpecificationIndexTables = () => {
  const current = CURRENT_SPEC_RELEASE;
  const documents = current.documents ?? [];

  return (
    <>
      <section>
        <h2>Current specification ({current.label})</h2>
        {current.profileId && (
          <p>
            The current profile identifier is{" "}
            <LinkCell href={current.profilePath}>{current.profileId}</LinkCell>.
            It redirects to the rendered PIC {current.version} specification
            entry point.
          </p>
        )}
        <p>
          Each document is available as rendered <strong>HTML</strong>, plain{" "}
          <strong>text</strong>, and RFC <strong>XML</strong>; the{" "}
          <strong>Source</strong> column links to the authoritative Markdown.
        </p>

        <div className="spec-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>HTML</th>
                <th>Text</th>
                <th>XML</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Releases</h2>
        <div className="spec-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>Status</th>
                <th>Description</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {SPEC_RELEASES.map((release) => (
                <tr key={release.version}>
                  <td>{release.version}</td>
                  <td>
                    <em>{getReleaseStatusLabel(release)}</em>
                  </td>
                  <td>{release.description}</td>
                  <td>
                    <LinkCell
                      href={release.profilePath ?? release.reference?.url}
                    >
                      {release.reference?.label ??
                        `pic-spec ${release.version}`}
                    </LinkCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
