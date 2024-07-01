// @ts-nocheck
import { OG_API_SPLASH_URL, getApiOgRouteUrl, getApiOgTopicUrl, getMarketPreviewUrl, getMarketUrl, getTopicUrl } from "@/utils/urls";
import { NextSeo } from "next-seo";

export function CustomHead({ topicData, userId, router, ...rest }) {
  let headSeo
  if (topicData) {
    headSeo = <TopicSeo {...topicData} />
  } else if (userId) {
    headSeo = <ProfileSeo userId={userId} />
  } else if (router?.query?.id) {
    // NOTE: This if statement needs to be more specific given its rn
    //       likely to catch too much
    headSeo = <MarketSeo id={router?.query?.id} />
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

function MarketSeo({ id }) {
  return (
    <NextSeo
      openGraph={{
        type: "website",
        //     title: market.title,
        //   description: market.question,
        url: getMarketUrl(id),
        images: [
          {
            url: getMarketPreviewUrl(id), // Use the API endpoint to generate the image
            width: 1200,
            height: 630,
          },
        ],
      }}
      twitter={{
        ...DEFAULT_TWITTER_INFO,
        card: "summary_large_image",
        //   title: market.title,
        //   description: market.question,
        images: [getMarketPreviewUrl(id)],
      }}
    />
  );
}


function ProfileSeo({ userId }) {
  const ogUrl = getApiOgRouteUrl(userId);

  return (
    <NextSeo
      openGraph={{
        type: "website",
        url: getProfileUrl(userId),
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
  );
}

const DEFAULT_TWITTER_INFO = {
  handle: "@tryblitz",
  site: "@site",
  cardType: "summary_large_image",
};