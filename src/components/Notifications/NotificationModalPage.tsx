// @ts-nocheck

import { registerForPushNotificationsAsync } from "@/lib/hooks/registerPushNotifs";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetNotificationsForUser } from "@/lib/supabase/queries/notifications/getNotificationsForUser";
import { useCheckUserHasPushToken } from "@/lib/supabase/queries/notifications/getUserPushToken";
import React from "react";
import NotificationsPage from "./UserNotifications";

const NotificationsModalPage = () => {
  const { user } = useUserStore();
  const handlePressTurnOnNotifications = () => {
    registerForPushNotificationsAsync(user?.external_auth_provider_user_id);
  };

  const {
    data: hasToken,
    isLoading: isLoadingToken,
    isError: isErrorToken,
  } = useCheckUserHasPushToken(user?.external_auth_provider_user_id);
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
  } = useGetNotificationsForUser(user?.external_auth_provider_user_id);

  if (hasToken && notifications?.length === 0) {
    return <NotificationsPlaceHolder />;
  }
  console.log(notifications?.length, isLoadingToken, hasToken);
  if (notifications?.length > 0) {
    return (
      <NotificationsPage
        notifications={notifications}
        userId={user.external_auth_provider_user_id}
      />
    );
  }

  if (!isLoadingToken && !hasToken) {
    return (
      <div style={styles.container}>
        <img
          style={styles.image}
          src={"./images/Notifications.png"}
          alt="Notifications"
        />
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
    );
  }
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    height: "90vh",
    top: 0,
    backgroundColor: "#101010",
  },
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
    marginTop: "16px",
  },
  subheader: {
    fontSize: "15px",
    color: "lightgray",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: "60px",
    marginTop: "15px",
  },
  buttonPrimary: {
    padding: "8px 18px",
    paddingVertical: "10px",
    backgroundColor: "white",
    borderRadius: "21px",
    marginTop: "25px",
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

export default NotificationsModalPage;

import { motion } from "framer-motion";
import FollowPredictionSkeleton from "../Activity/ActivitySkelleton";

const NotificationsPlaceHolder = () => {
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
