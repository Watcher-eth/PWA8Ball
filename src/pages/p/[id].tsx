// @ts-nocheck
import { DesktopMarketPage } from "@/components/Predictions/DesktopMarketPage";
import { MobiTop } from "@/components/ui/MobiTop";

import { MobileMarketPage } from "@/components/Predictions/MobileMarketPage";
import { GetServerSideProps } from "next";
import { fetchUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { fetchMarketById } from "@/supabase/queries/useGetMarketById";
import { DEFAULT_USER_ID } from "@/constants/testData";

export default function MarketPage({ users, market, id }: {
  users: IUserWithBet[];
  market: IMarketWithTopic;
  id: string;
}) {

  return (
    <>
      <MobiTop
        mobile={<MobileMarketPage users={users} market={market} id={id} />}
        desktop={<DesktopMarketPage users={users} market={market} id={id} />}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const [market, users] = await Promise.all([
    fetchMarketById(id, DEFAULT_USER_ID),
    fetchUsersByMarketId(id)
  ]);


  return {
    props: {
      id,
      market,
      users,
    },
  };
};