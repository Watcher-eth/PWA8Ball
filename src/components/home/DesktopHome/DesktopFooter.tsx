import Link from "next/link";
import { SocialOnboardButton } from "@/components/onboarding/DesktopOnboardingModal";
import {
  AppleIcon,
  GoogleIcon,
  XIcon,
} from "@/components/onboarding/AuthIcons";
import { Instagram, Send } from "lucide-react";

export function DesktopFooter() {
  return (
    <div className="relative w-full mt-10  -mb-32">
      <div className="h-px w-full bg-[#212121] px-5" />
      {/* Footer Content */}
      <div className="relative z-10 flex flex-col w-full  py-10 px-14 space-y-8">
        <div className="flex flex-row w-full justify-between ">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row items-center space-x-3">
              <img src={"../images/OrbLogo.png"} className="h-11 w-11" />
              <div className="text-white text-[1.8rem] font-[Aeonik-Bold]">
                Glimpse
              </div>
            </div>
            <div className="text-[lightgray] font-normal mt-3 text-base">
              {/*Destiny is no matter of chance. It is a matter of choice.*/}
            </div>
            <div className="text-[lightgray] font-normal text-base">
              {/* It is not a thing to be waited for, it is a thing to be achieved. */}
              There is no fate but what you make
            </div>
            <div className="text-[gray] font-normal mt-1 text-[0.85rem]">
              {/* -William Jennings Bryan{" "} */}
              - Sarah Conner
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
          <SocialOnboardButton IconComponent={Instagram} onClick={() => {}} />
          <SocialOnboardButton IconComponent={XIcon} onClick={() => {}} />
          <SocialOnboardButton IconComponent={Send} onClick={() => {}} />
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
    <div className="flex flex-col space-y-2.5">
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
      className={`text-[lightgray] font-normal  text-base ${className}`}
    >
      {label}
      {children}
    </Link>
  );
}
