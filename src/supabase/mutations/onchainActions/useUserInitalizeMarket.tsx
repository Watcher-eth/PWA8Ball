import { supabase } from "@/supabase/supabaseClient";

interface Option {
  name: string;
  address: string;
}

interface MarketParams {
  title: string;
  question: string;
  image: string;
  options: Option[];
  id: number;
  topicid: string;
  participants: number;
  pair: string;
  created_by: string;
}

interface Market {
  id: number;
  title: string;
  question: string;
  image: string;
  options: Option[];
  topicid: string;
  participants: number;
  pair: string;
  created_by: string;
}
async function createMarket(marketParams: MarketParams): Promise<Market> {
  const { data, error } = await supabase
    .from("markets")
    .insert(marketParams)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useUserIntializeMarket() {

  return { createMarket };
};
