// @ts-nocheck

import FeaturedBet from "@/components/Topics";
import Head from "next/head";
import { GetServerSideProps, Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextSeo } from "next-seo";
import { getApiOgTopicUrl, getTopicUrl } from "@/utils/urls";

interface TopicPageProps {
  topicData: any;
}

interface Props1 {
  params: { id: string };
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
  console.log({ topicData });
  if (!topicData) {
    console.log("loading")
    return <p>Loading...</p>;
  }

  const { id, name, description, image, title, icon, topic, type, members } =
    topicData;
  const ogUrl = getApiOgTopicUrl(id);

  return (
    <div>
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

// TopicPage.getInitialProps = async (context) => {
//   console.log({ context });
//   const { id } = context.query as { id: string };

//   const { data: topicData, error } = await supabase
//     .from("topics")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     // props: {
//       topicData,
//     // },
//   };
// };
export default TopicPage;
