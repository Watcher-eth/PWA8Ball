import { supabase } from "../../supabaseClient";

const fetchPricesForMarket = async (
  marketId: string,
  timespan: string
): Promise<any[]> => {
  const now = new Date();

  let startTime = new Date(now); // Clone the date to avoid mutating the original `now` date

  switch (timespan) {
    case "1hr":
      startTime.setHours(startTime.getHours() - 1);
      break;
    case "24hrs":
      startTime.setDate(startTime.getDate() - 1);
      break;
    case "1week":
      startTime.setDate(startTime.getDate() - 7);
      break;
    case "1Month":
      startTime.setMonth(startTime.getMonth() - 1);
      break;
    default:
      throw new Error("Unsupported timespan");
  }

  const startTimestamp = Math.floor(startTime.getTime() / 1000); // convert milliseconds to seconds

  const { data, error } = await supabase
    .from("Price")
    .select("*")
    .eq("marketId", marketId)
    .gte("timestamp", startTimestamp) // Greater than or equal to start timestamp
    .order("timestamp", { ascending: true }); // Order by timestamp ascending

  if (error) {
    console.error("Error fetching prices: ", error.message);
    throw new Error(error.message);
  }
  return data;
};

import { useQuery } from "@tanstack/react-query";

export const useGetPricesForMarket = (marketId: string, timespan: string) => {
  return useQuery({
    queryKey: ["marketPrices", marketId, timespan],
    queryFn: () => fetchPricesForMarket(marketId, timespan),

    enabled: !!marketId && !!timespan, // This query will only run if both marketId and timespan are provided
  });
};
