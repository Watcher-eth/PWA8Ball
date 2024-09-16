// @ts-nocheck
import { DesktopHome } from "@/components/home/DesktopHome"
import { DesktopHomePage } from "@/components/home/DesktopHomePage"
import { MobileHomePage } from "@/components/home/MobileHomePage"
import { MobiTop } from "@/components/layouts/MobiTop"
import { getAllMarkets } from "@/graphql/queries/markets/useGetAllMarkets"
import { GRAPH_ENDPOINT_URL } from "@/providers/GraphQlProvider"
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  ) // s-maxage=20 means 20 seconds considered fresh
  const endpoint = `${GRAPH_ENDPOINT_URL}/markets/trending/0?limit=15`

  const resMarkets = await fetch(endpoint)
  const markets = await resMarkets.json()

  return {
    props: {
      markets,
    },
  }
}
export default function Home({ markets }) {
  return (
    <MobiTop
      mobile={<MobileHomePage markets={markets} />}
      desktop={<DesktopHome markets={markets} />}
    />
  )
}
