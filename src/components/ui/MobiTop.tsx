// @ts-nocheck
import { DesktopNavbar } from "../Common/DesktopNavbar";
/**
 * Need to properly do this, this is more an interim solution to get the mobile and desktop
 * components to work together for prototyping
 */

export function MobiTop({ mobile, desktop }) {
  return (
    <>
      <div className="hidden sm:block">
        <div className="w-screen bg-[#080808] h-full flex flex-col pt-3 py-10">
          <DesktopNavbar />
          <div className="sm:px-0 md:px-4 lg:px-8 xl:px-16 ">
            {desktop}
          </div>
        </div>
      </div>
      <div className="block sm:hidden">{mobile}</div>
    </>
  );
}