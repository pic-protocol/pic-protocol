import { useEffect, type ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ProfileRedirectNotice from "../../components/ProfileRedirectNotice";
import { PIC_SPECIFICATION_URL } from "../../components/picProtocolUrls";

export default function ProfilesIndex(): ReactNode {
  const specificationUrl = useBaseUrl(PIC_SPECIFICATION_URL);

  useEffect(() => {
    window.location.replace(specificationUrl);
  }, [specificationUrl]);

  return (
    <ProfileRedirectNotice
      targetUrl={PIC_SPECIFICATION_URL}
      title="PIC Profiles"
      message="PIC profiles are listed from the specification index."
    />
  );
}

