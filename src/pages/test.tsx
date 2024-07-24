import { DesktopActivityPage } from "@/components/Activity/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";
import { MobiTop } from "@/components/ui/MobiTop";
import React from "react";

import { UsMapPage } from "@/components/map/UsMapPage";


function test() {
  return <MobiTop mobile={<UsMapPage />} desktop={<UsMapPage />} />;
}

export default test;
