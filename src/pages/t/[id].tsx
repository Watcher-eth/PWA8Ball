// @ts-nocheck

import FeaturedBet from "@/components/Topics";
import Head from "next/head";
import { GetServerSideProps, Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextSeo } from "next-seo";

interface TopicPageProps {
  topicData: any;
}

interface Props1 {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props1,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  // Fetch topic data from Supabase
  const { data: topicData, error } = await supabase
    .from("topics")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }
  const ogUrl = `https://pwa-8-ball.vercel.app/api/og/topic?id=${id}`;
  return {
    openGraph: {
      title: topicData?.title,
      description: topicData?.description,
      type: "website",
      url: `https://pwa-8-ball.vercel.app/t/${id}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: "Topic Cover Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: topicData?.title,
      description: topicData?.description,
      images: [ogUrl.toString()],
    },
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const { data: topicData, error } = await supabase
    .from("topics")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      topicData,
    },
  };
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
  const router = useRouter();

  if (!topicData) {
    return <p>Loading...</p>;
  }

  const { id, name, description, image, title, icon, topic, type, members } =
    topicData;
  const ogUrl = `https://pwa-8-ball.vercel.app/api/og/topic?id=${id}`;

  return (
    <div>
      <NextSeo
        openGraph={{
          title: title,
          description: description,
          type: "website",
          url: `https://pwa-8-ball.vercel.app/t/${id}`,
          images: [
            {
              url: ogUrl.toString(),
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
      <FeaturedBet
        id={id}
        name={title}
        description={description}
        image={image}
        icon={icon}
        topic={topic}
        type={type}
        members={parseInt(members, 10)}
      />
    </div>
  );
};

export default TopicPage;
