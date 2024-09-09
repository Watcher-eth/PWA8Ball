import { DesktopChart } from "@/components/common/Charts/DesktopChart";
import { Card } from "@/components/ui/tailwind/Card";

export function DesktopChartCard({ userOwns, ...props }) {
  console.log(props);
  // torn whether or not this should be a card or whether hould just be one with bg, will have to see w. accurate data
  return (
    <div
      className="rounded-lg -mt-4  p-2" /**ring-0 from-transparent to-transparent */
    >
      <DesktopChart
        option={1}
        userOwns={userOwns}
        isMarketPage={true}
        {...props}
      />
    </div>
  );
}
