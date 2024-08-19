// @ts-nocheck
import { supabase } from "@/supabase/supabaseClient";
import { Topic } from "@/components/topic";
import { MobiTop } from "@/components/layouts/MobiTop";
import DesktopTopic from "@/components/topic/DesktopTopic";

export async function getServerSideProps(context) {
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
}

export default function TopicPage({ topicData }: { topicData: any }) {
  console.log({ topicData });

  if (topicData) {
    const { id, name, description, image, title, icon, topic, type, members } =
      topicData;

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
            />
          }
        />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
