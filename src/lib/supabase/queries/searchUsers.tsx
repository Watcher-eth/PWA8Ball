// useGetUsersByName.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

const fetchUsersByName = async (searchString: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from("users") // Assuming the table is called 'users'
    .select("*") // You might want to select specific columns instead of all
    .ilike("name", `%${searchString}%`); // Case-insensitive partial match

  if (error) throw new Error(error.message);
  return data;
};

export const useGetUsersByName = (searchString: string) => {
  return useQuery({
    queryKey: ["usersByName", searchString],
    queryFn: () => fetchUsersByName(searchString),
    enabled: !!searchString.trim(), // This query will only run if searchString is not empty or just whitespace
  });
};
