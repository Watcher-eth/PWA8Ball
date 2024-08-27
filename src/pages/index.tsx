// @ts-nocheck
import { DesktopHome } from "@/components/home/DesktopHome";
import { DesktopHomePage } from "@/components/home/DesktopHomePage";
import { MobileHomePage } from "@/components/home/MobileHomePage";
import { MobiTop } from "@/components/layouts/MobiTop";
import { fetchTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  ); // s-maxage=20 means 20 seconds considered fresh
  const trendingMarkets = await fetchTrendingMarkets();

  return {
    props: {
      trendingMarkets,
    },
  };
}
export default function Home({ trendingMarkets }) {
  return (
    <MobiTop
      mobile={<MobileHomePage trendingMarkets={trendingMarkets} />}
      desktop={<DesktopHome trendingMarkets={trendingMarkets} />}
    />
  );
}
