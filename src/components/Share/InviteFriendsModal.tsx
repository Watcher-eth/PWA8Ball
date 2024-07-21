// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useQuery } from "@airstack/airstack-react";
import { convertIpfsUrl } from "@/utils/urls/modifyIpfsUrl";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
import { useUpdateUserProfile } from "@/supabase/mutations/updateUser";
import { useRouter } from "next/router";
import { useLinkAccount } from "@privy-io/react-auth";
import { DesktopCardModal } from "../Modals/DesktopCardModal";
import { Spinner } from "../Modals/PredictModal/Spinner";

export const FindFriends = ({ type }) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const { width, height } = { width: 800, height: 600 }; // Example dimensions
  const { mutate: updateUserProfile, isError } = useUpdateUserProfile();
  const { data, error, loading } = useQuery(
    onchainFollowingQuery2,
    {},
    { cache: false }
  );

  useEffect(() => {
    if (text === "") {
      setResults(data?.SocialFollowings?.Following || []);
    } else {
      const filteredResults = data?.SocialFollowings?.Following.filter(
        (item) =>
          item.followingAddress.socials[0].profileName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          item.followingAddress.socials[0].profileHandle
            .toLowerCase()
            .includes(text.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [text, data]);

  const handleTextChange = (text) => {
    setText(text); // Update text input state
  };

  const { linkTwitter, linkWallet } = useLinkAccount({
    async onSuccess(user) {
      const twitterAccount = user.linkedAccounts.find(
        (account) => account.type === "twitter_oauth"
      );
      if (twitterAccount) {
        try {
          const userId = user.id;
          const profilePictureUrl = twitterAccount.profile_picture_url.replace(
            "_normal",
            "_400x400"
          );
          await updateUserProfile({
            userId,
            updates: {
              name: twitterAccount.name,
              pfp: profilePictureUrl,
              socials: {
                twitter: {
                  username: twitterAccount.username,
                  name: twitterAccount.name,
                  pfp: profilePictureUrl,
                },
              },
            },
          });
        } catch (error) {
          console.error("Error updating user profile:", error);
        }
      }
    },
  });

  const { linkFarcaster } = useLinkAccount({
    async onSuccess(user) {
      const farcasterAcc = user.linkedAccounts.find(
        (account) => account.type === "farcaster"
      );
      try {
        const userId = user.id;
        await updateUserProfile({
          userId,
          updates: {
            name: farcasterAcc.display_name,
            pfp: farcasterAcc.profile_picture,
            socials: {
              farcaster: {
                fid: farcasterAcc.fid,
                username: farcasterAcc.username,
                name: farcasterAcc.display_name,
                owner_address: farcasterAcc.owner_address,
                pfp: farcasterAcc.profile_picture,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    onError(error) {
      console.log("OAuth error", error);
    },
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="top-20">
          <Spinner loading={true} />
        </div>
      </div>
    );
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  const dataToRender =
    text === "" ? data?.SocialFollowings?.Following : results;
  const router = useRouter();
  return (
    <div
      className={`
        flex flex-col items-center w-full  rounded-t-[20px] bg-[#080808]
      `}
    >
      <p
        className={`
          text-[19px] pt-[58px] text-white font-bold -mt-5 relative -top-2.5
        `}
      >
        {type === 1 ? "Find your friends" : "Invite your friends"}
      </p>

      <input
        selectionColor={"#FF0050"}
        placeholderTextColor={"gray"}
        className={`
          flex
          text-[18px] w-[90%]
          p-2.5 mt-[15px] mx-[10px] mb-0
          bg-[rgb(24,24,24)] text-[lightgray] rounded-[20px]
        `}
        onChange={(e) => handleTextChange(e.target.value)}
        value={text}
        placeholder="Search..."
      />
      <p
        className={`
          text-[16px] text-[lightgray] font-semibold
          mb-3 ml-[22px] mt-[18px]
          self-start
        `}
      >
        Find friends on other apps
      </p>
      <div
        className={`
          flex flex-row items-center justify-between
          w-[90%] rounded-[20px] bg-[rgb(24,24,24)]
          px-[15px] py-2
          h-20
        `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
        >
          <button onClick={() => {}}>
            <img
              className="size-[55px] object-cover rounded-[10px] overflow-hidden"
              src="https://avatars.githubusercontent.com/u/108458858?s=200&v=4"
              alt="social"
            />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
          <button onClick={() => linkTwitter()}>
            <img
              className="size-[55px] object-cover rounded-[10px] overflow-hidden bg-black"
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
              alt="twitter"
            />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.45 } }}
        >
          <button
            onClick={() =>
              linkFarcaster({ relyingParty: "https://tryblitz.xyz" })
            }
          >
            <img
              className="size-[55px] object-cover rounded-[10px] overflow-hidden"
              src="https://s3-alpha.figma.com/hub/file/2654611074/ce2996c3-aa3d-470f-9cd1-ad5d8ddd72c1-cover.png"
              alt="farcaster"
            />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
        >
          <button
            onClick={() => {
              linkWallet();
            }}
          >
            <img
              className="size-[55px] object-cover rounded-[10px] overflow-hidden"
              src="https://publish.one37pm.net/wp-content/uploads/2023/11/Screenshot-2023-11-29-at-2.41.58-PM-e1701286954195.png?resize=630%2C682"
              alt="another social"
            />
          </button>
        </motion.div>
      </div>
      <p
        className={`
          text-[16px] text-[lightgray] font-semibold
          mb-3 ml-[22px] mt-[14px]
          self-start
        `}
      >
        People you may know
      </p>
      <div
        className="w-[88%] overflow-y-scroll"
        style={{ height: height / 1.78 }}
      >
        {dataToRender?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
            key={index}
            className="flex flex-col"
          >
            <FindFriendsItem
              type={type}
              isFollowing={item.isFollowing}
              pfp={item.followingAddress.socials[0]?.profileImage}
              handle={item.followingAddress.socials[0]?.profileHandle}
              name={item.followingAddress.socials[0]?.profileName}
            />
            <div
              className="h-[1px] bg-[rgb(50,50,50)] self-end my-[1px] "
              style={{
                width: width / 1.42,
              }}
            />
          </motion.div>
        ))}
      </div>
      <div
        className={`
          w-full h-[30px]
          absolute bottom-[80px]
        `}
        style={{
          backgroundImage:
            "linear-gradient(rgba(10 ,10 ,10 , 0), rgba(10 ,10 ,10 , 0.6), #080808)",
        }}
      />
      <div
        className={`
          h-[80px] absolute bottom-0
          flex items-center justify-center
          p-2.5 pb-[45px] bg-[#080808]
          w-full
          rounded-b-lg
        `}
      >
        <button
          onClick={() => {
            router.back();
          }}
          className={`
           w-[90%] h-[50px] rounded-[28px]
            overflow-hidden flex items-center justify-center
            bg-[rgb(17,17,17)] mt-[15px]
          `}
        >
          <p className="text-[16px] text-white font-semibold">Done</p>
        </button>
      </div>
    </div>
  );
};

function FindFriendsItem({ name, pfp, handle, isFollowing, type }) {
  const { user } = useUserStore();

  const shareLink = async () => {
    try {
      const result = await navigator.share({
        message: "Follow me on Blitz to see my predictions for the future",
        url: "https://tryblitz.xyz",
        title: `${user?.name} on Blitz`,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full my-2">
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        className="flex flex-row items-center bg-none border-none cursor-pointer"
      >
        <img
          className="size-10 rounded-[19px] object-cover overflow-hidden"
          src={convertIpfsUrl(pfp)}
          alt="profile"
        />
        <div className="flex flex-col ml-2">
          <p className="text-[17px] text-white font-bold">{name}</p>
          <p className="text-[14px] text-[lightgray] font-semibold">{handle}</p>
        </div>
      </button>
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        className={`
          font-bold text-sm p-2.5 rounded-[18px] overflow-hidden
          ${isFollowing ? "text-gray-500" : "text-[rgb(22,22,22)]"}
          ${isFollowing ? "bg-gray-300" : "bg-white"}
          border-none cursor-pointer
        `}
      >
        {type === 1
          ? isFollowing
            ? "Following"
            : "Follow"
          : isFollowing
          ? "Invited"
          : "Invite"}
      </button>
    </div>
  );
}
export const onchainFollowingQuery2 = `query MyQuery {
    SocialFollowings(
      input: {filter: {identity: {_eq: "0x8512B8f41a6D1f2Aa0D09ae710b705498735F265"}}, blockchain: ALL}
    ) {
      Following {
        dappName
        followingProfileId
        followingAddress {
          addresses
          socials(input: {filter: {dappName: {_in: [farcaster, lens]}}}) {
            dappName
            profileName
            profileImage
            profileHandle
          }
        }
      }
    }
  }`;

export function DesktopInviteFriends({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      dialogContentClassName="rounded-lg "
      dialogClassName="xl:max-w-[25%]"
      cardClassName="xl:max-w-[32vw] md:max-w-[45vw] sm:max-w-[65vw] "
      cardContentClassName="bg-[#080808]/75  rounded-lg p-0 h-[75vh] backdrop-blur-lg"
      content={<FindFriends type={2} />}
    >
      {children}
    </DesktopCardModal>
  );
}
