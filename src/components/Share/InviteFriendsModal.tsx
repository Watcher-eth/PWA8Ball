import React, { useState, useEffect } from "react";
import { useQuery } from "@airstack/airstack-react";
import { convertIpfsUrl } from "@/lib/utils/modifyIpfsUrl";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
import { useUpdateUserProfile } from "@/lib/supabase/mutations/updateUser";
import { useRouter } from "next/router";
import { useLinkAccount } from "@privy-io/react-auth";

const FindFriends = ({ type }) => {
  const address = "0x8512B8f41a6D1f2Aa0D09ae710b705498735F265";
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
      <div style={{ width: width, backgroundColor: "#070707", height: height }}>
        Loading...
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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: 8,
        backgroundColor: "#101010",
      }}
    >
      <p
        style={{
          fontSize: 19,
          paddingTop: 58,
          color: "white",
          fontWeight: "700",
          marginTop: -20,
          position: "relative",
          top: -10,
        }}
      >
        {type === 1 ? "Find your friends" : "Invite your friends"}
      </p>

      <input
        selectionColor={"#FF0050"}
        placeholderTextColor={"gray"}
        style={{
          fontSize: 18,
          display: "flex",
          width: "90%",
          backgroundColor: "rgb(24, 24, 24)",
          padding: 10,
          margin: "15px 10px 0 10px",
          color: "lightgray",
          borderRadius: 20,
        }}
        onChange={(e) => handleTextChange(e.target.value)}
        value={text}
        placeholder="Search..."
      />
      <p
        style={{
          fontSize: 16,
          color: "lightgray",
          fontWeight: "600",
          marginBottom: 12,
          alignSelf: "flex-start",
          marginLeft: 22,
          marginTop: 18,
        }}
      >
        Find friends on other apps
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          borderRadius: 20,
          height: 80,
          backgroundColor: "rgb(24, 24, 24)",
          padding: "8px 15px",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
        >
          <button onClick={() => {}}>
            <img
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                overflow: "hidden",
              }}
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
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "black",
              }}
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
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                overflow: "hidden",
              }}
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
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                overflow: "hidden",
              }}
              src="https://publish.one37pm.net/wp-content/uploads/2023/11/Screenshot-2023-11-29-at-2.41.58-PM-e1701286954195.png?resize=630%2C682"
              alt="another social"
            />
          </button>
        </motion.div>
      </div>
      <p
        style={{
          fontSize: 16,
          color: "lightgray",
          fontWeight: "600",
          marginBottom: 12,
          alignSelf: "flex-start",
          marginLeft: 22,
          marginTop: 14,
        }}
      >
        People you may know
      </p>
      <div style={{ height: height / 1.78, width: "88%", overflowY: "scroll" }}>
        {dataToRender?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
            key={index}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FindFriendsItem
              type={type}
              isFollowing={item.isFollowing}
              pfp={item.followingAddress.socials[0].profileImage}
              handle={item.followingAddress.socials[0].profileHandle}
              name={item.followingAddress.socials[0].profileName}
            />
            <div
              style={{
                height: 1,
                width: width / 1.42,
                backgroundColor: "rgb(50, 50, 50)",
                alignSelf: "flex-end",
                marginVertical: 1,
              }}
            />
          </motion.div>
        ))}
      </div>
      <div
        style={{
          width: width,
          height: 40,
          position: "absolute",
          bottom: 80,
          backgroundImage: "linear-gradient(rgba(10,10,10,0.1), #101010)",
        }}
      />
      <div
        style={{
          width: width,
          height: 80,
          position: "absolute",
          bottom: 0,
          backgroundColor: "#101010",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          paddingBottom: 45,
        }}
      >
        <button
          onClick={() => {
            router.back();
          }}
          style={{
            width: width / 1.2,
            height: 50,
            borderRadius: 28,
            overflow: "hidden",
            backgroundColor: "rgb(24, 24, 24)",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginTop: 15,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "600",
            }}
          >
            Done
          </p>
        </button>
      </div>
    </div>
  );
};

export default FindFriends;

function FindFriendsItem(props) {
  const { name, pfp, handle, isFollowing, type } = props;
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "8px 0",
      }}
    >
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          style={{
            height: 40,
            width: 40,
            borderRadius: 19,
            overflow: "hidden",
          }}
          src={convertIpfsUrl(pfp)}
          alt="profile"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 8,
          }}
        >
          <p
            style={{
              fontSize: 17,
              color: "white",
              fontWeight: "700",
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontSize: 14,
              color: "lightgray",
              fontWeight: "500",
            }}
          >
            {handle}
          </p>
        </div>
      </button>
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        style={{
          color: !isFollowing ? "rgb(22, 22, 22)" : "gray",
          fontWeight: "700",
          fontSize: 14,
          padding: 10,
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: !isFollowing ? "white" : "lightgray",
          border: "none",
          cursor: "pointer",
        }}
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
