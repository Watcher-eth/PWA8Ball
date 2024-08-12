import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopActivityPage } from "@/components/activity/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";

import { UsMapPage } from "@/components/map/UsMapPage";
import ElectionPage from "@/components/topic/ElectionPage";

export default function test() {
  return <MobiTop desktop={<ElectionPage />} mobile={<ElectionPage />} />;
}
