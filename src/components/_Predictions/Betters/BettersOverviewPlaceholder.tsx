import { Skeleton } from "@/components/ui/Skeleton";

export function BettersOverviewPlaceholder() {
  return (
    <div
      className={`
        flex flex-row justify-between items-center w-full my-2
      `}
    >
      <div
        className="flex flex-row items-center"
      >
        <Skeleton style={{ width: 45, borderRadius: 22 }} />

        <div
          className="flex flex-col ml-2 gap-1"
        >
          <Skeleton style={{ width: "40%", borderRadius: 10 }} />

          <Skeleton style={{ width: "65%", borderRadius: 10 }} />
        </div>
      </div>

      <Skeleton style={{ width: 90, borderRadius: 20 }} />
    </div>
  );
}
