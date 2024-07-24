import { Card } from "@/components/ui/tailwind/Card";
import { UsMapChart } from "./UsMapChart";

export function UsMapCard() {
  return (
    <Card className="max-h-[500px]">
      <UsMapChart />
    </Card>
  );
}