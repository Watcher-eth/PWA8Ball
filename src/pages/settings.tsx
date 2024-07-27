import { MobiTop } from "@/components/layouts/MobiTop";
import { SettingsPage } from "@/components/settings";

export default function Settings() {
  return (
    <MobiTop
      mobile={<SettingsPage />}
      desktop={<SettingsPage />}
    />
  );
}
