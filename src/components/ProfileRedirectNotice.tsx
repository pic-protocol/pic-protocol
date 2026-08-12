import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

type Props = {
  targetUrl: string;
  title: string;
  message: string;
  className?: string;
};

export function ProfileRedirectContent({
  targetUrl,
  title,
  message,
  className,
}: Props): ReactNode {
  return (
    <main className={`container margin-vert--xl${className ? ` ${className}` : ""}`}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className="hero__title">
            {title}
          </Heading>
          <p>{message}</p>
          <p>
            <Link className="button button--primary" to={targetUrl}>
              Continue
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProfileRedirectNotice(props: Props): ReactNode {
  return (
    <Layout title={props.title} description={props.message}>
      <ProfileRedirectContent {...props} />
    </Layout>
  );
}
