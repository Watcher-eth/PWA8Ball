// @ts-nocheck
import Bet from "@/components/Predictions";
import React from "react";
import { useRouter } from "next/router";
import { getMarketUrl, getMarketPreviewUrl } from "@/utils/urls";


// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { id } = params;

//   // Fetch data from your Supabase table
//   const { data: market, error } = await supabase
//     .from("markets")
//     .select("title, question, image")
//     .eq("id", id)
//     .single();

//   if (error || !market) {
//     // Handle error or empty response
//     console.error("Failed to fetch market:", error);
//     return {
//       title: "Lost in the Ether",
//       description: "You went to deep down the rabbithole.",
//       openGraph: { title: "Lost in the Ether" },
//       twitter: { title: "Lost in the Ether" },
//     };
//   }

//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: market.title,
//     description: market.question,
//     openGraph: {
//       title: market.title,
//       description: market.question,
//       url: getMarketUrl(id),
//       images: [
//         {
//           url: getMarketPreviewUrl(id), // Use the API endpoint to generate the image
//           width: 1200,
//           height: 630,
//         },
//         ...previousImages,
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: market.title,
//       description: market.question,
//       images: [getMarketPreviewUrl(id)],
//     },
//   };
// }

export default function MarketPage({ params, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Bet id={id} />
    </>
  );
}
