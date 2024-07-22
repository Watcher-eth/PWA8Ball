import { DesktopActivityPage } from "@/components/Activity/DesktopActivityPage";
import { DesktopProfilePage } from "@/components/profile/DesktopProfilePage";
import { MobiTop } from "@/components/ui/MobiTop";
import React from "react";

function test() {
  return (
    <MobiTop mobile={<DesktopProfilePage />} desktop={<DesktopProfilePage />} />
  );
}

export default test;
