import Logo from "../../static/img/logo.svg";

const NAV_SECTIONS = [
  {
    title: "Principles",
    links: [
      { title: "Ontology", href: "/ontology" },
      { title: "Manifesto", href: "/ontology/manifesto" },
      { title: "Formal Model", href: "/ontology/formal-model" },
    ],
  },
  {
    title: "Spec & Protocol",
    links: [
      { title: "Specification", href: "/specification" },
      { title: "Protocol", href: "/protocol" },
    ],
  },
  {
    title: "Implementation",
    links: [
      { title: "Code", href: "/code" },
      {
        title: "Prototyping",
        href: "https://github.com/pic-protocol/pic-prototyping",
      },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "GitHub", href: "https://github.com/pic-protocol" },
    ],
  },
];

const GithubStarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      fill="currentColor"
    />
  </svg>
);

export const Footer = () => {
  return (
    <footer
      id="tw-scope"
      className="bg-[#FAFAFA] dark:bg-[#1A1A1C] flex items-center justify-center w-full px-6 md:px-12 lg:px-20 xl:px-30 relative"
    >
      <div className="py-12 sm:py-16 max-w-7xl w-full flex flex-col">
        {/* Navigation grid */}
        <nav className="w-full mb-12 sm:mb-16">
          <ul className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            {NAV_SECTIONS.map((section) => (
              <li key={section.title} className="flex flex-col gap-y-4">
                <h3 className="text-[#25c2a0] text-xs sm:text-sm font-bold uppercase tracking-widest leading-none m-0">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-y-3 list-none p-0 m-0">
                  {section.links.map((link) => (
                    <li key={link.title} className="leading-none">
                      <a
                        className="text-black/70 dark:text-white/70 hover:text-[#25c2a0] dark:hover:text-[#25c2a0] text-sm sm:text-[15px] font-normal leading-[1.4] no-underline transition-colors duration-200"
                        href={link.href}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* Glow separator */}
        <div className="glow-separator w-full mb-8 sm:mb-10" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 mb-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-x-3">
            <Logo className="text-[#00543D] dark:text-[#25c2a0] w-10 h-auto" />
            <span className="text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-white">
              PIC
            </span>
            <span className="text-black/40 dark:text-white/40 text-sm sm:text-[15px] font-normal">
              · Provenance · Identity · Continuity
            </span>
          </div>

          {/* Star on GitHub button */}
          <a
            href="https://github.com/pic-protocol/pic-spec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full border border-black/15 dark:border-[#25c2a0]/20 text-black/70 dark:text-white/70 hover:text-[#25c2a0] dark:hover:text-[#25c2a0] hover:border-[#25c2a0]/40 dark:hover:border-[#25c2a0]/40 text-sm font-medium no-underline transition-all duration-300 hover:shadow-[0_0_16px_rgba(37,194,160,0.1)]"
          >
            <GithubStarIcon />
            Star on GitHub
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-black/40 dark:text-white/40 text-xs sm:text-sm leading-relaxed m-0">
            © 2026 Provenance Identity Continuity
          </p>
          <p className="text-black/30 dark:text-white/30 text-[11px] sm:text-xs leading-relaxed mt-1 m-0">
            ✧ Language &amp; AI · written in English by the authors, polished
            with AI ✧
          </p>
        </div>
      </div>
    </footer>
  );
};
