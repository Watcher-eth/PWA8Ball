import { ActivityPage } from "@/components/Activity";
import { DesktopActivityPage } from "@/components/Activity/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";
import { MobiTop } from "@/components/ui/MobiTop";

export default function Activity() {
  return (
    <MobiTop
      mobile={<ActivityPage />}
      desktop={
        /**
         * @NOTE: Have no idea whether or not activity page or profile page should be used here
         * naming is confuzzling as fuck
         */
         <DesktopActivityPage />
      }
    />
  );
}
