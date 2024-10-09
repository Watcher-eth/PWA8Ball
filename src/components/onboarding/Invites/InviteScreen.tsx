import { Input } from "@/components/ui/Input";
import { Ban, Check, CheckCircle, Lock, Phone, Share } from "lucide-react";
import { useCallback, useState } from "react";
import { useCheckIfInviteUsed } from "@/supabase/queries/Invites/useCheckIfInviteUsed";
import _ from "lodash";
import { useUseInvite } from "@/supabase/queries/Invites/useUseInvite";
import { toast } from "sonner";
import { showToast } from "@/utils/Toasts/showToast";
import { useUserStore } from "@/lib/stores/UserStore";

export function InviteScreen() {
  const [invite, setInvite] = useState("");
  const [debouncedInvite, setDebouncedInvite] = useState("");
  const { user } = useUserStore();
  const { data, isLoading, error } = useCheckIfInviteUsed(debouncedInvite);
  const useInviteMutation = useUseInvite();
  const debouncedChange = useCallback(
    _.debounce((nextValue) => setDebouncedInvite(nextValue), 500),
    []
  );

  const handleInviteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setInvite(nextValue);
    debouncedChange(nextValue);
  };

  const handleUseInvite = (inviteId: string, userId: string) => {
    useInviteMutation.mutate({ inviteId, userId });
  };

  async function verifyInvite() {
    if (data === true) {
      handleUseInvite(debouncedInvite, user?.externalAuthProviderUserId);

      showToast({
        icon: (
          <CheckCircle strokeWidth={3} className="text-[#34C759] h-[1rem]" />
        ),
        message: "Successfully used invite!",
      });
      //TODO: Integrate ponder update user endpoint
    } else {
      showToast({
        icon: <Ban strokeWidth={3} className="text-[#FF3F3F] h-[1rem]" />,
        message: "Invalid code!",
      });
    }
  }
  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg min-w-[60vw] max-w-[80vw] md:min-w-[68vw] sm:min-w-[90vw] lg:min-w-[40vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[48vw] 3xl:max-w-[40vw]">
      <div className="flex flex-col items-center justify-center w-1/2  p-10 pt-20 text-white">
        <div className="h-[6rem] w-[6rem] flex items-center justify-center my-5 rounded-full bg-[#191919]">
          <div className="text-[3.4rem] rotate-6">🔓</div>
        </div>
        <p className="text-center mb-6 font-medium px-6 text-[lightgray]">
          Glimpse is currently in closed beta. You need an invite code to use
          the app.
        </p>
        <div className="flex flex-row w-full items-center relative">
          <Input
            type="email"
            height={20}
            placeholder="Your invite code"
            onChange={handleInviteChange}
            value={invite}
            className="mb-4 w-full   bg-[#151515] border-2 border-[#181818] placeholder-[lightgray] text-white"
          />
          {data === true ? (
            <Check
              color="#5ACE5A"
              strokeWidth={3.5}
              size={20}
              className="absolute top-2.5 right-3"
            />
          ) : (
            <Ban
              size={20}
              color="#FF0050"
              strokeWidth={3}
              className="absolute top-2.5 right-3"
            />
          )}{" "}
        </div>
        {invite !== "" && (
          <div
            onClick={verifyInvite}
            className="py-2 animate-fade-in mb-4 hover:scale-101 active:scale-98  w-full font-medium space-x-2 text-white flex justify-center items-center  bg-[#151515] border-2 border-[#181818] rounded-md"
          >
            <Lock color="white" strokeWidth={2.8} size={16} />{" "}
            <div>Verify invite</div>
          </div>
        )}
        <div className="flex items-center mb-4 mt-0 justify-between w-full">
          <div className="h-px w-full bg-[#212121]" />
          <p className="text-center mx-4 font-medium text-[lightgray]">OR</p>
          <div className="h-px w-full bg-[#212121]" />
        </div>
        <div className="py-2 hover:scale-101 active:scale-98 mb-20 w-full font-medium space-x-2 text-white flex justify-center items-center  bg-[#151515] border-2 border-[#181818] rounded-md">
          <Share color="white" strokeWidth={2.8} size={16} />{" "}
          <div>Share to enter the waitlist</div>
        </div>
        <div className="flex justify-between w-full mt-4 text-sm text-[lightgray]">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/tos" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Download
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            Discord
          </a>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="https://pbs.twimg.com/media/GUL-CprbkAAcHOE?format=jpg&name=4096x4096"
          alt="Onboarding illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
