// @ts-nocheck
import { motion, useAnimation } from "framer-motion";
import { Check, Loader } from "lucide-react";
import { useExecuteBoost } from "@/hooks/actions/useExecuteBoost";
import { useEffect } from "react";
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance";
import { useUserStore } from "@/lib/stores/UserStore";

export function ConfirmButton(props: {
  onComplete;
  buttonText: string;
  id;
  amount: number;
  setStep: () => void;
}) {
  const { onComplete, buttonText, id, amount, setStep } = props;
  const controls = useAnimation();
  const { executeBoost, loading, success } = useExecuteBoost();
  const { user } = useUserStore();
  const userBalance = useUsdcBalance({ address: user?.walletAddress });
  function handleClick() {
    if (userBalance >= BigInt(amount)) {
      setStep(2);
      return;
    }
    executeBoost({ id, amount });
    controls.start({
      width: "100%",
      transition: { duration: 0.5 },
    });
  }

  useEffect(() => {
    if (success)
      setTimeout(() => {
        onComplete();
      }, 4500);
  }, [success]);
  return (
    <motion.button
      className="relative w-full rounded-full h-[3.2rem] bg-[#151515] border border-[#212121] shadow-md overflow-hidden flex items-center justify-center p-px cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#FF0050]"
        animate={controls}
        style={{
          width: success ? "100%" : "0%",
          borderRadius: "24px",
        }}
      />
      <span className="relative z-10 text-lg font-bold text-white">
        {loading ? (
          <Loader color="lightgray" strokeWidth={3} className="animate-spin" />
        ) : success ? (
          <Check className="text-white" />
        ) : (
          buttonText ?? "Confirm"
        )}
      </span>
    </motion.button>
  );
}
