import { MobileActivityPage } from "@/components/activity_d/MobileActivityPage";
import { DesktopActivityPage } from "@/components/activity_d/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";
import { MobiTop } from "@/components/layouts/MobiTop";
import { useUserStore } from "@/lib/stores/UserStore";

export default function Activity() {
  const { user } = useUserStore();
  return (
    <MobiTop
      mobile={<MobileActivityPage />}
      desktop={
        /**
         * @NOTE: Have no idea whether or not activity page or profile page should be used here
         * naming is confuzzling as fuck
         */
        <DesktopActivityPage userC={user} />
      }
    />
  );
}
