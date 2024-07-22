// @ts-nocheck

import { GetServerSideProps } from "next";
import { fetchUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { fetchTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";

import { MobiTop } from "@/components/ui/MobiTop";
import { MobileProfilePage } from "@/components/profile/MobileProfilePage";
import { DesktopActivityPage } from "@/components/Activity/DesktopActivityPage";
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
        /**
         * @NOTE: Have no idea whether or not activity page or profile page should be used here
         * naming is confuzzling as fuck
         */
        // <DesktopProfilePage/>
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
