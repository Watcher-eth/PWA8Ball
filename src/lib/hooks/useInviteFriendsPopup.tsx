import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const useInviteFriendsPopup = () => {
  useEffect(() => {
    const navigateIfDue = async () => {
      const lastShownDate = await AsyncStorage.getItem("lastShownDate");
      const currentDate = new Date().getTime(); // Get current time in milliseconds

      if (lastShownDate) {
        const lastDate = parseInt(lastShownDate); // Convert stored string back to number
        const timeDifference = currentDate - lastDate; // Now we can subtract numbers
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 1) {
          showPopup();
        }
      } else {
        // First time or no data found
        showPopup();
      }
    };

    const showPopup = () => {
      const now = new Date().getTime();
      AsyncStorage.setItem("lastShownDate", now.toString());

      setTimeout(() => {
        router.navigate({ pathname: "findFriendsModal" });
      }, 1200); // Delay of 1 minute
    };
    navigateIfDue();
    showPopup();
  }, []);
};

export default useInviteFriendsPopup;
