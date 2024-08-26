// @ts-nocheck

import { GetServerSideProps } from "next";
import { fetchUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { fetchTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";

import { MobiTop } from "@/components/layouts/MobiTop";
import { WrappedMobileProfile } from "@/components/profile/MobileProfilePage";
import { WrappedDesktopProfile } from "@/components/profile/DesktopProfile";
import { GET_POSITION_BY_USER_ADDRESSES } from "@/graphql/queries/positions/useGetPositionsByUserAddresses";
import { GET_USER_BY_ID } from "@/graphql/queries/users/useGetUserById";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";
import { GET_POSITIONS_BY_WALLET } from "@/graphql/queries/positions/useGetPositionsByWallet";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

export default function ProfilePage({
  userId,
  totalFollowers,
  userC,
}: {
  userId: string;
  totalFollowers: number;
  userC: User;
}) {
  return (
    <MobiTop
      mobile={
        <WrappedMobileProfile
          userId={userId}
          totalFollowers={totalFollowers}
          userC={userC}
        />
      }
      desktop={
        <WrappedDesktopProfile
          userId={userId}
          totalFollowers={totalFollowers}
          userC={userC}
        />
      }
    />
  );
}

export async function getUserFromDB(userId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_USER_BY_ID,
    variables: { id: getChecksummedAddress(userId) },
  });
  return data?.user as User;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const [totalFollowers, userC] = await Promise.all([
    getUserFromDB(id),
    fetchUserByExternalAuthId(id),
  ]);

  return {
    props: {
      userId: id,
      totalFollowers,
      userC,
    },
  };
};
