import { useEffect, type ReactNode } from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

const TARGET_URL = "/pic-in-action.html";

export default function DemoRedirect(): ReactNode {
  useEffect(() => {
    window.location.replace(TARGET_URL);
  }, []);

  return (
    <Layout title="PIC Demo" description="PIC in action demo">
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${TARGET_URL}`} />
      </Head>
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h1">PIC Demo</Heading>
            <p>Opening the PIC in action demo.</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
