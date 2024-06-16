import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "@tanstack/react-query";
import { useProfile } from "@/lib/context/context";
import { lensClient } from "@/pages/_app";
import { useInView } from "react-cool-inview";
import { useGetAllTopics } from "@/lib/supabase/queries/getTopics";
import { useGetTrendingMarkets } from "@/lib/supabase/queries/getTrendingMarkets";

function Feed() {
  const [publications, setPublications] = useState<[]>();
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();
  const profileId = profile?.id;
  const {
    data: topicsData,
    isLoading: topicsLoading,
    error: topicsError,
  } = useGetAllTopics();
  const { data: markets, isLoading, error, refetch: refetchMarkets } = useGetTrendingMarkets();


  //Get feed pubs for contest
  const {
    data: feedData,
    isLoading: loadingPubs,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["feed", profileId],
    enabled: !!profileId, // Fetch data when profileId is available
    queryFn: async () => {
      try {
        const result = await lensClient.feed.fetch({
          where: {
            for: profileId,
          },
        });
        setPublications(result.value.items);
        // Assuming you can extract the feed data from the result
        const feedData = result;

        return feedData;
      } catch (e) {
        throw new Error("Error fetching feed");
      }
    },
  });

  const loadMorePublications = async () => {
    if (loading || !publications) return;
    setLoading(true);
    try {
      const Publications = feedData?.value || null;
      const nextPage = await Publications.next();
      console.log("next", nextPage);
      if (nextPage) {
        setPublications((prevPublications) => [
          ...prevPublications,
          ...nextPage.items,
        ]);
      }
      setLoading(false);
    } catch (error) {
      // Handle the error
      console.error("Error loading more publications", error);
      setLoading(false);
    }
  };

  const { observe } = useInView({
    rootMargin: "200px 0px",

    onEnter: ({ unobserve }) => {
      // When the last item comes to the viewport

      unobserve();
      loadMorePublications();
    },
  });

  console.log("Markets", markets)
  return (
    <div>
      {loadingPubs && (
        <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
          loading
        </div>
      )}
      <Carousel orientation="vertical">
        <CarouselContent>
          {publications && (
            <>
              {publications.map((pub, index) => {
                return <CarouselItem>...</CarouselItem>;
              })}
            </>
          )}
          {loading && <div>Loading...</div>}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Feed;
