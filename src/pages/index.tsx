// @ts-nocheck
import { WrappedDesktopHomePage } from "@/components/home/DesktopHomePage";
import { WrappedMobileHomePage } from "@/components/home/MobileHomePage";
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
      mobile={<WrappedMobileHomePage trendingMarkets={trendingMarkets} />}
      desktop={<WrappedDesktopHomePage trendingMarkets={trendingMarkets} />}
    />
  );
}
