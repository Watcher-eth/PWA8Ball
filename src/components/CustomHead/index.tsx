// @ts-nocheck
import { getApiOgTopicUrl, getTopicUrl } from "@/utils/urls";
import { NextSeo } from "next-seo";
import Head from "next/head"

export function CustomHead({ topicData, router, ...rest }) {

  return (
    <>
      {topicData && <TopicSeo {...topicData} />}
    </>
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
      twitter={{
        handle: "@tryblitz",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  )
}