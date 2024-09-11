// @ts-nocheck

import { DEFAULT_USER_ID } from "@/constants/testData"

import { MobiTop } from "@/components/layouts/MobiTop"
import { DesktopMarketPage } from "@/components/predictions/DesktopMarket"
import {
  MobileMarketPage,
  WrappedMobileMarketPage,
} from "@/components/predictions/MobileMarketPage"

import { getMarketById } from "@/graphql/queries/markets/useGetMarketById"
import { getUsersByMarketId } from "@/graphql/queries/markets/useUsersByMarketId"
import { Market } from "@/__generated__/graphql"
import { User } from "@privy-io/react-auth"

export default function MarketPage({
  users,
  market,
  id,
}: {
  users: User[]
  market: Market
  id: string
}) {
  return (
    <>
      <MobiTop
        mobile={<MobileMarketPage users={users} market={market} id={id} />}
        desktop={<DesktopMarketPage users={users} market={market} id={id} />}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params as { id: string }

  const [market, users] = await Promise.all([
    // fetchMarketById(id, DEFAULT_USER_ID),
    getMarketById(id),
    getUsersByMarketId(id),
    // fetchUsersByMarketId(id),
  ])

  return {
    props: {
      id,
      market,
      users,
    },
  }
}
