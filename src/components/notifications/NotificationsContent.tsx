// @ts-nocheck
import { motion } from "framer-motion";

import { registerForPushNotificationsAsync } from "@/utils/registerPushNotifs";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";
import { useCheckUserHasPushToken } from "@/supabase/queries/notifications/useCheckUserHasPushToken";
import { FollowPredictionSkeleton } from "../activity/FollowPredictionSkeleton";
import { UserNotifications } from "./UserNotifications";

export function NotificationsContent({ isDesktop }: { isDesktop?: boolean }) {
  const { user } = useUserStore();
  const userId = user?.external_auth_provider_user_id;
  const handlePressTurnOnNotifications = () => {
    registerForPushNotificationsAsync(userId);
  };

  const { data: hasToken, isLoading: isLoadingToken } =
    useCheckUserHasPushToken(userId);
  const { data: notifications } = useGetNotificationsForUser(userId);

  if (hasToken && notifications?.length === 0) {
    return <NotificationsPlaceholder />;
  }
  console.log(notifications?.length, isDesktop);
  if (notifications?.length > 0) {
    return (
      <UserNotifications
        isDesktop={isDesktop}
        notifications={notifications}
        userId={userId}
      />
    );
  }

  if (!isLoadingToken && !hasToken) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isDesktop ? "25vw" : "100vw",
          height: isDesktop ? "60vh" : "90vh",
          top: 0,
          backgroundColor: "#080808",
        }}
      >
        <img
          style={styles.image}
          src={"./images/Notifications.png"}
          alt="Notifications"
          className="object-cover"
        />
        <div className="flex flex-col w-full items-center justify-center bg-[#080808] h-40" />

        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[rgba(8, 8, 8, 1)] via-[rgba(8, 8, 8, 0.8)] to-[#080808]">
          <h1 style={styles.header}>
            Don’t miss out on what your friends are up to
          </h1>
          <p style={styles.subheader}>Never miss a new prediction again</p>
          <button
            style={styles.buttonPrimary}
            onClick={handlePressTurnOnNotifications}
          >
            Turn on notifications
          </button>
          <button
            style={styles.buttonSecondary}
            onClick={() => window.history.back()}
          >
            Another time
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: "70vh",
    width: "100vw",
  },
  header: {
    fontSize: "20px",
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    padding: "0 40px",
    marginTop: "-12px",
  },
  subheader: {
    fontSize: "15px",
    color: "lightgray",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: "60px",
    marginTop: "12px",
  },
  buttonPrimary: {
    padding: "8px 18px",
    paddingVertical: "10px",
    backgroundColor: "white",
    borderRadius: "21px",
    marginTop: "20px",
    fontSize: "14px",
    color: "black",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  buttonSecondary: {
    padding: "5px 10px",
    marginTop: "2px",
    fontSize: "15px",
    color: "lightgray",
    textAlign: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

const NotificationsPlaceholder = () => {
  return (
    <div
      className="rounded-t-3xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#101010",
      }}
    >
      <div className="p-1 w-[90%] pt-[5rem]">
        {[0, 1, 2, 3].map((index) => (
          <FollowPredictionSkeleton key={index} index={index} />
        ))}
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.7) 70%, #101010 100%)",
          height: "225px",
          width: "100%",
          marginTop: "-233px",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 22,
          margin: "5px 0",
          marginTop: 15,
          color: "white",
          fontWeight: "600",
        }}
      >
        No notifications yet
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          fontSize: 15.5,
          textAlign: "center",
          color: "lightgray",
        }}
      >
        Check back later and touch some grass in the meantime
      </motion.div>
    </div>
  );
};
