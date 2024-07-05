// @ts-nocheck

import React from "react";
import { Copy, Gift, Share as ShareIcon } from "lucide-react";


export const ShareTopic = ({ id, title, image, question, members, markets }: {
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  members: number;
  markets: number;
}) => {

  const copyToClipboard = async () => {
    navigator.clipboard.writeText("hello world");
    alert("Copied to Clipboard");
  };

  const shareLink = async () => {
    try {
      await navigator.share({
        message: `Join ${title} on Blitz to get all the latest predictions and odds.`,
        url: `https://pwa-8-ball.vercel.app/t/${id}`,
        title: title,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };

  return (
    <div className={CLASSNAMES.modal}>
      <h1 className={CLASSNAMES.header}>More fun</h1>
      <div className={CLASSNAMES.subHeader}>
        <div className={CLASSNAMES.imageGroup}>
          <img
            src="/images/Guy1Memoji.png"
            alt="Guy1 Memoji"
            width={40}
            height={40}
            className={CLASSNAMES.memoji}
          />
          <img
            src="/images/LadyMemoji.png"
            alt="Lady Memoji"
            width={40}
            height={40}
            className={CLASSNAMES.memoji}
          />
          <img
            src="/images/Guy2Memoji.png"
            alt="Guy2 Memoji"
            width={40}
            height={40}
            className={CLASSNAMES.memoji}
          />
        </div>
        <h1 className={CLASSNAMES.header}> together</h1>
      </div>
      <p className={CLASSNAMES.inviteText}>
        Invite your friends and earn points when they make their first
        prediction
      </p>
      <div className={CLASSNAMES.card}>
        <img src={image} alt={title} className={CLASSNAMES.cardImage} />
        <div className={CLASSNAMES.cardOverlay}>
          <div className={CLASSNAMES.cardContent}>
            <p className={CLASSNAMES.markets}>{markets} Live Predictions</p>
            <p className={CLASSNAMES.cardQuestion}>{question}</p>
            <button className={CLASSNAMES.joinButton}>Join</button>
          </div>
        </div>
        <div className={CLASSNAMES.cardHeader}>
          <img src={image} alt={title} className={CLASSNAMES.cardThumb} />
          <div>
            <h2 className={CLASSNAMES.cardTitle}>/{title}</h2>
            <p className={CLASSNAMES.cardMembers}>
              {members} {members > 1 ? "Members" : "Member"}
            </p>
          </div>
        </div>
      </div>
      <div className={CLASSNAMES.actionGroup}>
        <button className={CLASSNAMES.copyButton} onClick={copyToClipboard}>
          <Copy height={20} color={"#D9D9D9"} strokeWidth={3} />
          <span className={CLASSNAMES.actionText}>Copy</span>
        </button>
        <button className={CLASSNAMES.shareButton} onClick={shareLink}>
          <ShareIcon height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span className={CLASSNAMES.shareText}>Share</span>
        </button>
      </div>
      <div className={CLASSNAMES.earnings}>
        <Gift color="lightgrey" size={16} />
        <span className={CLASSNAMES.earningsText}>
          Earn 10% of every point your friend receives
        </span>
      </div>
    </div>
  );
};

const CLASSNAMES = {
  modal: "h-[110%] w-full flex flex-col p-5 bg-[#131316] pt-10 rounded-t-[20px]",
  header: "text-4xl text-white -mb-2",
  subHeader: "flex flex-row items-center mt-0.5",
  imageGroup: "flex flex-row items-center mx-2.5",
  memoji: "rounded-full -ml-2.5",
  inviteText: "text-lg mb-2.5 text-gray-300 mt-1.75",
  card: "w-full rounded-2xl bg-[#1B1B1E] flex flex-col p-5 mt-5.5 relative",
  cardImage: "rounded-2xl object-cover absolute w-full h-full",
  cardOverlay: "absolute bottom-0 w-full bg-black bg-opacity-50 rounded-b-2xl",
  cardContent: "flex flex-col p-4",
  markets: "text-sm text-white font-['AeonikRegular']",
  cardQuestion: "text-lg text-white font-['AeonikBold'] max-w-full",
  joinButton:
    "py-2 px-4 rounded-2xl bg-white text-sm text-black font-['AeonikBold'] self-end",
  cardHeader: "flex flex-row items-center mb-3.75 mt-1.25 gap-[-2px]",
  cardThumb: "size-[42px] rounded object-cover mr-[9px]",
  cardTitle: "text-lg text-white",
  cardMembers: "text-base text-white",
  actionGroup:
    "flex flex-row items-center mt-8 self-center justify-between w-[90%] absolute bottom-4.5 px-2.5",
  copyButton:
    "mt-3 p-3 rounded-3xl bg-[#1D1D1D] w-[45%] items-center justify-center flex flex-row gap-0.75",
  shareButton:
    "mt-3 flex flex-row p-2.5 rounded-3xl bg-[#D9D9D9] w-[45%] items-center justify-center",
  actionText: "text-xl text-[#D9D9D9] font-extrabold",
  shareText: "text-xl text-[#1D1D1D] font-extrabold ml-0.75",
  earnings: "flex mt-4.25 flex-row items-center gap-1 self-center",
  earningsText: "text-sm text-gray-300",
};

const styles = {
  modal: {
    height: "110%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#131316",
    paddingTop: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    fontSize: 40,
    color: "white",
    marginBottom: -8,
  },
  subHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  imageGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 10px",
  },
  memoji: {
    borderRadius: "50%",
    marginLeft: -10,
  },
  inviteText: {
    fontSize: 18,
    marginBottom: 10,
    color: "lightgrey",
    marginTop: 7,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#1B1B1E",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    marginTop: 22,
    position: "relative",
  },
  cardImage: {
    borderRadius: 20,
    objectFit: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },
  markets: {
    fontSize: 15,
    color: "white",
    fontFamily: "AeonikRegular",
  },
  cardQuestion: {
    fontSize: 18,
    color: "white",
    fontFamily: "AeonikBold",
    maxWidth: "100%",
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "white",
    fontSize: 15,
    color: "black",
    fontFamily: "AeonikBold",
    alignSelf: "flex-end",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    gap: -2,
  },
  cardThumb: {
    height: 42,
    width: 42,
    borderRadius: 4,
    objectFit: "cover",
    marginRight: 9,
  },
  cardTitle: {
    fontSize: 19,
    color: "white",
  },
  cardMembers: {
    fontSize: 16,
    color: "white",
  },
  actionGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    bottom: 18,
    padding: "0 10px",
  },
  copyButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#1D1D1D",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  shareButton: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 24,
    backgroundColor: "#D9D9D9",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 20,
    color: "#D9D9D9",
    fontWeight: "800",
  },
  shareText: {
    fontSize: 20,
    color: "#1D1D1D",
    fontWeight: "800",
    marginLeft: 3,
  },
  earnings: {
    display: "flex",
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "center",
  },
  earningsText: {
    fontSize: 13.5,
    color: "lightgrey",
  },
};

