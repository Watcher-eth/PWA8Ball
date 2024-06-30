// @ts-nocheck

import React from "react";
import { Copy, Gift, Share as ShareIcon } from "lucide-react";

export interface ShareCommunityProps {
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  members: number;
  markets: number;
}

const ShareCommunity: React.FC<ShareCommunityProps> = (props) => {
  const { id, title, image, question, members, markets } = props;

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
    <div style={styles.modal}>
      <h1 style={styles.header}>More fun</h1>
      <div style={styles.subHeader}>
        <div style={styles.imageGroup}>
          <img
            src="/images/Guy1Memoji.png"
            alt="Guy1 Memoji"
            width={40}
            height={40}
            style={styles.memoji}
          />
          <img
            src="/images/LadyMemoji.png"
            alt="Lady Memoji"
            width={40}
            height={40}
            style={styles.memoji}
          />
          <img
            src="/images/Guy2Memoji.png"
            alt="Guy2 Memoji"
            width={40}
            height={40}
            style={styles.memoji}
          />
        </div>
        <h1 style={styles.header}> together</h1>
      </div>
      <p style={styles.inviteText}>
        Invite your friends and earn points when they make their first
        prediction
      </p>
      <div style={styles.card}>
        <img src={image} alt={title} style={styles.cardImage} />
        <div style={styles.cardOverlay}>
          <div style={styles.cardContent}>
            <p style={styles.markets}>{markets} Live Predictions</p>
            <p style={styles.cardQuestion}>{question}</p>
            <button style={styles.joinButton}>Join</button>
          </div>
        </div>
        <div style={styles.cardHeader}>
          <img src={image} alt={title} style={styles.cardThumb} />
          <div>
            <h2 style={styles.cardTitle}>/{title}</h2>
            <p style={styles.cardMembers}>
              {members} {members > 1 ? "Members" : "Member"}
            </p>
          </div>
        </div>
      </div>
      <div style={styles.actionGroup}>
        <button style={styles.copyButton} onClick={copyToClipboard}>
          <Copy height={20} color={"#D9D9D9"} strokeWidth={3} />
          <span style={styles.actionText}>Copy</span>
        </button>
        <button style={styles.shareButton} onClick={shareLink}>
          <ShareIcon height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span style={styles.shareText}>Share</span>
        </button>
      </div>
      <div style={styles.earnings}>
        <Gift color="lightgrey" size={16} />
        <span style={styles.earningsText}>
          Earn 10% of every point your friend receives
        </span>
      </div>
    </div>
  );
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

export default ShareCommunity;
