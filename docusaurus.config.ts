import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "PIC",
  tagline: "Provenance Identity Continuity",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://www.pic-protocol.org",
  baseUrl: "/",
  organizationName: "pic-protocol",
  projectName: "pic-protocol",
  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      type: "text/css",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.jpg",
    colorMode: { disableSwitch: false, respectPrefersColorScheme: true },
    navbar: {
      title: "PIC",
      logo: {
        alt: "PIC Logo",
        src: "img/logo.svg",
      },
      items: [
        { position: "left", label: "Ontology", to: "/ontology" },
        { position: "left", label: "Specification", to: "/specification" },
        { position: "left", label: "Protocol", to: "/protocol" },
        { position: "left", label: "Code", to: "/code" },
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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "specification",
        path: "docs/specification",
        routeBasePath: "specification",
        sidebarPath: "./sidebars-specification.ts",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "protocol",
        path: "docs/protocol",
        routeBasePath: "protocol",
        sidebarPath: "./sidebars-protocol.ts",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "code",
        path: "docs/code",
        routeBasePath: "code",
        sidebarPath: "./sidebars-code.ts",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
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