import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

import { Spinner } from "./Spinner"
import { X } from "lucide-react"

export function MobileLoadingPrediction({
  image,
  question,
  answer,
  loading,
  success,
}: {
  image: string
  question: string
  answer: string
  option: string
  loading: boolean
  success: boolean
}) {
  const controls = useLoadingAnimationControls()
  return (
    <div className="flex flex-col items-center justify-center w-full h-[430px]">
      <motion.img
        src={image}
        alt="Prediction"
        className="absolute top-[-15px] object-cover w-full h-[425px] rounded-t-[30px] mb-6"
      />
      <motion.div
        className="absolute top-[-15px] w-full h-[425px] rounded-t-[30px] mb-6"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(13, 13, 13, 0.8), #131313)",
        }}
      />

      <motion.img
        src={image}
        alt="Prediction"
        className="rounded-xl mb-6 object-cover mt-14 z-10"
        animate={controls}
        initial={{ height: 0, width: 0 }}
      />

      <motion.p
        className="text-lg font-bold text-white z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        Submitting your Prediction
      </motion.p>
      <motion.p
        className="text-md mt-1 text-[#858585] text-center px-7 font-normal z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {question}
      </motion.p>
      <motion.p
        className="text-5xl mt-4 text-white font-bold z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {answer}
      </motion.p>
      <div className="absolute bottom-[9rem]">
        <Spinner success={success} loading={loading} />
      </div>
    </div>
  )
}

export function DesktopLoadingPrediction({
  image,
  question,
  answer,
  loading,
  success,
  setStep,
}: {
  image: string
  question: string
  answer: string
  loading: boolean
  success: boolean
  setStep: (value: number) => void
}) {
  const controls = useLoadingAnimationControls()

  return (
    <div className="flex flex-col items-center rounded-lg bg-[#090909] border-[0.3rem] border-[#212121]   justify-center w-full h-full overflow-hidden">
      {/* <div className=""> */}
      <motion.img
        src={image}
        alt="Prediction"
        className="w-full  h-[80%]  rounded-lg object-cover absolute border-[0.1rem]  border-[#212121] inset-0"
      />
      <motion.div className="w-full h-[80%] border-[0.1rem]  border-[#212121]  rounded-lg  absolute inset-0 backdrop-blur-xl" />
      <motion.div
        className="absolute inset-0 rounded-lg w-full h-[80%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(9, 9, 9, 0.8), #090909)",
        }}
      />
      <motion.div
        onClick={() => setStep(0)}
        whileTap={{ scale: 0.9 }}
        className=" p-2 z-3 absolute  top-6 right-6 rounded-full self-start bg-[#282828]/30"
      >
        <X size={15} className="stroke-[lightgray]" strokeWidth={5} />
      </motion.div>
      <motion.img
        src={image}
        alt="Prediction"
        className="rounded-md mb-6 object-cover mt-16 z-10"
        animate={controls}
        initial={{ height: 0, width: 0 }}
      />
      <motion.p
        className="text-lg font-bold text-white z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        Submitting your Prediction
      </motion.p>
      <motion.p
        className="text-md mt-1 text-[#858585] text-center px-7 font-normal z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {question}
      </motion.p>
      <motion.p
        className="text-5xl mt-9 text-white mb-2 font-bold z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {answer}
      </motion.p>
      <div className="absolute bottom-[8rem] "></div>
    </div>
  )
}

function useLoadingAnimationControls() {
  const controls = useAnimation()
  async function sequence() {
    await controls?.start({
      height: 100,
      width: 100,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    })
    await controls?.start({ opacity: 1, transition: { delay: 0.3 } })
    await controls?.start({ opacity: 1, transition: { delay: 0.6 } })
  }

  useEffect(() => {
    sequence()
  }, [controls])

  return controls
}
