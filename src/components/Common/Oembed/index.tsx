import type { OG } from "../../../types/misc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FC } from "react";
import urlcat from "urlcat";

import Embed from "./Embed";
import Player from "./Player";

interface OembedProps {
  url?: string;
  publicationId?: string;
  onData: (data: OG) => void;
}

const Oembed: FC<OembedProps> = ({ url, publicationId, onData }) => {
  const { data, error, isLoading } = useQuery({
    enabled: Boolean(url),
    queryFn: async () => {
      const response = await axios.get(`${"HEY_API_URL"}/oembed`, {
        params: { url },
      });
      return response.data.oembed;
    },
    queryKey: ["oembed", url],
    refetchOnMount: false,
  });
  if (isLoading || error || !data) {
    return null;
  } else if (data) {
    onData(data);
  }

  const og: OG = {
    url: url as string,
    title: data?.title,
    description: data?.description,
    site: data?.site,
    favicon: urlcat("https://www.google.com/s2/favicons", {
      domain: data.url,
    }),
    image: data?.image,
    isLarge: false,
    html: data?.html,
  };

  if (!og.title) {
    return null;
  }

  return og.html ? (
    <Player og={og} />
  ) : (
    <Embed og={og} publicationId={publicationId} />
  );
};

export default Oembed;
