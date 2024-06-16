import React, { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ConnectKitButton } from "connectkit";
import { ConnectWallet, shortenAddress } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { AtSign, CircleUser, WalletCards } from "lucide-react";
import { useEmbeddedWallet } from "@thirdweb-dev/react"; // or /react-native
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";

function SingUp(props: { setStep: (step: number) => void }) {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const { connect } = useEmbeddedWallet();
  const { address } = useAccount();

  const handleLogin = async (method: number) => {
    if (method === 2) {
      await connect({
        strategy: "google",
      });
    }
    if (method === 1) {
      await connect({
        strategy: "facebook",
      });
    }
    if (method === 3) {
      await connect({
        strategy: "apple",
      });
    }
    if (address) props.setStep(2);
  };

  //Cancle to go back
  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  return (
    <motion.div
      key="step3"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {!isEmail && (
        <>
          <div className="text-gray-400 flex   text-base/[1.14rem]  items-center  text-[1rem] mb-4 mt-2 font-bold mx-[1.65rem]">
            Sign in to Blitz using an existing wallet or with your email or
            social accounts.
          </div>
          <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 rounded-full" />
          <ConnectKitButton.Custom>
            {({
              isConnected,
              isConnecting,
              show,
              hide,
              address,
              ensName,
              chain,
            }) => {
              if (isConnected) {
                props.setStep(2);
              }
              return (
                <Button
                  style={{}}
                  onClick={show}
                  className="w-[80vw] stroke-gray-700 text-gray-700 h-12 my-0 space-x-2 mx-5 mb-4 bg-gray-200 flex items-center text-lg font-bold rounded-xl"
                >
                  <WalletCards size={23} strokeWidth={2.5} />
                  <div>
                    {isConnected ? shortenAddress(address) : "Connect Wallet"}
                  </div>
                </Button>
              );
            }}
          </ConnectKitButton.Custom>
          <motion.div
            onClick={() => {
              props.setStep(6);
              setIsEmail(true);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Button className="w-[80vw] stroke-gray-700 text-gray-700 h-12 my-0 space-x-2 mx-5 mb-6 bg-gray-200 flex items-center text-lg font-bold rounded-xl">
              <AtSign size={22} strokeWidth={2.5} />
              <div>Sign in with Email</div>
            </Button>
          </motion.div>
          <div className="w-[70vw] mx-9 justify-between flex mb-7 items-center">
            <motion.div
              onClick={() => handleLogin(1)}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar className="bg-black   h-12 w-12">
                <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" />
              </Avatar>
            </motion.div>
            <motion.div
              onClick={() => handleLogin(2)}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar className="bg-white   h-12 w-12">
                <AvatarImage src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
              </Avatar>
            </motion.div>
            <motion.div
              onClick={() => handleLogin(3)}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar className="bg-black   h-12 w-12">
                <AvatarImage src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg" />
              </Avatar>
            </motion.div>
          </div>
        </>
      )}
      {isEmail && (
        <EmailLogin setIsEmail={setIsEmail} setStep={props.setStep} />
      )}
    </motion.div>
  );
}

function EmailLogin(props: {
  setIsEmail: (isEmail: boolean) => void;
  setStep: (step: number) => void;
}) {
  const { connect, sendVerificationEmail } = useEmbeddedWallet();
  const [state, setState] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const preLogin = async (email: string) => {
    // send email verification code
    await sendVerificationEmail({ email });
    setState(2);
  };
  const handleLogin = async (email: string, verificationCode: string) => {
    // verify email and connect
    await connect({
      strategy: "email_verification",
      email,
      verificationCode,
    });
    props.setStep(2);
  };

  //Cancle to go back

  return (
    <motion.div key="step3" initial="initial" animate="animate" exit="exit">
      {state === 1 && (
        <>
          <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
            Sign in with email
          </div>
          <div className="text-gray-400 flex   text-base/[1.14rem]  items-center  text-[1rem] mb-4  font-bold mx-[1.65rem]">
            Sign in with your email to create your Blitz account.
          </div>
          <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 rounded-full" />
          <div className="text-gray-900 text-[1.1rem] font-bold mt-3 mx-6">
            Email
          </div>
          <Input
            type="email"
            placeholder="youremail@shloms.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ border: "0.2px solid lightgray" }}
            className="w-[81vw] mb-4   mt-2 rounded-xl mx-5 text-gray-400 text-[1.15rem] p-3 "
          />
          <div className="flex items-center ml-5 my-6 justify-between mx-6">
            <motion.div
              onClick={() => {
                props.setStep(1);
                props.setIsEmail(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]">
                Back
              </Button>
            </motion.div>

            <motion.div
              onClick={() => preLogin(email)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="active:bg-gray-900 hover:bg-gray-900 bg-gray-900 text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
                Send Code
              </Button>
            </motion.div>
          </div>{" "}
        </>
      )}
      {state === 2 && (
        <>
          <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
            Verify your email
          </div>
          <div className="text-gray-400 flex   text-base/[1.14rem]  items-center  text-[1rem] mb-4  font-bold mx-[1.65rem]">
            We sent you a verification code. Please copy it to verify your
            email.
          </div>
          <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 rounded-full" />
          <div className="text-gray-900 text-[1.1rem] font-bold mt-3 mx-6">
            Verification code
          </div>
          <Input
            type="email"
            placeholder="XXXXXXXXX"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            style={{ border: "0.2px solid lightgray" }}
            className="w-[81vw] mb-4   mt-2 rounded-xl mx-5 text-gray-400 text-[1.15rem] p-3 "
          />
          <div className="flex items-center ml-5 my-6 justify-between mx-6">
            <motion.div
              onClick={() => {
                props.setStep(1);
                setState(1);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]">
                Back
              </Button>
            </motion.div>

            <motion.div
              onClick={() => handleLogin(email, code)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="active:bg-gray-900 hover:bg-gray-900 bg-gray-900 text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
                Verify
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default SingUp;
