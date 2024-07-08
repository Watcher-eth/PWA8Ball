import { Grid } from "@/components/ui/tailwind/Grid"

export function Tabs({
  children,
  numTabs = 2,
  ...props
}: {
  children: any
  numTabs?: number
  props?: any
}) {
  return (
    <Grid gap={0} aria-label="Tabs" cols={{ xs: 2, sm: numTabs }} {...props}>
      {children}
    </Grid>
  )
}
