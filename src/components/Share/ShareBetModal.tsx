// @ts-nocheck
import { Copy, Gift, Share as ShareIcon } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface Option {
  name: string;
  value: number;
}

export const ShareBetModal = ({
  id,
  title,
  image,
  topic,
  question,
  options,
}: {
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: Option[];
}) => {


  const shareLink = async () => {
    try {
      await navigator.share({
        title: `${title} on Blitz`,
        text: "This prediction on Blitz is wild! Check it out",
        url: `https://pwa-8-ball.vercel.app/p/${id}`,
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
            style={styles.memoji}
          />
          <img
            src="/images/LadyMemoji.png"
            alt="Lady Memoji"
            style={styles.memoji}
          />
          <img
            src="/images/Guy2Memoji.png"
            alt="Guy2 Memoji"
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
        <div style={styles.cardHeader}>
          <img src={image} alt={title} style={styles.cardImage} />
          <div>
            <h2 style={styles.cardTitle}>{title}</h2>
            <p style={styles.cardTopic}>/{topic}</p>
          </div>
        </div>
        <h2 style={styles.question}>{question}</h2>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.optionButton, backgroundColor: "#FF0050" }}
          >
            <span style={styles.optionText}>{props.options[0].name}</span>
            <span style={styles.optionPercentage}>
              /{(100 / Number(props.options[0].value)).toFixed(0)}%
            </span>
          </button>
          <button
            style={{ ...styles.optionButton, backgroundColor: "#0050FF" }}
          >
            <span style={styles.optionText}>{props.options[1].name}</span>
            <span style={styles.optionPercentage}>
              /{(100 / Number(props.options[1].value)).toFixed(0)}%
            </span>
          </button>
        </div>
      </div>
      <div style={styles.actionGroup}>
        <button
          style={styles.copyButton}
          onClick={() => copyToClipboard("share bet")}
        >
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
    backgroundColor: "#121212",
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
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
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
    backgroundColor: "#191919",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    marginTop: 65,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    gap: -2,
  },
  cardImage: {
    height: 42,
    width: 42,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 9,
    objectFit: "cover",
  },
  cardTitle: {
    fontSize: 19,
    color: "white",
  },
  cardTopic: {
    fontSize: 16,
    color: "lightgrey",
  },
  question: {
    fontSize: 26,
    color: "white",
    lineHeight: 1,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 5,
    gap: 10,
  },
  optionButton: {
    width: "50.5%",
    padding: 11,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    borderRadius: 10,
    gap: 3,
    overflow: "hidden",
    zIndex: 20,
  },
  optionText: {
    fontSize: 22,
    color: "white",
  },
  optionPercentage: {
    fontSize: 15,
    color: "lightgray",
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
    overflow: "hidden",
    backgroundColor: "#191919",
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
    overflow: "hidden",
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
