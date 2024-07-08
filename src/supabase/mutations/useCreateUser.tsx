// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IUser, NewUser } from "../types";

const createUser = async (newUser: NewUser): Promise<IUser> => {
  const { data, error } = await supabase
    .from<IUser>("users")
    .insert([newUser])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  });
};
