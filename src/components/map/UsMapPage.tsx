
import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";
import { Grid } from "@/components/ui/tailwind/Grid";
import { UsMapCard } from "./UsMapCard";


export function UsMapPage() {
  return (
    <StandardPageWrapper className="h-full flex flex-col">
      <Grid cols={{ xs: 1 }}>
        <UsMapCard />
      </Grid>
    </StandardPageWrapper>
  );
}