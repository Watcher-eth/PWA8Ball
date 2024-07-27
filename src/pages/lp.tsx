import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopLiquidityPage } from "@/components/Predictions/Liquidity/DesktopLiquidityPage";
import { MobileLiquidityPage } from "@/components/Predictions/Liquidity/MobileLiquidityPage";

export default function Lp() {
  return (
    <MobiTop
      mobile={<MobileLiquidityPage />}
      desktop={<DesktopLiquidityPage />}
    />
  );
}
