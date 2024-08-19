import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FollowButton } from "./FollowButton";
import { IUser } from "@/supabase/types";
import { shortenAddress } from "@/utils/address/shortenAddress";

export function ProfileToolTip(props: {
  user: IUser;
  children: React.ReactNode;
}) {
  const { children } = props;
  console.log("user", props.user);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={"bottom"}
          className="flex w-[22rem] ml-8 mb-4 flex-col p-7 border-0 rounded-lg bg-[#101010]"
        >
          <div className="flex flex-row items-start justify-between">
            <img
              className="h-[4rem] w-[4rem] rounded-full"
              src={props.user?.pfp}
            />
            <FollowButton
              profileId={props?.user?.external_auth_provider_user_id}
            />
          </div>
          <div className="text-[2rem] my-4 text-white font-[Aeonik-Bold]">
            {props.user?.name}
          </div>
          <div className="text-[1.1rem] my-2 text-[lightgray] font-[600]">
            {props.user?.walletaddress
              ? shortenAddress(props.user?.walletaddress)
              : props.user?.walletaddress}{" "}
            0x273rfi...rtf
          </div>
          <div className="text-[0.85rem] text-[lightgray] -mb-4 font-[400]">
            Not followed by anyone you follow
          </div>
          <div className="w-full h-[0.1rem] bg-[#222222] my-8" />
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-col space-y-1">
              <div className="text-[1.4rem] text-white font-[Aeonik-Bold]">
                222
              </div>
              <div className="text-[0.8rem] text-[lightgray] font-[600]">
                Followers
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="text-[1.4rem] text-white font-[Aeonik-Bold]">
                669
              </div>
              <div className="text-[0.8rem] text-[lightgray] font-[600]">
                Following
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
