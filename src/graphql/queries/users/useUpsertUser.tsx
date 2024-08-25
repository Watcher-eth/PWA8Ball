import { GRAPH_ENDPOINT_DEV_URL } from "@/providers/GraphQlProvider";
import { IUser } from "@/supabase/types";
import { serialize, deserialize } from "@wagmi/core";

export function useUpsertUser() {
  async function upsertUser(userData: Partial<IUser>) {
    console.log("upsertData", serialize(userData));
    try {
      const response = await fetch(`${GRAPH_ENDPOINT_DEV_URL}/user/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: serialize(userData), //JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("url", `${GRAPH_ENDPOINT_DEV_URL}/user/upsert`);
        console.error("Response status:", response.status);
        console.error("Response body:", errorText);
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("success upsert", response);
      return result;
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  }

  return { upsertUser };
}
