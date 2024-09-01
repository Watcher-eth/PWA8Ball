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
import {
  ACTIVITY_PATH,
  HOME_PATH,
  SEARCH_PATH,
  getProfilePath,
} from "@/utils/urls";

export function MobileNavBar() {
  const { user } = useUserStore();
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();
  return (
    <div
      className={`
      bg-[#212121]/20 items-center mb-1 justify-center p-[0.9rem] rounded-full backdrop-blur-sm
      z-3 self-center border-[0.5px] border-[rgba(200,200,200,0.2)] backdrop-blur-lg
    `}
    >
      <div className="w-[60vw] max-w-[17rem] flex px-2  justify-between items-center mx-auto">
        <MobileNavBtn IconComponent={Home} href={HOME_PATH} />
        <MobileNavBtn IconComponent={Search} href={SEARCH_PATH} />

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
