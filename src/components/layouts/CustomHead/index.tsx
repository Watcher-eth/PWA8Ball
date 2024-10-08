// @ts-nocheck
import {
  OG_API_SPLASH_URL,
  getApiOgRouteUrl,
  getApiOgTopicUrl,
  getMarketPreviewUrl,
  getMarketUrl,
  getTopicUrl,
  getProfileUrl,
  getApiOgMarketUrl,
} from "@/utils/urls"
import { NextSeo } from "next-seo"

export function CustomHead({ topicData, userId, router, ...rest }) {
  let headSeo
  if (router?.asPath === "/elections") {
    headSeo = <ElectionSeo />
  } else if (topicData && topicData?.id !== 1) {
    headSeo = <TopicSeo {...topicData} />
  } else if (topicData && topicData?.id === 1) {
    headSeo = <ElectionSeo {...topicData} />
  } else if (userId) {
    headSeo = <ProfileSeo userId={userId} />
  } else if (router?.query?.id) {
    // NOTE: This if statement needs to be more specific given its rn
    //       likely to catch too much
    headSeo = <MarketSeo id={router?.query?.id} />
  } else {
    headSeo = <SplashSeo />
  }

  return <>{headSeo}</>
}

function SplashSeo() {
  return (
    <NextSeo
      title="Glimpse"
      description="Discover Tomorrow, Today"
      openGraph={{
        title: "Glimpse",
        description: "Discover Tomorrow, Today",
        type: "website",
        images: [
          {
            url: "https://pwa-8-ball.vercel.app/images/HomeMeta.png", // Absolute path to the image
            width: 1200,
            height: 843,
            alt: "Topic Cover Image",
          },
        ],
      }}
      twitter={{
        ...DEFAULT_TWITTER_INFO,
        images: ["https://pwa-8-ball.vercel.app/images/HomeMeta.png"], // Same absolute path for Twitter card image
      }}
    />
  )
}

function TopicSeo({
  id,
  name,
  description,
  image,
  title,
  icon,
  topic,
  type,
  members,
}) {
  const ogUrl = getApiOgTopicUrl(id)
  return (
    <NextSeo
      openGraph={{
        title: `${title} Forecasts`,
        description: description,
        type: "website",
        url: getTopicUrl(id),
        images: [
          {
            url: ogUrl,
            width: 1200,
            height: 630,
            alt: "Topic Cover Image",
          },
        ],
      }}
      twitter={DEFAULT_TWITTER_INFO}
    />
  )
}

function ElectionSeo({
  id,
  name,
  description,
  image,
  title,
  icon,
  topic,
  type,
  members,
}) {
  return (
    <NextSeo
      openGraph={{
        title: "2024 US Election Predictions",
        description: "Get the latest forecasts about the 2025 US Election",
        type: "website",
        url: getTopicUrl(id),
        images: [
          {
            url: "https://pwa-8-ball.vercel.app/images/ElectionsMeta.png",
            width: 1200,
            height: 630,
            alt: "Topic Cover Image",
          },
        ],
      }}
      twitter={DEFAULT_TWITTER_INFO}
    />
  )
}

function MarketSeo({ id, question, title }) {
  const ogUrl = getApiOgMarketUrl(id)

  return (
    <NextSeo
      openGraph={{
        type: "website",
        title: "Glimpse",
        description: "Discover Tommorow, Today",
        url: getMarketUrl(id),
        images: [
          {
            url: getApiOgMarketUrl(id), // Use the API endpoint to generate the image
            width: 1200,
            height: 630,
          },
        ],
      }}
      twitter={{
        ...DEFAULT_TWITTER_INFO,
        card: "summary_large_image",
        title: title,
        description: question,
        images: [getApiOgMarketUrl(id)],
      }}
    />
  )
}

function ProfileSeo({ userId }) {
  const ogUrl = getApiOgRouteUrl(userId)

  return (
    <NextSeo
      openGraph={{
        type: "website",
        url: getProfileUrl(userId),
        title: "Glimpse",
        description: "Discover Tommorow, Today",
        images: [
          {
            url: ogUrl,
            width: 1200,
            height: 630,
            alt: "Profile Cover Image",
          },
        ],
      }}
      twitter={DEFAULT_TWITTER_INFO}
    />
  )
}

const DEFAULT_TWITTER_INFO = {
  handle: "@tryglimpse",
  site: "@site",
  cardType: "summary_large_image",
}
