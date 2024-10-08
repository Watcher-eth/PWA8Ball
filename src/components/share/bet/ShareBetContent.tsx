// @ts-nocheck
import { AnimatePresence } from "framer-motion";
import { Copy, Gift, Share as ShareIcon } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { CashoutConfirmScreen } from "@/components/predictions/cashout/CashoutConfirmScreen";
import { useUserStore } from "@/lib/stores/UserStore";
import { DrawerClose } from "@/components/ui/drawer";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";

interface Option {
  name: string;
  value: number;
}

export function ShareBetContent({
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
}) {
  const { user } = useUserStore();
  const shareLink = async () => {
    try {
      await navigator.share({
        title: `${title} on Glimpse`,
        text: "This prediction on Glimpse is wild! Check it out",
        url: `https://pwa-8-ball.vercel.app/p/${id}?ref=${user?.walletAddress}`,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };
  return (
    <div
      className={`
        w-full flex flex-col p-5
        rounded-t-[20px] bg-[transparent] justify-between
        ${isDesktop ? "h-full  pt-5" : "h-[110%] pt-7"}
      `}
    >
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold text-white mb-[-2]">More fun</h1>
        <div className="flex flex-row items-center mt-2">
          <div className="flex flex-row items-center mx-2.5">
            <img
              src="/images/Guy1Memoji.png"
              alt="Guy1 Memoji"
              className="size-10 rounded-full -ml-2.5"
            />
            <img
              src="/images/LadyMemoji.png"
              alt="Lady Memoji"
              className="size-10 rounded-full -ml-2.5"
            />
            <img
              src="/images/Guy2Memoji.png"
              alt="Guy2 Memoji"
              className="size-10 rounded-full -ml-2.5"
            />
          </div>
          <h1 className="text-4xl font-semibold text-white "> together</h1>
        </div>
        <p className="text-[1.15rem] leading-6  text-[lightgray] mt-3.5">
          Share this prediction your friends and earn rewards when they make a
          prediction.
        </p>
      </div>
      <AnimatePresence>
        <div
          className={`w-full rounded-[20px] bg-[#121212] border-[0.1rem] border-[#151515] shadow-lg flex flex-col p-5 my-20 `}
        >
          <div className="flex flex-row items-center mb-4 mt-2">
            <img
              src={image}
              alt={title}
              className="h-14 w-14 rounded-[10px] mr-2.5 object-cover"
            />
            <div>
              <h2 className="text-lg text-white font-[500]">{title}?</h2>
              <p className="text-base -mt-0.5 text-[lightgrey]">/{topic}</p>
            </div>
          </div>
          <h2
            style={{ lineHeight: "2.15rem" }}
            className="text-[1.65rem] text-white font-[600] my-1.5 "
          >
            {question}
          </h2>
          <div className="flex flex-row justify-center mt-4 mb-1 gap-2.5">
            <OutcomeButton
              option={1}
              text={options[1]?.name}
              multiplier={options[1]?.value}
            />
            <OutcomeButton
              option={0}
              text={options[0]?.name}
              multiplier={options[0]?.value}
            />
          </div>
        </div>
      </AnimatePresence>
      <div className="flex flex-col ">
        <div className="flex flex-row items-center mt-0 self-center  justify-between  gap-5 w-[100%]  ">
          <DrawerClose className="mt-3 p-3 rounded-[24px] bg-[#151515] w-full flex flex-row items-center justify-center gap-1">
            <button
              className="flex flex-row items-center justify-center gap-1"
              onClick={() =>
                copyToClipboard(
                  `https://pwa-8-ball.vercel.app/p/${id}?ref=${user?.walletAddress}`
                )
              }
            >
              <Copy height={20} color={"#D9D9D9"} strokeWidth={3} />
              <span className="text-xl text-[#D9D9D9] font-extrabold">
                Copy
              </span>
            </button>
          </DrawerClose>
          <button
            className="mt-3 p-2.5 rounded-[24px] bg-[#D9D9D9] w-full flex flex-row items-center justify-center transition-transform transform hover:scale-102 active:scale-98"
            onClick={shareLink}
          >
            <ShareIcon height={20} color={"#1D1D1D"} strokeWidth={3} />
            <span className="text-xl text-[#1D1D1D] font-extrabold ml-1">
              Share
            </span>
          </button>
        </div>
        <div className="flex flex-row items-center gap-1 mt-4 -mb-4 self-center transition-transform transform hover:scale-102 active:scale-98">
          <Gift color="gray" size={16} />
          <span className="text-sm text-[gray]">
            Earn 10% of every point your friend receives
          </span>
        </div>
      </div>
    </div>
  );
}
