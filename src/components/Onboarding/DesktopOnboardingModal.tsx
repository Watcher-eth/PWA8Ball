// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { Input } from "../ui/Input";
import { Instagram, Phone, Twitch, Twitter } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
export function DesktopOnboardingModal({ children }: { children: ReactNode }) {
  return (
    <Dialog className="!rounded-[1.5rem]">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`
          p-0 bg-[#080808]/[0.8] min-h-[50vh] min-w-[55vw] border-0 border-[#181818]
          !rounded-[1.5rem]
        `}
      >
        <Card className="shadow-none bg-[#080808] w-full border-2  border-[#181818] rounded-[1.5rem]">
          <CardContent className="p-6 rounded-2xl ">
            <DesktopOnboarding />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

function DesktopOnboarding() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg w-[55vw] max-w-[55vw]">
      <div className="flex flex-col items-center justify-center w-1/2 -ml-3 mr-4 p-8 bg-[#080808] text-white">
        <img
          src={"/images/OrbLogo.png"}
          className="flex items-center justify-center w-14 h-14 mb-3 rounded-full"
        ></img>
        <h2 className="text-2xl font-bold mb-2">Welcome to 8Ball</h2>
        <p className="text-center mb-6 px-6 text-[lightgray]">
          Sign up with your email or connect a Web3 wallet to start predicting
          the future.
        </p>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4 w-full bg-[#212121] text-white"
        />
        <div className="flex justify-between w-full  rounded-[0.5rem]  mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className=" p-3 bg-[#212121] border-2 border-[#272727] w-[5vw] justify-center items-center flex rounded-[0.4rem] text-white"
            onClick={login}
          >
            <Twitch className="w-5 h-5" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={login}
            className=" p-3 bg-[#212121] border-2 border-[#272727] w-[5vw] justify-center items-center flex rounded-[0.4rem] text-white"
          >
            <Twitter className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={login}
            className=" p-3 bg-[#212121] border-2 border-[#272727] w-[5vw] justify-center items-center flex rounded-[0.4rem] text-white"
          >
            <Instagram className="w-5 h-5" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={login}
            onClick={login}
            className=" p-3 bg-[#212121] border-2 border-[#272727] w-[5vw] justify-center items-center flex rounded-[0.4rem] text-white"
          >
            <Phone className="w-5 h-5" />
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={login}
          className="w-full mb-4"
        >
          <div
            variant="outline"
            className="w-full rounded-[0.5rem] p-2 flex flex-row items-center border-2 border-[#272727] bg-[#212121] text-white"
          >
            <img
              src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png"
              className="w-5 h-5 mr-2"
            />
            Coinbase
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={login}
          className="w-full mb-4"
        >
          <div
            variant="outline"
            className="w-full rounded-[0.5rem] p-2 flex flex-row items-center border-2 border-[#272727] bg-[#212121] text-white"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
              className="w-5 h-5 mr-2"
            />
            MetaMask
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={login}
          className="w-full mb-4"
        >
          <div
            variant="outline"
            className="w-full rounded-[0.5rem] p-2 flex flex-row items-center border-2 border-[#272727] bg-[#212121] text-white"
          >
            <img
              src="https://api.nuget.org/v3-flatcontainer/walletconnect.auth/2.3.8/icon"
              className="w-5 h-5 mr-2"
            />
            WalletConnect
          </div>
        </motion.div>
        <div className="flex justify-between w-full mt-4 text-sm text-[lightgray]">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Download
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            Discord
          </a>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="/images/OnboardingImage.png"
          alt="Onboarding illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
