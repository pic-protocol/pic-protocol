import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import {
  PIC_DEFINITION_BASE_URL,
  PIC_PROFILE_02_SPEC_HTML_URL,
  PIC_SPECIFICATION_URL,
} from "./picProtocolUrls";

type DefinitionKind = "token type" | "proposal type" | "definition";

type Props = {
  identifierPath?: string;
  kind?: DefinitionKind;
  title?: string;
  className?: string;
};

function normalizeIdentifierPath(identifierPath?: string): string {
  if (!identifierPath || identifierPath === "/definitions") {
    return PIC_DEFINITION_BASE_URL;
  }

  return `https://pic-protocol.org${identifierPath.replace(/\/$/, "")}`;
}

export function PicDefinitionIdentifierContent({
  identifierPath,
  kind = "definition",
  title = "PIC Definition Identifier",
  className,
}: Props): ReactNode {
  const identifier = normalizeIdentifierPath(identifierPath);

  return (
    <main className={`container margin-vert--xl${className ? ` ${className}` : ""}`}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className="hero__title">
            {title}
          </Heading>

          <p>
            This URL identifies a PIC {kind}. It is a stable protocol identifier
            used by the PIC specifications, not a standalone dereferenceable
            document.
          </p>

          <p>
            The current draft defines these identifiers in the PIC specification
            set. Use the links below for the normative draft context and the
            site specification index.
          </p>

          <pre>
            <code>{identifier}</code>
          </pre>

          <div className="margin-top--lg">
            <Link className="button button--primary" to={PIC_SPECIFICATION_URL}>
              Open specification index
            </Link>
            <Link
              className="button button--secondary margin-left--sm"
              to={PIC_PROFILE_02_SPEC_HTML_URL}
            >
              Open PIC profile 0.2 draft
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PicDefinitionIdentifierPage(props: Props): ReactNode {
  return (
    <Layout
      title={props.title ?? "PIC Definition Identifier"}
      description="PIC definition identifiers are stable protocol identifiers defined by the PIC specifications."
    >
      <PicDefinitionIdentifierContent {...props} />
    </Layout>
  );
}
