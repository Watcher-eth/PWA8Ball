// @ts-nocheck
import { Address } from "viem"
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { IUser } from "@/lib/supabase/types";

interface UpdateUserArgs {
  userId: string;
  updates: {
    walletaddress: Address;
  };
}

const updateUser = async ({
  userId,
  updates,
}: UpdateUserArgs): Promise<IUser> => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .match({ external_auth_provider_user_id: userId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

interface UpdateUserProfileArgs {
  userId: string;
  updates: {
    name?: string;
    pfp?: string;
    socials?: any;
  };
}

const updateUserProfile = async ({
  userId,
  updates,
}: UpdateUserProfileArgs): Promise<IUser> => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .match({ external_auth_provider_user_id: userId })
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};
