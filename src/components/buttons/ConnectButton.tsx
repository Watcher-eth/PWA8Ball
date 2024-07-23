import { IUser } from "@/supabase/types";
import { useMyEns } from "@/hooks/wallet/useMyEns";

export function ConnectButton({ user }: { user: IUser }) {
  const { displayName } = useMyEns();

  return (
    <div
      className={`
        bg-slate-400/10 hover:bg-slate-400/20
        hover:scale-103 active:scale-95 transition-all
        font-semibold cursor-pointer
        border border-white/10 hover:border-white/20 active:border-white/30
        px-4 py-2 rounded-lg flex flex-row items-center
      `}
    >
      {displayName ?? "Connect"}
      {user && (
        <img
          src={user?.pfp}
          alt={user?.name}
          className="size-6 rounded-full  ml-2 -mr-1 inline"
        />
      )}
    </div>
  );
}
