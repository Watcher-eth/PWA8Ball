import Link from "next/link";

import { SocialOnboardButton } from "@/components/onboarding/DesktopOnboardingModal";
import {
  AppleIcon,
  GoogleIcon,
  XIcon,
} from "@/components/onboarding/AuthIcons";


export function DesktopFooter() {
  return (
    <div className="flex flex-col w-full mt-10 -mb-32">
      <div className="flex flex-col py-10 px-10 space-y-8 bg-[#121212]">
        <div className="flex flex-row w-full justify-between ">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row items-center space-x-3 ">
              <img src={"../images/OrbLogo.png"} className="h-11 w-11" />

              <div className="text-white text-[1.8rem] font-[Aeonik-Bold]">
                Glimpse
              </div>
            </div>
            <div className="text-[lightgray] font-normal mt-3 text-[1rem]">
              To see a World in a Grain of Sand, a Heaven in a Wild Flower
            </div>
            <div className="text-[lightgray] font-normal text-[1rem]">
              Hold Infinity in the palm of your hand And Eternity in an hour
            </div>
          </div>
          <div className="flex flex-row w-1/2 space-x-12 justify-end mt-1">
            <FooterColumn title="Developers">
              <FooterLink href={""} label="Graph" />
              <FooterLink href={""} label="Protocol" />
              <FooterLink href={""} label="Build on Glimpse" />
            </FooterColumn>
            <FooterColumn title="Resources">
              <FooterLink href={"/privacy"} label="Privacy" />
              <FooterLink href={"/tos"} label="Terms of Use" />
              <FooterLink
                href={"https://testflight.apple.com/join/xBbJ2OPO"}
                label="Download"
              />
              <FooterLink
                href={"https://t.me/GlimpseSupport"}
                label="Contact"
              />
            </FooterColumn>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <SocialOnboardButton IconComponent={GoogleIcon} onClick={() => {}} />
          <SocialOnboardButton IconComponent={XIcon} onClick={() => {}} />
          <SocialOnboardButton IconComponent={AppleIcon} onClick={() => {}} />
          {/* <SocialOnboardButton label={"Farcaster"} onClick={() => {}} /> */}
        </div>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-white font-semibold text-[1.05rem]">{title}</div>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  label,
  children,
  className = "",
}: {
  href?: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href ?? ""}
      className={`text-[lightgray] font-normal text-[1rem] ${className}`}
    >
      {label}
      {children}
    </Link>
  );
}

