import { MobiTop } from "@/components/layouts/MobiTop";
import { DesktopLiquidityPage } from "@/components/predictions/Liquidity/DesktopLiquidityPage";
import { MobileLiquidityPage } from "@/components/predictions/Liquidity/MobileLiquidityPage";

export default function Lp() {
  return (
    <MobiTop
      mobile={<MobileLiquidityPage />}
      desktop={<DesktopLiquidityPage />}
    />
  );
}
