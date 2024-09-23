// @ts-nocheck
import { motion, useAnimation } from "framer-motion"
import { Check, Loader } from "lucide-react"
import { useExecuteBoost } from "@/hooks/actions/useExecuteBoost"
import { useEffect } from "react"

export function ConfirmButton({
  onComplete,
  buttonText = "Confirm",
  id,
  amount,
}) {
  const controls = useAnimation()
  const { executeBoost, loading, success } = useExecuteBoost()

  function handleClick() {
    executeBoost({ id, amount })
    controls.start({
      width: "100%",
      transition: { duration: 0.5 },
    })
  }

  useEffect(() => {
    if (success)
      setTimeout(() => {
        onComplete()
      }, 4500)
  }, [success])
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
          buttonText
        )}
      </span>
    </motion.button>
  )
}
