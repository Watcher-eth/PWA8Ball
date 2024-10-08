import { MobiTop } from "@/components/layouts/MobiTop"
import { ElectionPage } from "@/components/topic/ElectionPage"
import { getAllMarketsForTopicId } from "@/graphql/queries/topics/useGetAllMarketsForTopic"
import { Market } from "@/__generated__/graphql"
import { GRAPH_ENDPOINT_URL } from "@/providers/GraphQlProvider"


export async function getServerSideProps() {
  const endpoint = `${GRAPH_ENDPOINT_URL}/markets/trending/1?limit=15&hours=24`

  const resMarkets = await fetch(endpoint)
  const trendingMarkets = await resMarkets.json()

  const allElectionMarkets = await getAllMarketsForTopicId(1)
  return {
    props: {
      trendingMarkets,
      allElectionMarkets,
    },
  }
}
export default function USElection({
  trendingMarkets,
  allElectionMarkets,
}: {
  trendingMarkets: Market[]
  allElectionMarkets: Market[]
}) {
  return (
    <MobiTop
      desktop={
        <ElectionPage
          trendingMarkets={trendingMarkets}
          allElectionMarkets={allElectionMarkets}
        />
      }
      mobile={
        <ElectionPage
          trendingMarkets={trendingMarkets}
          allElectionMarkets={allElectionMarkets}
        />
      }
    />
  )
}
