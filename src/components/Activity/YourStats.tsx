import { useUserStore } from "@/lib/stores/UserStore";
import { useGetOrderCountForUser } from "@/lib/supabase/queries/user/useGetOrderCountForUser";

export function YourStats() {
  const { user } = useUserStore();
  const { data: count } = useGetOrderCountForUser(user?.walletaddress!);

  return (
    <div className="flex flex-row items-center justify-between p-3 px-8 rounded-xl border border-[#212121] my-3">
      <StatSection label="$Cred" value={user?.liquiditypoints} divider={false}/>
      <StatSection label="Total" value={count ? count : 0} />
      <StatSection label="Accuracy" value="0%" />
    </div>
  );
};

function StatSection({
  label,
  value,
  divider = true
}: {
  label: string
  value?: string | number
  divider?: boolean
}) {
  return (
    <>
      {divider && <div className="h-4/5 w-px bg-gray-600"></div>}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[lightgray] text-sm font-bold">{label}</span>
        {value ? (
          <span className="text-white text-xl font-bold">{value}</span>
        ) : (
          <div className="animate-pulse bg-gray-700 h-6 w-9 rounded"></div>
        )}
      </div>
    </>
  );
}

