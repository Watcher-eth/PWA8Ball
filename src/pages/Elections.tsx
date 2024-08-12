import { MobiTop } from "@/components/layouts/MobiTop";
import { ElectionPage } from "@/components/topic/ElectionPage";

export default function test() {
  return <MobiTop desktop={<ElectionPage />} mobile={<ElectionPage />} />;
}
