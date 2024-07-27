// @ts-nocheck

import { GetServerSideProps } from "next";
import { fetchUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { fetchTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";

import { MobiTop } from "@/components/layouts/MobiTop";
import { MobileProfilePage } from "@/components/profile/MobileProfilePage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";

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
        <MobileProfilePage
          userId={userId}
          totalFollowers={totalFollowers}
          userC={userC}
        />
      }
      desktop={
        <DesktopProfilePage
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
  const [totalFollowers, userC] = await Promise.all([
    fetchTotalFollowers(id),
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
