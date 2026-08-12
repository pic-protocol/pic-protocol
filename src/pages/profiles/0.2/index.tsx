import { useEffect, type ReactNode } from "react";
import Head from "@docusaurus/Head";
import ProfileRedirectNotice from "../../../components/ProfileRedirectNotice";
import { PIC_PROFILE_02_SPEC_HTML_URL } from "../../../components/picProtocolUrls";

export default function Profile02Redirect(): ReactNode {
  useEffect(() => {
    window.location.replace(PIC_PROFILE_02_SPEC_HTML_URL);
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${PIC_PROFILE_02_SPEC_HTML_URL}`} />
        <link rel="canonical" href={PIC_PROFILE_02_SPEC_HTML_URL} />
      </Head>
      <ProfileRedirectNotice
        targetUrl={PIC_PROFILE_02_SPEC_HTML_URL}
        title="PIC Profile 0.2"
        message="PIC Profile 0.2 is rendered from the current draft specification set."
      />
    </>
  );
}

