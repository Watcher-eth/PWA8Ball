import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopLiquidityPage } from "@/componentspredictionsLiquidity/DesktopLiquidityPage";
import { MobileLiquidityPage } from "@/componentspredictionsLiquidity/MobileLiquidityPage";

export default function Lp() {
  return (
    <MobiTop
      mobile={<MobileLiquidityPage />}
      desktop={<DesktopLiquidityPage />}
    />
  );
}
