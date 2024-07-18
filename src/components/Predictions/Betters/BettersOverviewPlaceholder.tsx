import { Skeleton } from "@/components/ui/Skeleton";

export function BettersOverviewPlaceholder() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "8px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Skeleton style={{ width: 45, borderRadius: 22 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "7px",
            gap: "5px",
          }}
        >
          <Skeleton style={{ width: "40%", borderRadius: 10 }} />

          <Skeleton style={{ width: "65%", borderRadius: 10 }} />
        </div>
      </div>

      <Skeleton style={{ width: 90, borderRadius: 20 }} />
    </div>
  );
}
