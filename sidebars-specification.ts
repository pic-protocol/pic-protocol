import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  specificationSidebar: [
    {
      type: "doc",
      id: "index",
      label: "PIC Specification",
    },
    {
      type: "doc",
      id: "protocols",
      label: "PIC Protocols",
    },
    {
      type: "doc",
      id: "implementations",
      label: "PIC Implementations",
    },
  ],
};

export default sidebars;
