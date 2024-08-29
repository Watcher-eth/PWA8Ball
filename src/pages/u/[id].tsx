// @ts-nocheck

import { GetServerSideProps } from "next";
import { fetchUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { fetchTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";

import { MobiTop } from "@/components/layouts/MobiTop";
import { WrappedMobileProfile } from "@/components/profile/MobileProfilePage";
import { WrappedDesktopProfile } from "@/components/profile/DesktopProfile";
import { getUserById } from "@/graphql/queries/users/useUserById";


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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  // const [totalFollowers, userC] = await Promise.all([
  //   getUserById(id),
  //   fetchUserByExternalAuthId(id),
  // ]);
  const totalFollowers = 0 // this should be temp
  const userC = await getUserById(id);

  return {
    props: {
      userId: id,
      totalFollowers,
      userC,
    },
  };
};
