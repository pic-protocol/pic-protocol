import Logo from "../../static/img/logo.svg";

export const SlackSection = () => {
  return (
    <div
      id="tw-scope"
      className="pt-18 pb-6 md:pt-12 md:pb-20 lg:pt-30 lg:pb-30 px-6 xl:px-30 dark:bg-[#1F1F21]"
    >
      <div className="max-w-120 md:max-w-300 mx-auto w-full bg-[#00543D] rounded-4xl p-12 md:p-16 md:py-15 grid grid-cols-1 md:grid-cols-12 gap-x-16 justify-between items-center overflow-hidden relative">
        {/* Dot grid overlay on the CTA card */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="flex flex-col col-span-1 md:col-span-7 relative z-10">
          <span className="mono text-[#25c2a0] text-[10px] tracking-widest uppercase mb-3 opacity-80">
            {"// join_network"}
          </span>
          <h1 className="text-center md:text-start text-white font-medium font-[Clash_Grotesk]! text-[32px] mb-4 leading-none tracking-[-0.64px]">
            Join Our Slack Community
          </h1>
          <p className="text-center md:text-start text-white/80 font-light max-w-126 text-[18px] leading-normal tracking-[-0.36px] mb-6">
            Join the conversation on authority models, distributed execution, and the future of authorization. Open to researchers, engineers, and contributors.
          </p>
          <a
            href="https://join.slack.com/t/picprotocol/shared_invite/zt-3wpt1lro7-poD6BSrcoVbVnyzqX1oxYQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center ml-auto md:ml-0 mr-auto leading-none py-3.5 bg-white hover:bg-white/90 hover:text-black/80 text-black tracking-[-0.48px] cursor-pointer px-6 border border-white/20 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
          >
            Join Community →
          </a>
        </div>
        <div className="col-span-1 md:col-span-5 flex justify-center relative z-10">
          <div className="p-19.5 bg-white/2 rounded-full -mt-35 -mb-45 sm:-mb-40 md:-my-50 md:-ml-28 lg:-ml-26 border border-white/5">
            <div className="p-19.5 bg-white/2 rounded-full border border-white/5">
              <div className="h-67.5 w-67.5 bg-white/3 rounded-full flex justify-center items-center border border-white/5">
                <Logo className="text-white w-31.5 h-auto opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
