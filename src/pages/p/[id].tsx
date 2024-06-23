// @ts-nocheck

import Head from "next/head";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  // Fetch data from your Supabase table
  const { data: market, error } = await supabase
    .from("markets")
    .select("title, question, image")
    .eq("id", id)
    .single();

  if (error || !market) {
    // Handle error or empty response
    console.error("Failed to fetch market:", error);
    return {
      title: "Lost in the Ether",
      description: "You went to deep down the rabbithole.",
      openGraph: { title: "Lost in the Ether" },
      twitter: { title: "Lost in the Ether" },
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: market.title,
    description: market.question,
    openGraph: {
      title: market.title,
      description: market.question,
      url: `https://tryblitz.xyz/market/${id}`,
      images: [
        {
          url: `https://tryblitz.xyz/api/marketPreview?id=${id}`, // Use the API endpoint to generate the image
          width: 1200,
          height: 630,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: market.title,
      description: market.question,
      images: [`https://tryblitz.xyz/api/marketPreview?id=${id}`],
    },
  };
}

export default function MarketPage({ params, searchParams }: Props) {
  const { id } = params;
  const metadata = generateMetadata({ params, searchParams });
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:alt" content="Market Preview" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </Head>
      <div>{/* Your page component logic */}</div>
    </>
  );
}
