import { useEffect, type ReactNode } from "react";
import Head from "@docusaurus/Head";
import ProfileRedirectNotice from "../components/ProfileRedirectNotice";

const TARGET_URL = "/specification/protocols";

export default function ProtocolRedirect(): ReactNode {
  useEffect(() => {
    window.location.replace(TARGET_URL);
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${TARGET_URL}`} />
        <link rel="canonical" href={TARGET_URL} />
      </Head>
      <ProfileRedirectNotice
        targetUrl={TARGET_URL}
        title="PIC Protocols"
        message="PIC Protocols is now part of the PIC Specification section."
      />
    </>
  );
}
