import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function DesktopLeaderboardModal({ children }) {
  return (
    <Dialog className={`!rounded-[1.5rem]`}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
        p-0 bg-transparent  border-0
        rounded-2xl
      `}
      >
        <div className="flex flex-col p-5">
          <div className="text-white text-xl font-[500]">
            Global Leaderboard
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DesktopLeaderboardModal;
