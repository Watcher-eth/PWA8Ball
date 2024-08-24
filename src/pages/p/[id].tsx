// @ts-nocheck

import { fetchUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { fetchMarketById } from "@/supabase/queries/useGetMarketById";
import { DEFAULT_USER_ID } from "@/constants/testData";

import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopMarketPage } from "@/components/predictions/DesktopMarketPage";
import { MobileMarketPage, WrappedMobileMarketPage } from "@/components/predictions/MobileMarketPage";

import { IUserWithBet } from "@/supabase/types";
import { IMarketWithTopicDetails } from "@/supabase/queries/useGetTrendingMarkets";


export default function MarketPage({
  users,
  market,
  id,
}: {
  users: IUserWithBet[];
  market: IMarketWithTopicDetails;
  id: string;
}) {
  return (
    <>
      <MobiTop
        mobile={<WrappedMobileMarketPage users={users} market={market} id={id} />}
        desktop={<DesktopMarketPage users={users} market={market} id={id} />}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params as { id: string };

  const [market, users] = await Promise.all([
    fetchMarketById(id, DEFAULT_USER_ID),
    fetchUsersByMarketId(id),
  ]);

  return {
    props: {
      id,
      market,
      users,
    },
  };
};
