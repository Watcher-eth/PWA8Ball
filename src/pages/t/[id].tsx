// @ts-nocheck
import { supabase } from "@/supabase/supabaseClient"
import { Topic } from "@/components/topic"
import { MobiTop } from "@/components/layouts/MobiTop"
import DesktopTopic from "@/components/topic/DesktopTopic"
import { GRAPH_ENDPOINT_URL } from "@/providers/GraphQlProvider"
import { Market } from "@/__generated__/graphql"
import { getAllMarketsForTopicId } from "@/graphql/queries/topics/useGetAllMarketsForTopic"

export async function getServerSideProps(context) {
  const { id } = context.params as { id: string }

  const { data: topicData, error } = await supabase
    .from("topics")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }

  const endpoint = `${GRAPH_ENDPOINT_URL}/markets/trending/${id}?limit=15&hours=24`

  const resMarkets = await fetch(endpoint)
  const markets = await resMarkets.json()
  const allTopicMarkets = await getAllMarketsForTopicId("1")

  return {
    props: {
      topicData,
      markets,
      allTopicMarkets,
    },
  }
}

export default function TopicPage({
  topicData,
  markets,
  allTopicMarkets,
}: {
  topicData: any
  markets: Market[]
  allTopicMarkets: Market[]
}) {
  if (topicData) {
    const { id, name, description, image, title, icon, topic, type, members } =
      topicData

    return (
      <div>
        <MobiTop
          mobile={
            <Topic
              id={id}
              name={title}
              description={description}
              image={image}
              icon={icon}
              topic={topic}
              type={type}
              members={parseInt(members, 10)}
              markets={markets}
              allTopicMarkets={allTopicMarkets}
            />
          }
          desktop={
            <DesktopTopic
              id={id}
              name={title}
              description={description}
              image={image}
              icon={icon}
              topic={topic}
              type={type}
              members={parseInt(members, 10)}
              markets={markets}
              allTopicMarkets={allTopicMarkets}
            />
          }
        />
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}
