// @ts-nocheck

import React from "react";
import { Search } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useProfile } from "@/lib/context/context";
import Link from "next/link";
import SearchModal from "../Search/SearchModal";
import ProfileModal from "../Common/ProfileModal";
import "../../styles/fonts.css";
function Header(props: { contestName: string }) {
  const profile = useProfile();

  return (
    <div className="flex items-center justify-between w-[85vw]">
      <SearchModal />

      <div
        className="text-[1.7rem] relative top-1 font-bold text-white"
        style={{ fontFamily: "Benzin-Bold" }}
      >
        Blitz
      </div>
      <ProfileModal profile={profile?.profile}>
        <a>
          <Avatar className="h-8  w-8">
            <AvatarImage
              src={
                profile?.profile?.metadata
                  ? profile?.profile?.metadata?.picture?.optimized?.uri
                  : "https://assets-global.website-files.com/64d69beadfe5074323543ebd/6564ded50242c322ed72422f_Textured-Sphere-1_Mid-Blue2%201.webp"
              }
            />
          </Avatar>
        </a>
      </ProfileModal>
    </div>
  );
}

export default Header;
