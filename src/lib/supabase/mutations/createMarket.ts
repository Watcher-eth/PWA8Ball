// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NewMarket } from "@/lib/supabase/types";

export const createMarket = async (
  marketData: NewMarket
): Promise<NewMarket> => {
  const { data, error } = await supabase
    .from<NewMarket>("markets")
    .insert([marketData])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateMarket = () => {
  return useMutation({
    mutationFn: createMarket,
    onError: (error) => {
      console.log("Error Create Market", error);
    },
  });
};
