// @ts-nocheck

import FeaturedBet from "@/components/Topics";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/supabaseClient";

interface TopicPageProps {
  topicData: any;
}

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
  const router = useRouter();

  if (!topicData) {
    return <p>Loading...</p>;
  }

  const { id, name, description, image, icon, topic, type, members } =
    topicData;

  return (
    <div>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${description}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={`See what ${name} believes in`}
        />
        <meta property="og:url" content={"https://tryblitz.xyz"} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={`${name} pfp`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta
          name="twitter:description"
          content={`See what ${name} believes in`}
        />
        <meta name="twitter:image" content={image} />
      </Head>
      <FeaturedBet
        id={id}
        name={name}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id) {
    return {
      notFound: true,
    };
  }

  // Fetch topic data from Supabase
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

export default TopicPage;
