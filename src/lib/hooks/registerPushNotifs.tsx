// src/utils/registerForPushNotifications.js
// @ts-nocheck

import { supabase } from "../supabase/supabaseClient";

const applicationServerPublicKey = "YOUR_PUBLIC_VAPID_KEY";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerForPushNotificationsAsync(userId: string) {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey),
      });

      const token = JSON.stringify(subscription);
      console.log("Push token:", token);

      const { data, error } = await supabase
        .from("push_tokens")
        .insert([{ token, user_id: userId }]);

      if (error) {
        console.error("Error saving token to Supabase", error);
      } else {
        alert("Notifications have been turned on.");
      }
    } catch (error) {
      console.error("Error during subscription to push notifications", error);
    }
  } else {
    console.warn("Push messaging is not supported");
  }
}
