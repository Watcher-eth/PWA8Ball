// @ts-nocheck
import { DesktopHomePage } from "@/components/Feed/DesktopHomePage";
import { MobileHomePage } from "@/components/Feed/MobileHomePage";
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
};
export default function Home({ trendingMarkets }) {
  return (
    <MobiTop
      mobile={<MobileHomePage trendingMarkets={trendingMarkets} />}
      desktop={<DesktopHomePage trendingMarkets={trendingMarkets} />}
    />
  );
}
