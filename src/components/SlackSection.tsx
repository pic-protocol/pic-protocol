import Logo from "../../static/img/logo.svg";

export const SlackSection = () => {
  return (
    <div
      id="tw-scope"
      className="pt-18 pb-6 md:pt-12 md:pb-20 lg:pt-30 lg:pb-30 px-6 xl:px-30 dark:bg-[#1F1F21]"
    >
      <div className="max-w-120 md:max-w-300 mx-auto w-full bg-[#00543D] rounded-4xl p-12 md:p-16 md:py-15 grid grid-cols-1 md:grid-cols-12 gap-x-16 justify-between items-center overflow-hidden">
        <div className="flex flex-col col-span-1 md:col-span-7">
          <h1 className="text-center md:text-start text-white font-medium font-[Clash_Grotesk]! text-[32px] mb-4 leading-none tracking-[-0.64px]">
            Join Our Slack Community!
          </h1>
          <p className="text-center md:text-start text-white font-light max-w-126 text-[18px] leading-normal tracking-[-0.36px] mb-6">
            Join the conversation on authority models, distributed execution, and the future of authorization. Open to researchers, engineers, and contributors.
          </p>
          <a
            href="https://join.slack.com/t/picprotocol/shared_invite/zt-3ncso53dt-6NOORKgZnbQkMpmZinJJsA"
            target="_blank"
            className="text-center ml-auto md:ml-0 mr-auto leading-none py-3.5 bg-white hover:bg-white/80 hover:text-black/80 text-black tracking-[-0.48px] cursor-pointer px-6 border hover:border-[#EDEDED]/75 border-[#EDEDED] rounded-full text-black hover:text-black/60 text-base font-semibold"
          >
            Join Community
          </a>
        </div>
        <div className="col-span-1 md:col-span-5 flex justify-center">
          <div className="p-19.5 bg-white/2 rounded-full -mt-35 -mb-45 sm:-mb-40 md:-my-50 md:-ml-28 lg:-ml-26">
            <div className="p-19.5 bg-white/2 rounded-full">
              <div className="h-67.5 w-67.5 bg-white/2 rounded-full flex justify-center items-center">
                <Logo className="text-white w-31.5 h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
