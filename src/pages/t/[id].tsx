// @ts-nocheck

import FeaturedBet from "@/components/Topics";
import { useRouter } from "next/router";

const TopicPage = () => {
  const router = useRouter();
  const { id, name, description, image, icon, topic, type, members } =
    router.query;

  return (
    <div>
      {id ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TopicPage;
