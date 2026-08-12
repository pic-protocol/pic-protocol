import { useEffect, type ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import type { Props } from "@theme/NotFound/Content";
import Heading from "@theme/Heading";
import { PicDefinitionIdentifierContent } from "../../../components/PicDefinitionIdentifierPage";
import { ProfileRedirectContent } from "../../../components/ProfileRedirectNotice";
import {
  PIC_PROFILE_02_SPEC_HTML_URL,
  PIC_SPECIFICATION_URL,
} from "../../../components/picProtocolUrls";

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export default function NotFoundContent({ className }: Props): ReactNode {
  const location = useLocation();
  const pathname = normalizePathname(location.pathname);
  const specificationUrl = useBaseUrl(PIC_SPECIFICATION_URL);

  const isDefinitionIdentifier =
    pathname === "/definitions" || pathname.startsWith("/definitions/");
  const isProfileIdentifier = pathname.startsWith("/profiles/");
  const isProfile02 = pathname === "/profiles/0.2";

  useEffect(() => {
    if (isProfile02) {
      window.location.replace(PIC_PROFILE_02_SPEC_HTML_URL);
      return;
    }

    if (isProfileIdentifier) {
      window.location.replace(specificationUrl);
    }
  }, [isProfile02, isProfileIdentifier, specificationUrl]);

  if (isDefinitionIdentifier) {
    return (
      <PicDefinitionIdentifierContent
        className={className}
        identifierPath={pathname}
      />
    );
  }

  if (isProfileIdentifier) {
    const targetUrl = isProfile02
      ? PIC_PROFILE_02_SPEC_HTML_URL
      : PIC_SPECIFICATION_URL;

    return (
      <ProfileRedirectContent
        className={className}
        targetUrl={targetUrl}
        title={isProfile02 ? "PIC Profile 0.2" : "PIC Profile"}
        message={
          isProfile02
            ? "PIC Profile 0.2 is rendered from the current draft specification set."
            : "This PIC profile is not published as a standalone profile page. The specification index lists the available drafts."
        }
      />
    );
  }

  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            Page Not Found
          </Heading>
          <p>We could not find what you were looking for.</p>
          <p>
            Return to the <Link to="/">PIC home page</Link> or open the{" "}
            <Link to={PIC_SPECIFICATION_URL}>specification index</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
