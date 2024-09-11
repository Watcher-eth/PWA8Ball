import { DesktopHome } from "@/components/home/DesktopHome"
import { MobiTop } from "@/components/layouts/MobiTop"



export default function test() {
  return <MobiTop desktop={<DesktopHome />} mobile={<DesktopHome />} />
}
