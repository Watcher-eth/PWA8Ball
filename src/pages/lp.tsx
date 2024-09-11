import { MobiTop } from "@/components/layouts/MobiTop"
import { DesktopLiquidityPage } from "@/components/lp/DesktopLiquidityPage"
import { MobileLiquidityPage } from "@/components/lp/MobileLiquidityPage"

export default function Lp() {
  return (
    <MobiTop
      mobile={<MobileLiquidityPage />}
      desktop={<DesktopLiquidityPage />}
    />
  )
}
