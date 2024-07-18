// @ts-nocheck
import { Copy, Gift, Share as ShareIcon } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { CashoutConfirmScreen } from "../Predictions/Cashout/confirm";

interface Option {
  name: string;
  value: number;
}

export const ShareBetModal = ({
  id,
  title,
  image,
  topic,
  question,
  options,
  isDesktop,
}: {
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: Option[];
  isDesktop?: boolean;
}) => {
  const shareLink = async () => {
    try {
      await navigator.share({
        title: `${title} on Blitz`,
        text: "This prediction on Blitz is wild! Check it out",
        url: `https://pwa-8-ball.vercel.app/p/${id}`,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };

  return (
    <div
      className={`${
        isDesktop ? "h-[65vh]" : "h-[110%]"
      } w-full flex flex-col p-5 ${
        isDesktop ? "bg-[#080808]" : "bg-[#121212]"
      } ${isDesktop ? "pt-5" : "pt-10"}  rounded-t-[20px]`}
    >
      <h1 className="text-4xl font-semibold text-white mb-[-2]">More fun</h1>
      <div className="flex flex-row items-center mt-2">
        <div className="flex flex-row items-center mx-[10px]">
          <img
            src="/images/Guy1Memoji.png"
            alt="Guy1 Memoji"
            className="size-10 rounded-full ml-[-10px]"
          />
          <img
            src="/images/LadyMemoji.png"
            alt="Lady Memoji"
            className="size-10 rounded-full ml-[-10px]"
          />
          <img
            src="/images/Guy2Memoji.png"
            alt="Guy2 Memoji"
            className="size-10 rounded-full ml-[-10px]"
          />
        </div>
        <h1 className="text-4xl font-semibold text-white mb-[-2]"> together</h1>
      </div>
      <p
        style={{ lineHeight: "1.4rem" }}
        className="text-[1.1rem] mb-2 mt-4 text-lightgrey mt-2"
      >
        Invite your friends and earn points when they make their first
        prediction
      </p>
      <AnimatedPresence>
        {!isDesktop ? (
          <div
            className={`w-full rounded-[20px] bg-[#121212] shadow-lg flex flex-col p-5 mt-16`}
          >
            <div className="flex flex-row items-center mb-4 mt-2">
              <img
                src={image}
                alt={title}
                className="h-11 w-11 rounded-[4px] mr-2.5 object-cover"
              />
              <div>
                <h2 className="text-lg text-white">{title}</h2>
                <p className="text-base -mt-1 text-[lightgrey]">/{topic}</p>
              </div>
            </div>
            <h2
              style={{ lineHeight: "1.8rem" }}
              className="text-[1.4rem] text-white leading-none"
            >
              {question}
            </h2>
            <div className="flex flex-row justify-center mt-4 mb-1 gap-2.5">
              <button className="w-[50.5%] p-3 flex flex-row items-baseline justify-center rounded-[10px] bg-[#FF0050] gap-1">
                <span className="text-xl text-white font-medium">
                  {options[0]?.name}
                </span>
                <span className="text-sm text-lightgrey">
                  /{options[0]?.value / 100}%
                </span>
              </button>
              <button className="w-[50.5%] p-3 flex flex-row items-baseline justify-center rounded-[10px] bg-[#0050FF] gap-1">
                <span className="text-xl text-white font-medium">
                  {options[1].name}
                </span>
                <span className="text-sm text-lightgrey">
                  /{options[1].value / 100}%
                </span>
              </button>
            </div>
          </div>
        ) : (
          <CashoutConfirmScreen
            option={1}
            options={options}
            image={image}
            question={question}
            title={title}
            setStep={() => {}}
            id={id}
            isDesktop={true}
            multiplier={3}
            points={2}
            odds={options[0]?.value / 100}
          />
        )}
      </AnimatedPresence>
      <div className="flex flex-row items-center mt-8 self-center justify-between w-[85%] absolute bottom-4 ">
        <button
          className="mt-3 p-3 rounded-[24px] bg-[#151515] w-[45%] flex flex-row items-center justify-center gap-1"
          onClick={() => copyToClipboard("share bet")}
        >
          <Copy height={20} color={"#D9D9D9"} strokeWidth={3} />
          <span className="text-xl text-[#D9D9D9] font-extrabold">Copy</span>
        </button>
        <button
          className="mt-3 p-2.5 rounded-[24px] bg-[#D9D9D9] w-[45%] flex flex-row items-center justify-center transition-transform transform hover:scale-102 active:scale-98"
          onClick={shareLink}
        >
          <ShareIcon height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span className="text-xl text-[#1D1D1D] font-extrabold ml-1">
            Share
          </span>
        </button>
      </div>
      <div className="flex flex-row items-center gap-1 mt-4 self-center transition-transform transform hover:scale-102 active:scale-98">
        <Gift color="lightgrey" size={16} />
        <span className="text-sm text-lightgrey">
          Earn 10% of every point your friend receives
        </span>
      </div>
    </div>
  );
};
