// @ts-nocheck

import {
  ActivityIcon,
  Home,
  Medal,
  PlusSquare,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

import { useUserStore } from "@/lib/stores/UserStore";
import { useAuthModalStore } from "@/lib/stores/ModalStore";
import { ACTIVITY_PATH, HOME_PATH, getProfilePath } from "@/utils/urls";

export function MobileNavBar() {
  const { user } = useUserStore();
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();

  return (
    <div
      className={`
        bg-black/20 items-center justify-center p-[0.9rem] rounded-full backdrop-blur-sm
        z-3 self-center border-[0.5px] border-[rgba(255,255,255,0.4)] filter-[saturate(100%)_blur(35px)]
      `}
    >
      <div className="w-[65vw] max-w-[17rem] flex px-2 justify-between items-center mx-auto">
        <Link href={HOME_PATH}>
          <MobileNavBtn IconComponent={Home} />
        </Link>
        {user?.walletaddress ? (
          <>
            <Link href={ACTIVITY_PATH}>
              <MobileNavBtn IconComponent={ActivityIcon} />
            </Link>
            <Link href={getProfilePath(user.walletAddress)}>
              <MobileNavBtn iconSrc={user?.pfp} IconComponent={UserCircle}/>
            </Link>
          </>
        ) : (
          <>
            <MobileNavBtn IconComponent={ActivityIcon} onClick={openLoginModal} />
            <MobileNavBtn iconSrc={user?.pfp} IconComponent={UserCircle} onClick={openLoginModal} />
          </>
        )}
      </div>
    </div>
  );
}


function MobileNavBtn({
  IconComponent,
  iconSrc,
  onClick=(() => {})
}: {
  IconComponent?: React.FC,
  iconSrc?: string,
  onClick?: () => void
}) {
  return (
    <div className="active:scale-94 transition-all" onClick={onClick}>
      {iconSrc ? (
        <img className="size-6 rounded-full" src={iconSrc} />
      ) : (
        <IconComponent className="size-6 text-white" />
      )}
    </div>
  );
}