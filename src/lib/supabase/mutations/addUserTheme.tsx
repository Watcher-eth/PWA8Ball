// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

interface UpdateThemePayload {
  userId: string;
  theme: string;
}

const updateUserTheme = async ({
  userId,
  theme,
}: UpdateThemePayload): Promise<void> => {
  const { data, error } = await supabase
    .from("users")
    .update({ theme })
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateUserTheme = () => {
  return useMutation({
    mutationFn: updateUserTheme,
  });
};
