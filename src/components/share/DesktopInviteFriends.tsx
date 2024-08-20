import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { FindFriends } from "./FindFriends";
import { useState } from "react";

export function DesktopInviteFriends({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  return (
    <DesktopCardModal
      dialogContentClassName="rounded-[1.5rem] "
      dialogClassName="xl:max-w-[25%]"
      cardClassName="xl:max-w-[32vw] md:max-w-[45vw] sm:max-w-[65vw] "
      cardContentClassName="bg-[#080808]/75  rounded-[1.5rem] p-0 h-[75vh] backdrop-blur-lg"
      content={<FindFriends type={2} />}
    >
      {children}
    </DesktopCardModal>
  );
}
