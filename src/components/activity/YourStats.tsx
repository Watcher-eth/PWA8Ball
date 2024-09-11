import { useGetUserPositionsCount } from "@/graphql/queries/positions/useGetUserPositionsCount"
import { useUserStore } from "@/lib/stores/UserStore"

export function YourStats() {
  const { user } = useUserStore()
  const { data } = useGetUserPositionsCount(user?.walletAddress)
  return (
    <div className="flex flex-row items-center justify-between p-3 px-8 rounded-lg border border-[#212121] my-3">
      <StatSection
        label="$Cred"
        value={user?.liquidityPoints}
        divider={false}
      />
      <StatSection label="Total" value={data?.count ? data?.count : 0} />
      <StatSection label="Accuracy" value="0%" />
    </div>
  )
}

function StatSection({
  label,
  value,
  divider = true,
}: {
  label: string
  value?: string | number
  divider?: boolean
}) {
  return (
    <>
      {divider && <div className="h-4/5 w-px bg-gray-600"></div>}
      <div className="flex flex-col items-center gap-0">
        <span className="text-[lightgray] text-sm font-semibold">{label}</span>
        {value ? (
          <span className="text-white text-xl font-[600]">{value}</span>
        ) : (
          <div className="animate-pulse bg-[#292929] h-6 w-9 rounded"></div>
        )}
      </div>
    </>
  )
}
