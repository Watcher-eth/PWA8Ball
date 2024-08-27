import { DesktopHome } from "@/components/home/DesktopHome";
import { MobiTop } from "@/components/layouts/MobiTop";
import React from "react";

function test() {
  return <MobiTop desktop={<DesktopHome />} mobile={<DesktopHome />} />;
}

export default test;
