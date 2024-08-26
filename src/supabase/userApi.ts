// utils/userApi.ts
import { User } from "@/__generated__/graphql";
import { GET_USER_BY_ID } from "@/graphql/queries/users/useGetUserById";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";
import { supabase } from "@/supabase/supabaseClient"; // Import your Supabase client
import { IUser } from "@/supabase/types";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { checksumAddress } from "viem";

export async function getUserFromDB(userId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_USER_BY_ID,
    variables: { id: getChecksummedAddress(userId) },
  });
  console.log("ppUser", data, userId, getChecksummedAddress(userId));
  return data?.user as User;
}

export async function createUserInDB(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ external_auth_provider_user_id: userId }])
    .single();
  if (error) {
    console.error("Error creating user:", error);
    return null;
  }
  return data as IUser;
}
export async function createUserFromEOAInDB(
  userId: string,
  eoa: string,
  image: string
) {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        external_auth_provider_user_id: userId,
        walletaddress: eoa,
        name: shortenAddress(eoa),
      },
    ])
    .single();
  if (error) {
    console.error("Error creating user:", error);
    return null;
  }
  return data as IUser;
}

export async function updateUserInDB(userId: string, updates: Partial<IUser>) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("external_auth_provider_user_id", userId)
    .single();
  if (error) {
    console.error("Error updating user:", error);
    return null;
  }
  return data as IUser;
}
