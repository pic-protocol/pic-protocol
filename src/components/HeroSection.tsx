import Link from "@docusaurus/Link";

export const HeroSection = () => {
  return (
    <div className="flex dark:bg-[#1a1a1c] w-screen!">
      <div className="relative  pt-px xl:max-w-468 w-full xl:mx-auto">
        <div
          id="tw-scope"
          className="pic-home-hero mx-auto flex dark:bg-[#1a1a1c] -mt-70 pt-68 xl:-mt-37 xl:pt-40 px-6 xl:px-30 justify-center items-center max-h-219 xl:max-h-242 relative overflow-hidden!"
        >
          <img
            className="pic-home-hero-chain absolute left-[50%] scale-[1.2] min-[1440px]:scale-[1.1] transform translate-x-[-50%] md:w-full 2xl:w-420 -bottom-40 md:bottom-14 2xl:bottom-0"
            src="./img/chain.png"
            alt=""
          />
          <div className="p-15 z-60! xl:p-20.75 rounded-full bg-white/25 dark:bg-[#1A1A1C]/50 border border-[#EDEDED] dark:border-[#232323] circle-shadow backdrop-blur-sm">
            <div className="p-17.5 xl:p-24.25 rounded-full bg-white/50 dark:bg-[#1A1A1C]/50 border border-[#EDEDED] dark:border-[#232323] circle-shadow backdrop-blur-sm">
              <div className="px-40 min-[340px]:px-35 min-[380px]:px-30 xl:px-0 w-147.5 xl:w-203 aspect-square rounded-full border border-[#EDEDED] dark:border-[#232323] bg-white dark:bg-[#1A1A1C] circle-shadow flex flex-col items-center justify-center">
                <h1 className="text-[#00543D] dark:text-white tracking-widest text-center text-xs font-semibold uppercase leading-3">
                  A FORMAL AUTHORITY MODEL
                </h1>
                <h2 className="text-black dark:text-white tracking-[-1.28px] text-center text-5xl md:text-[64px] font-medium leading-[1.05] mt-1 max-w-140">
                  Provenance Identity Continuity
                </h2>
                <p className="text-black/50 dark:text-white/50 tracking-[-0.28px] text-center text-sm md:text-base font-light leading-[1.5] mt-4 max-w-137.5">
                  Authority is a continuous system. Continuity is proven by
                  relationship, not possession. PIC introduces a new authority
                  ontology, formally proven.
                </p>

                <div className="flex flex-col justify-center md:flex-row gap-4 mt-8 max-w-full w-full">
                  <Link
                    href="/why-pic"
                    className="pt-3.5 pb-3 text-center md:text-start leading-normal tracking-[-0.48px] cursor-pointer px-6 hover:bg-[#004130] bg-[#00543D] rounded-full text-white hover:text-white/90 text-base font-semibold"
                  >
                    Why PIC
                  </Link>
                  <Link
                    href="/pic-x"
                    className="pt-3.5 pb-3 text-center md:text-start leading-normal dark:bg-white dark:hover:bg-white/80 dark:hover:text-black/80 dark:text-black tracking-[-0.48px] cursor-pointer px-6 border hover:border-[#EDEDED]/75 border-[#EDEDED] rounded-full text-black hover:text-black/60 text-base font-semibold"
                  >
                    PIC-X
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
    hidden lg:block absolute z-50 left-0 right-0 bottom-0 h-80
    bg-[linear-gradient(180deg,rgba(250,250,250,0)_0%,#FAFAFA_80.6%)]
    dark:bg-[linear-gradient(180deg,rgba(26,26,28,0)_0%,#1A1A1C_80.6%)]
  "
        />
        {/* Left */}
        <div
          className="
    hidden absolute z-50 top-0 bottom-0 min-[1440px]:block -left-12 w-24
    bg-[linear-gradient(90deg,#FFFFFF_80.6%,rgba(250,250,250,0)_100%)]
    dark:bg-[linear-gradient(90deg,#1A1A1C_80.6%,rgba(26,26,28,0)_100%)]
  "
        />
        {/* Right */}
        <div
          className="
    hidden absolute z-50 top-0 bottom-0 min-[1440px]:block -right-12 w-24
    bg-[linear-gradient(270deg,#FFFFFF_80.6%,rgba(250,250,250,0)_100%)]
    dark:bg-[linear-gradient(270deg,#1A1A1C_80.6%,rgba(26,26,28,0)_100%)]
  "
        />
      </div>
    </div>
  );
};
