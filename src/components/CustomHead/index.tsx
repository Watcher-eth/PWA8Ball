// @ts-nocheck
import { OG_API_SPLASH_URL, getApiOgTopicUrl, getTopicUrl } from "@/utils/urls";
import { NextSeo } from "next-seo";
import Head from "next/head"

export function CustomHead({ topicData, router, ...rest }) {
  console.log({topicData})
  let headSeo
  if (topicData) {
    headSeo = <TopicSeo {...topicData} />
  } else {
    headSeo = <SplashSeo />
  }
  return (
    <>
      {headSeo}
    </>
  );
}


function SplashSeo() {
  return (
    <NextSeo
      openGraph={{
        title: "TryBlitz",
        description: "Try Blitz",
        type: "website",
        images: [
          {
            url: OG_API_SPLASH_URL,
            width: 1200,
            height: 630,
            alt: "Topic Cover Image",
          },
        ],
      }}
      twitter={DEFAULT_TWITTER_INFO}
    />
  );
}

function TopicSeo({ id, name, description, image, title, icon, topic, type, members }) {
  const ogUrl = getApiOgTopicUrl(id);
  return (
    <NextSeo
      openGraph={{
        title: title,
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
  );
}

const DEFAULT_TWITTER_INFO = {
  handle: "@tryblitz",
  site: "@site",
  cardType: "summary_large_image",
};