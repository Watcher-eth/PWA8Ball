import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { supabase } from "../drizzle/drizzle/supabase/supabaseClient";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync(userId: string) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    console.log("Granted already");

    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  console.log("After if and before token");
  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ||
    Constants.easConfig?.projectId;
  if (!projectId) {
    console.error("Project ID not found");
    return;
  }

  // Fetch the Expo push token
  const { data: tokenData } = await Notifications.getExpoPushTokenAsync({
    projectId,
  });
  const token = tokenData;
  console.log("Push token:", token);
  console.log(token);

  // Use the userId parameter when inserting the token to Supabase
  const { data, error } = await supabase
    .from("push_tokens")
    .insert([{ token, user_id: userId }]);

  console.log("After store", data);

  if (error) {
    console.error("Error saving token to Supabase", error);
  } else {
    // You can add any success logic here, for example:
    alert("Notifications have been turned on.");
  }
}

// Example: Assuming you're calling this inside a component
// and the userId is obtained from somewhere like the app's auth state
