import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopActivityPage } from "@/components/activity/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";

import { UsMapPage } from "@/components/map/UsMapPage";

export default function test() {
  return <MobiTop mobile={<UsMapPage />} desktop={<UsMapPage />} />;
}
