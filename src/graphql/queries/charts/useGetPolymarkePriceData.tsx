import { useSwr } from "@/hooks/useSwr";

export function useGetPolymarketPriceData(marketId: string) {
  // Base URL and parameters for the Polymarket CLOB API
  const baseUrl = "https://clob.polymarket.com/prices-history";
  const params = new URLSearchParams({
    interval: "all",
    market: marketId,
    fidelity: "720",
  });

  // Construct the full URL with parameters
  const url = `${baseUrl}?${params.toString()}`;

  // Use SWR to fetch data from the API
  const { data, error } = useSwr(url);

  // Handle loading, error, and data states
  if (error) {
    console.error("Error fetching data:", error);
    return { data: null, isLoading: false, error };
  }

  if (!data) {
    return { data: null, isLoading: true, error: null };
  }

  return { data, isLoading: false, error: null };
}
