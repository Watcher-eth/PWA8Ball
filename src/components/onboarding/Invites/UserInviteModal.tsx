import { DrawerTrigger, Drawer, DrawerContent } from "@/components/ui/drawer";
import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const invites = [
  { code: "gl-eiasjdk", status: false },
  { code: "gl-hsdahss", status: true },
  { code: "gl-asdasje", status: false },
];

function UserInviteModal({ children }) {
  const usedInvitesCount = invites.filter((invite) => invite.status).length;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="active:scale-93 flex justify-between items-center w-full hover:scale-101 transition-all">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="border-0 rounded-[2rem] self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className={`
          bg-[#121212]/60 rounded-[2rem] backdrop border-2 border-[#151515]
          h-full mb-5  relative w-[90%]
        `}
        >
          <div className="flex flex-col items-center p-2 pb-12 rounded-lg">
            <div className="flex flex-col items-center justify-center   pt-12 text-white">
              <div className="h-[6rem] w-[6rem] flex items-center justify-center my-5 rounded-full bg-[#191919]">
                <div className="text-[3.4rem] rotate-6">💌</div>
              </div>
              <div className="p-1 px-4 rounded-full bg-[#DC292A] my-1 font-[600] text-lg text-white">
                {invites?.length - usedInvitesCount} invites left
              </div>
              <p className="text-center mb-6 font-[500] mt-3 px-6 mb-3 text-[lightgray]">
                Glimpse is currently in closed beta. You received 3 invites for
                your friends use them wisely.
              </p>

              {invites?.map((item) => {
                return (
                  <UserInvite
                    setToastVisible={() =>
                      toast(
                        <div className="w-full rounded-full bg-[#101010] text-[1rem] px-3 pr-4 text-white flex flex-row items-center p-2">
                          <div className="p-0.5 py-1.5 rounded-full bg-[#323232] mr-2 flex justify-center items-center">
                            <Copy
                              strokeWidth={2.5}
                              className="text-white h-[0.95rem]"
                            />
                          </div>
                          Copied Invite
                        </div>,
                        {
                          unstyled: true,
                          classNames: {
                            title: "text-red-400 text-2xl",
                            description: "text-red-400",
                            actionButton: "bg-zinc-400",
                            cancelButton: "bg-orange-400",
                            closeButton: "bg-lime-400",
                          },
                        }
                      )
                    }
                    code={item.code}
                    status={item.status}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default UserInviteModal;

function UserInvite({ code, status, setToastVisible }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setToastVisible(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full px-8 my-2.5">
      <div className="flex items-center justify-between">
        <p
          className={`text-lg font-bold ${
            status ? "text-[gray] line-through" : "text-white"
          }`}
        >
          {code}
        </p>
        {status ? (
          <p className="text-lg font-[600] text-italic text-[gray]">Used</p>
        ) : (
          <button onClick={handleCopy} className="focus:outline-none">
            <Copy className="text-[white]" strokeWidth={3} size={20} />
          </button>
        )}
      </div>
      <div className="h-px w-11/12 bg-[#212121]" />
    </div>
  );
}
