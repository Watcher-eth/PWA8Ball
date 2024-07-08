// @ts-nocheck


import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/supabaseClient";
import { FeaturedBet } from "@/components/Topics";


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

export default function TopicPage({
  topicData,
}: {
  topicData: any;
}) {
  console.log({ topicData });

  if (topicData) {
    const {
      id,
      name,
      description,
      image,
      title,
      icon,
      topic,
      type,
      members
    } = topicData;

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
  } else {
    return <p>Loading...</p>;
  }
};
