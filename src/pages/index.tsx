// @ts-nocheck

import {LoginModal} from "@/components/Modals/LoginModal";
import {CardFeed} from "@/components/Feed/CardFeed";

import { useAuthModalStore, useModalStore } from "@/lib/stores/ModalStore";
import { SmartAccountProvider } from "@/lib/onchain/SmartAccount";
import { DesktopHomePage } from "@/components/Feed/DesktopHomePage";
import { MobiTop } from "@/components/ui/MobiTop";


export default function Home({ address }: { address?: string }) {

  //Lens Auth
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();
  return (
    <SmartAccountProvider>
      <MobiTop
        mobile={
          <div className="flex flex-col items-center py-2 min-h-screen  bg-[#101010]">
            <CardFeed />
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
          </div>
        }
        desktop={<DesktopHomePage />}
      />
      {/*  */}
    </SmartAccountProvider>
  );
}
