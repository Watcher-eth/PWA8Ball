// @ts-nocheck

import { GetServerSideProps } from "next"

import { MobiTop } from "@/components/layouts/MobiTop"
import { MobileProfilePage } from "@/components/profile/MobileProfilePage"
import { DesktopProfilePage2 } from "@/components/profile/DesktopProfile"
import { getUserById } from "@/graphql/queries/users/useUserById"

export default function ProfilePage({
  userId,
  totalFollowers,
  userC,
}: {
  userId: string
  totalFollowers: number
  userC: User
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
        <DesktopProfilePage2
          userId={userId}
          totalFollowers={totalFollowers}
          userC={userC}
        />
      }
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  // const [totalFollowers, userC] = await Promise.all([
  //   getUserById(id),
  //   fetchUserByExternalAuthId(id),
  // ]);
  const totalFollowers = 0 // this should be temp
  const userC = await getUserById(id)

  return {
    props: {
      userId: id,
      totalFollowers,
      userC,
    },
  }
}
