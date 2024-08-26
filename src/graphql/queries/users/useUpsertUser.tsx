import _ from "lodash"
import { User } from "@/__generated__/graphql";
import { GRAPH_ENDPOINT_DEV_URL } from "@/providers/GraphQlProvider";
import { serialize as wagmiSerialize, deserialize } from "@wagmi/core";
// import { wagmiSerialize } from "@/utils/wagmiSerialize";
// console.log(wagmiSerialize);
export function useUpsertUser() {
  async function upsertUser(userData: Partial<User>) {
    try {
      // for (const [key,value] of _.entries(userData)) {
      //   console.log({
      //     key, value,
      //     typeOfValue: typeof value,
      //     isTypeOfValueBigInt: typeof value === 'bigint'
      //   })
      // }
      // console.log({
      //   raw: userData,
      //   serialized: wagmiSerialize(userData),
      //   serializeFunc: wagmiSerialize.toString()
      // })
      const response = await fetch(`${GRAPH_ENDPOINT_DEV_URL}/user/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: wagmiSerialize(userData), // JSON.stringify(userDataWithBigInt), //
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("url", `${GRAPH_ENDPOINT_DEV_URL}/user/upsert`);
        console.error("Response status:", response.status);
        console.error("Response body:", errorText);
        console.error(response)
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


