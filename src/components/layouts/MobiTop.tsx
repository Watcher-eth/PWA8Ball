import { DesktopNavBar } from "@/components/layouts/DesktopNavBar";
/**
 * Need to properly do this, this is more an interim solution to get the mobile and desktop
 * components to work together for prototyping
 */

export function MobiTop({
  mobile,
  desktop
}: {
  mobile: React.ReactNode
  desktop: React.ReactNode
}) {
  return (
    <>
      <div className="hidden sm:block">
        <div className="w-screen bg-[#080808] h-full flex flex-col pt-24 py-8">
          <DesktopNavBar />
          {/* <div>

          </div> */}
          {desktop}
        </div>
      </div>
      <div className="block sm:hidden">{mobile}</div>
    </>
  );
}
