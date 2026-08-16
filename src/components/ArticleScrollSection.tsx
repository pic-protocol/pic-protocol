import Link from "@docusaurus/Link";
import { HOME_ARTICLES, PicxArticleRail } from "./PicxArticleRail";

export const ArticleScrollSection = () => {
  return (
    <section
      id="tw-scope"
      className="home-article-section bg-[#FAFAFA] px-6 pt-16 md:pt-20 xl:px-24 dark:bg-[#1F1F21]"
    >
      <div className="mx-auto max-w-300">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-180">
            <span className="mono mb-3 block text-[10px] font-semibold uppercase tracking-widest text-[#00543D] dark:text-[#25c2a0]">
              {"// field_notes"}
            </span>
            <h2 className="font-[Clash_Grotesk]! m-0 text-[32px] font-medium leading-none tracking-normal text-black dark:text-white md:text-[44px]">
              Follow the design work behind PIC.
            </h2>
            <p className="m-0 mt-4 max-w-168 text-[17px] font-light leading-8 text-black/58 dark:text-white/55">
              Architecture notes, protocol artifacts, exchange flows, and agent
              security essays for people building with authority continuity.
            </p>
          </div>

          <Link
            href="/pic-x"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-[#00543D]/25 px-5 py-3 text-sm font-semibold text-[#00543D] no-underline transition hover:bg-[#00543D] hover:text-white dark:border-[#25c2a0]/40 dark:text-[#25c2a0] dark:hover:bg-[#25c2a0] dark:hover:text-[#05231b]"
          >
            Explore PIC-X
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-300 md:mt-12">
        <PicxArticleRail
          articles={HOME_ARTICLES}
          ariaLabel="PIC homepage article series"
        />
      </div>
    </section>
  );
};
