import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "PIC",
  tagline: "Provenance Identity Continuity",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://www.pic-protocol.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "pic-protocol", // Usually your GitHub org/user name.
  projectName: "pic-protocol", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        // We disable the preset docs plugin and register multiple docs
        // instances below to get clean top-level routes like:
        // /ontology, /specification, /protocol, /code
        // (instead of the default /docs/...)
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.jpg",
    colorMode: { disableSwitch: false, respectPrefersColorScheme: true },
    navbar: {
      title: "PIC",
      logo: {
        alt: "PIC Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          position: "left",
          label: "Ontology",
          to: "/ontology",
        },
        {
          position: "left",
          label: "Specification",
          to: "/specification",
        },
        {
          position: "left",
          label: "Protocol",
          to: "/protocol",
        },
        {
          position: "left",
          label: "Code",
          to: "/code",
        }
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "ontology",
        path: "docs/ontology",
        routeBasePath: "ontology",
        sidebarPath: "./sidebars-ontology.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "specification",
        path: "docs/specification",
        routeBasePath: "specification",
        sidebarPath: "./sidebars-specification.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "protocol",
        path: "docs/protocol",
        routeBasePath: "protocol",
        sidebarPath: "./sidebars-protocol.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "code",
        path: "docs/code",
        routeBasePath: "code",
        sidebarPath: "./sidebars-code.ts",
      },
    ],
    "./src/plugins/tailwind-config.js",
  ],
  scripts: [
    {
      src: "https://plausible.io/js/pa-i7fASAHMgS-8ZoTMzxiGY.js",
      async: true,
    },
  ],
  clientModules: ["./src/clientModules/plausible.js"],
};

export default config;
