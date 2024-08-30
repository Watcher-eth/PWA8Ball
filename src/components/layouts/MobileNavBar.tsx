// @ts-nocheck

import {
  ActivityIcon,
  Home,
  Medal,
  PlusSquare,
  Search,
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
  console.log("nav", user?.walletAddress);
  return (
    <div
      className={`
      bg-black/20 items-center justify-center p-[0.9rem] rounded-full backdrop-blur-sm
      z-3 self-center border-[0.5px] border-[rgba(255,255,255,0.4)] filter-[saturate(100%)_blur(35px)]
    `}
    >
      <div className="w-[65vw] max-w-[17rem] flex px-2 justify-between items-center mx-auto">
        <MobileNavBtn IconComponent={Home} href={HOME_PATH} />
        <MobileNavBtn IconComponent={Search} href={ACTIVITY_PATH} />

        {user?.walletAddress ? (
          <>
            <MobileNavBtn IconComponent={ActivityIcon} href={ACTIVITY_PATH} />
            <MobileNavBtn
              iconSrc={user?.pfp}
              IconComponent={UserCircle}
              href={getProfilePath(user?.walletAddress)}
            />
          </>
        ) : (
          <>
            <MobileNavBtn
              IconComponent={ActivityIcon}
              onClick={openLoginModal}
            />
            <MobileNavBtn
              iconSrc={user?.pfp}
              IconComponent={UserCircle}
              onClick={openLoginModal}
            />
          </>
        )}
      </div>
    </div>
  );
}

function MobileNavBtn({
  IconComponent,
  iconSrc,
  onClick = () => {},
  href,
}: {
  IconComponent?: React.FC;
  iconSrc?: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = iconSrc ? (
    <img className="size-6 rounded-full" src={iconSrc} />
  ) : (
    <IconComponent className="size-6 text-white" />
  );

  return (
    <div className="active:scale-94 transition-all">
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        <div onClick={onClick}>{content}</div>
      )}
    </div>
  );
}
