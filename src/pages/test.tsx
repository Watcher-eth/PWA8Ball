import { DesktopActivityPage } from "@/components/Activity/DesktopActivityPage";
import { DesktopProfile } from "@/components/profile/DesktopProfile";
import { MobiTop } from "@/components/ui/MobiTop";
import React from "react";

function test() {
  return (
    <MobiTop mobile={<DesktopProfile />} desktop={<DesktopProfile />} />
  );
}

export default test;
