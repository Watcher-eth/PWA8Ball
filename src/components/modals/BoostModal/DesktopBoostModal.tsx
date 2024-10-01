// @ts-nocheck

import { Input } from "@/components/ui/Input"
import React, { useState } from "react"
import { ConfirmButton } from "./ConfirmButton"
import { DesktopCardModal } from "../DesktopCardModal"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
export function DesktopBoostContent(props: {
  image: string
  id: string
  onComplete: () => void
}) {
  const [amount, setAmount] = useState<number>()
  return (
    <div className="flex flex-col p-2 ">
      <img className="h-14 w-14 object-cover rounded-full" src={props?.image} />
      <div className="text-white text-[1.5rem] font-semibold mt-4 ">
        Boost and earn fees
      </div>
      <div className="text-[lightgray] text-[0.95rem] font-medium mb-3  ">
        Boost this market to improve it's accuracy and earn fees. The more
        popular a prediction gets the more fees you receive.
      </div>
      <div className="h-[0.1rem] w-full bg-[#212121] mt-2 mb-5" />
      <BoostInfoRow label="Minimum Boost" content="$10.00" />
      <BoostInfoRow
        label="Fee Rewards Rate"
        content={
          <div className="text-white font-medium text-base px-2 py-1 rounded-md bg-[#FF0050]">
            0.5%
          </div>
        }
      />
      <BoostInfoRow label="Cred Bonus" content="150 Cred" />
      <Input
        onChange={(e) => setAmount(e.target.value)}
        className=" my-5 actvive:border-0 border-[#212121] rounded-md text-white p-6 bg-[#151515] font-medium px-3 text-[1.15rem]"
        placeholder="Amount"
        type="number"
      />
      <ConfirmButton
        id={props?.id}
        onComplete={props?.onComplete}
        amount={amount}
      />
    </div>
  )
}

export function BoostInfoRow({
  label,
  content,
  children,
}: {
  label: string
  content?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-row items-center justify-between my-3">
      <div className="text-[#909090] font-medium text-[1.1rem]">{label}</div>

      <div className="text-white font-medium text-[1.1rem]">{content}</div>
      {children}
    </div>
  )
}
export function DesktopBoostModal({
  children,
  image,
  id,
}: {
  children: React.ReactNode
  image: string
  id: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} className={`!rounded-[1.5rem] `}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
          p-0 bg-transparent  border-0
          rounded-2xl xl:max-w-[29vw] backdrop-blur-lg
        `}
      >
        <motion.div layout transition={{ duration: 0.3 }}>
          <AnimatePresence>
            <Card
              className={`
            shadow-none !p-0 w-full border-white/10
            rounded-2xl  !bg-[#080808]/85 px-0 xl:max-w-[29vw] min-h-[50vh]
          `}
            >
              <CardContent className={`p-6 rounded-2xl `}>
                <DesktopBoostContent
                  image={image}
                  id={id}
                  onComplete={() => {
                    setOpen(false)
                  }}
                />
              </CardContent>
            </Card>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
