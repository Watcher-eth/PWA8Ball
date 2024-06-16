// @ts-nocheck

import React, { useState } from "react";
import { useUploadStore } from "../../lib/context/UploadContext";
import { trimIndentedSpaces } from "../../lib/utils/utils";
import { MetadataVersions } from "../../types/metadata";
import { isRelaySuccess } from "@lens-protocol/client";
import { MetadataFieldsFragment } from "../../types/generated/types";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/button";
import { lensClient } from "../../pages";
import { TypedDataDomain, createWalletClient, custom } from "viem";
import { CreatedModal } from "../ui/Modals/CreatedModal";
import { motion } from "framer-motion";
import { useAddress, useSigner, useWallet } from "@thirdweb-dev/react";
import { useStorageUpload } from "@thirdweb-dev/react";

import "../../pages/fonts.css";
import CID from "cids";
import { useStorage } from "@thirdweb-dev/react";
import YourComponent from "../ui/Loaders";
import axios from "axios";
import { createMetadata } from "../../lib/utils/getMetadata";
import { PublicationMetadataSchema } from "@lens-protocol/metadata";
import { useProfile } from "../../lib/context/context";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";

function Publish() {
  const { profile } = useProfile();
  const uploadStore = useUploadStore();
  const uploadedMedia = uploadStore?.media;
  const { mutateAsync: upload } = useStorageUpload();
  const secondaryMedia = uploadStore?.secondaryMediaHash;
  const postType = uploadStore?.type;
  const title = uploadStore.title;
  const description = uploadStore.text;
  const time = uploadStore.time;
  const profileId = profile.id;
  const { user } = useProfile();
  const userAddress = profile.ownedBy?.address;
  // Metadata
  const router = useRouter();
  const isText = postType === "text";
  const isImage = postType.includes("image");
  const isGif = postType.includes("gif");
  const isDaily = postType.includes("dailyBlitz");
  const isImageAndAudio =
    postType.includes("audio") && postType.includes("image");
  const isVideoAndAudio =
    postType.includes("video") && postType.includes("audio");
  const [isSuccesful, setIsSucesfull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storage = useStorage();
  const MediaField = isImageAndAudio ? secondaryMedia : uploadedMedia;
  const MediaMimeType = isImageAndAudio ? "audio/wav" : "image/jpeg";
  const type = isDaily
    ? "dailyBlitz"
    : isGif
    ? "gif"
    : isText
    ? "text"
    : isImage
    ? "image"
    : "audio";

  //Metadata
  async function UploadMetadataToIpfs() {
    const metadata = createMetadata(
      type,
      description,
      title,
      uploadedMedia,
      secondaryMedia,
      "",
      MediaMimeType
    );
    const validateMetadata = PublicationMetadataSchema.safeParse(metadata);

    if (!validateMetadata.success) {
      throw new Error(`Metadata is not valid.`);
    }
    console.log("check", validateMetadata, uploadedMedia);
    const ipfsHash = await upload({ data: [metadata] });
    const contentURI = ipfsHash[0];
    const finalHash = storage?.resolveScheme(contentURI);

    const parts = contentURI.split("/");

    const cid = parts[2];
    const end = parts[3];
    const CIDURL = new CID(cid).toV1().toString("base32");

    uploadStore.setSecondaryMediaHash(
      `https://ipfs.thirdwebstorage.com/ipfs/${cid}/${end}`
    );

    console.log(cid, metadata);
    return finalHash;
  }
  const durationInMinutes = time * 60 + 2;
  const currentDate = new Date(); // Current date and time
  const endTimeStamp = new Date(
    currentDate.getTime() + durationInMinutes * 60 * 1000
  ); // Add duration in milliseconds
  const formattedEndTimeStamp = endTimeStamp
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Collect module
  const BlitzCollectModule = {
    collectOpenAction: {
      multirecipientCollectOpenAction: {
        amount: {
          currency: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
          value: "2",
        },
        recipients: [
          //Create Fee -> User
          {
            recipient: userAddress,
            split: 50,
          },
          //Blitz Fee -> Platform
          {
            recipient: "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaB",
            split: 50,
          },
        ],
        referralFee: 30,
        endsAt: formattedEndTimeStamp,
        followerOnly: false,
      },
    },
  };
  console.log(BlitzCollectModule);

  //Upload
  async function CreateBlitz() {
    setIsLoading(true);
    try {
      // Attempt to create a post via dispatcher
      const contentURI = await UploadMetadataToIpfs();
      console.log("beofre Dispatcher");
      const viaDispatcherResult = await lensClient.publication.postOnchain({
        contentURI,
        openActionModules: BlitzCollectModule,
      });
      const resultValue = viaDispatcherResult.unwrap();

      console.log("after Dispatcher", viaDispatcherResult);

      if (!isRelaySuccess(resultValue)) {
        console.log(`Something went wrong`, resultValue);
        return;
      }
      const hasBeenIndex = await lensClient.transaction.waitUntilComplete({
        forTxId: viaDispatcherResult.value.txId,
      });
      console.log("indexed", hasBeenIndex);
      onCompleted();

      // Return the result if successful
      return viaDispatcherResult;
    } catch {
      try {
        // If the dispatcher fails, attempt to create a post with typed data
        const contentURI = await UploadMetadataToIpfs();

        const typedDataResult =
          await lensClient.publication.createOnchainPostTypedData({
            contentURI,
            openActionModules: BlitzCollectModule,
            referenceModule: {
              followerOnlyReferenceModule: false, // anybody can comment or mirror
            },
          });

        // Add the code for typedDataResult
        const { id, typedData } = typedDataResult.unwrap();
        console.log("Before TypedData");

        const typedDomain = typedData.domain;
        const types = typedData.types;
        const value = typedData.value;
        console.log("during TypedData1");
        const domain: TypedDataDomain = {
          name: typedDomain.name,
          version: typedDomain.version,
          chainId: typedDomain.chainId,
          verifyingContract: `0x${typedDomain.verifyingContract.substring(2)}`,
        };
        const signer = useSigner();
        // Sign with the wallet
        console.log("during TypedData", domain, types, value);
        const signedTypedData = await signer._signTypedData(
          domain,
          types,
          value
        );

        // Broadcast
        const broadcastResult = await lensClient.transaction.broadcastOnchain({
          id: id,
          signature: signedTypedData,
        });
        console.log("after Broadcast", broadcastResult);

        // BroadcastResult is a Result object
        const broadcastResultValue = broadcastResult.unwrap();
        if (!isRelaySuccess(broadcastResultValue)) {
          console.log(`Something went wrong`, broadcastResultValue);
          return;
        }

        console.log("after TypedData", broadcastResultValue);
        const result = await lensClient.transaction.waitUntilComplete({
          forTxId: broadcastResultValue.txId,
        });
        setIsLoading(false);

        onCompleted();
        console.log("final", result);
        // Return the result if successful
        return broadcastResultValue;
      } catch (error) {
        // Both methods failed, handle the error as needed or re-throw it
        console.error("Dispatcher Error:");
        console.error("Typed Data Error:");
        // You can choose which error to re-throw here
      }
    }
  }

  //Success and Clean Context

  const onCompleted = () => {
    //Toast Success
    setIsSucesfull(true);
    setIsLoading(false);

    //Notifications
    async function sendNotificationToFollowers() {
      const result = await lensClient.profile.allFollowers({
        profileId: profile.id,
        limit: 50,
      });

      const handles = []; // Create an array to store the handles
      console.log("before process");

      const processFollower = async (follower) => {
        if (follower.wallet.defaultProfile?.handle) {
          const handle = follower.wallet.defaultProfile.handle;
          handles.push(handle); // Push the handle into the array
          console.log("Sending notification to:", handle);
          // Perform your notification logic here
        }
      };
      console.log("after process");
      for (const follower of result.items) {
        await processFollower(follower);
      }
      console.log("addresses", handles, time, followers, result);

      const requestData = {
        time: time, // Replace with your desired time
        walletAddresses: ["gianni.lens", "watchereth.lens"], // Replace with your wallet addresses
        name: profile?.name ? profile.name : profile.handle, // Replace with the desired name
      };
      console.log("before notif");

      // Make a POST request to the API
      axios
        .post("/api/push-notifications/pushToAll", requestData)
        .then((response) => {
          console.log("Notification sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    }
    //TODO: Get all followers - sendNotificationToFollowers()

    //Clean Context
    //Open Share Modal
  };
  const { toast } = useToast();

  return (
    <div>
      {isLoading && (
        <div
          style={{ zIndex: 25 }}
          className="h-[100vh] w-[100vw] absolute bg-black right-0 pr-3 top-0 items-center justify-center flex flex-col"
        >
          <YourComponent />
          <div
            className="text-white text-[1.1rem] mt-20"
            style={{ fontFamily: "Aeonik-Bold" }}
          >
            Inscribing your moment forever..
          </div>
          <div
            className="text-gray-300 text-[1rem]"
            style={{ fontFamily: "Aeonik-Bold" }}
          >
            Minting memories in realtime...
          </div>
        </div>
      )}
      {isSuccesful && <CreatedModal />}
      {description !== "" ? (
        <motion.div whileTap={{ scale: 0.95 }} style={{ alignSelf: "center" }}>
          <Button
            style={{ fontFamily: "Benzin-Bold" }}
            className="bg-white text-[black]  w-[86vw]"
            variant={"ghost"}
            onClick={CreateBlitz}
          >
            Upload
          </Button>
        </motion.div>
      ) : (
        <motion.div whileTap={{ scale: 0.95 }} style={{ alignSelf: "center" }}>
          <Button
            style={{ fontFamily: "Benzin-Bold" }}
            className="bg-white text-gray-700 w-[86vw]"
            variant={"ghost"}
            onClick={() =>
              toast({
                title: "Missing description",
                description: "Please add a description for your Blitz",
              })
            }
          >
            Upload
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default Publish;
