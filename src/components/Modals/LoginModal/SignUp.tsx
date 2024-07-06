// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AtSign, CircleUser, Wallet, WalletCards } from "lucide-react";
import { useConnectWallet, useLogin, usePrivy } from "@privy-io/react-auth";

import { useCreateUser } from "@/lib/supabase/mutations/useCreateUser";
import { useUpdateUserProfile } from "@/lib/supabase/mutations/updateUser";
import { NewUser } from "@/lib/supabase/types";

import { Input } from "@/components/ui/Input_";
import { Button } from "@/components/ui/Button_";
import { Avatar, AvatarImage } from "@/components/ui/avatar";



export function SignUp({ setStep }: { setStep: (step: number) => void }) {
  const createUserMutation = useCreateUser();
  const { mutate: updateUserProfile, isError } = useUpdateUserProfile();

  const handleCreateUser = async (userData: NewUser) => {
    try {
      const newUser = {
        external_auth_provider_user_id: userData.id, // Use the ID from the user object
      };

      const response = await createUserMutation.mutateAsync(newUser);
      console.log("User created successfully", response);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount
    ) => {
      try {
        console.log("login completed", user);
        if (isNewUser) {
          handleCreateUser({
            id: user.id,
            liquiditypoints: 0,
            rewardpoints: 0,
          });
          const hasTwitterLinked = user.linkedAccounts.some(
            (account) => account.type === "twitter_oauth"
          );

          if (hasTwitterLinked) {
            const twitterAccount = user.linkedAccounts.find(
              (account) => account.type === "twitter_oauth"
            );
            const getLargeProfileImageUrl = (url: string) => {
              return url.replace("_normal", "_400x400");
            };

            const profilePictureUrl = getLargeProfileImageUrl(
              twitterAccount.profile_picture_url
            );
            const name = twitterAccount.name;
            const pfp = profilePictureUrl;

            const userId = user?.id;
            updateUserProfile({
              userId,
              updates: {
                name,
                pfp,
                socials: {
                  twitter: {
                    username: twitterAccount.username,
                    name: name,
                    pfp: profilePictureUrl,
                  },
                },
              },
            });
          }
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    onError: (error) => {
      console.log("OAuth error", error);
    },
    onOAuthLoginComplete: (oAuthTokens) => {
      console.log("OAuth login complete:", oAuthTokens);
    },
  });

  const { connectWallet } = useConnectWallet();
  const [isEmail, setIsEmail] = useState<boolean>(false);

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
          <div className="text-[lightgray] flex   text-base/[1.14rem]  items-center  text-[1rem] mb-4 mt-2  mx-[1.65rem]">
            Sign in to Blitz using your web3 wallet or with your email or social
            accounts.
          </div>
          <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 rounded-full" />

          <motion.div onClick={connectWallet} whileTap={{ scale: 0.9 }}>
            <Button className="w-[80vw] stroke-[lightgray] text-[lightgray] h-12 my-0 space-x-2 mx-5 mb-6 bg-[#282828] flex items-center text-lg font-bold rounded-xl">
              <Wallet size={22} strokeWidth={2.5} />
              <div>Sign in with Wallet</div>
            </Button>
          </motion.div>
          <div className="w-[70vw] mx-9 justify-between flex mb-7 items-center">
            <motion.div onClick={login} whileTap={{ scale: 0.9 }}>
              <Avatar className="bg-black   h-12 w-12">
                <AvatarImage src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ma7zd8j9hfh1rccf0yr1" />
              </Avatar>
            </motion.div>
            <motion.div onClick={login} whileTap={{ scale: 0.9 }}>
              <Avatar className="bg-[#171717]   h-12 w-12">
                <AvatarImage src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
              </Avatar>
            </motion.div>
            <motion.div onClick={login} whileTap={{ scale: 0.9 }}>
              <Avatar className="bg-black   h-12 w-12">
                <AvatarImage src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg" />
              </Avatar>
            </motion.div>
          </div>
        </>
      )}
      {isEmail && (
        <EmailLogin setIsEmail={setIsEmail} setStep={setStep} />
      )}
    </motion.div>
  );
}

function EmailLogin({ setIsEmail, setStep }: {
  setIsEmail: (isEmail: boolean) => void;
  setStep: (step: number) => void;
}) {
  const [state, setState] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleLogin = async (email: string, verificationCode: string) => {
    // verify email and connect

    setStep(2);
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
                setStep(1);
                setIsEmail(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]">
                Back
              </Button>
            </motion.div>

            <motion.div
              onClick={() => {}}
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
            className="w-[81vw] mb-4 mt-2 rounded-xl mx-5 text-gray-400 text-[1.15rem] p-3 "
          />
          <div className="flex items-center ml-5 my-6 justify-between mx-6">
            <motion.div
              onClick={() => {
                setStep(1);
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
              onClick={() => {}}
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
