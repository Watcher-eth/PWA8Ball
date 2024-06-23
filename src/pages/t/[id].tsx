// @ts-nocheck

import FeaturedBet from "@/components/Topics";
import Head from "next/head";
import { useRouter } from "next/router";

const TopicPage = () => {
  const router = useRouter();
  const { id, name, description, image, icon, topic, type, members } =
    router.query;

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
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
