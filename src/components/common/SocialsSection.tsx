// @ts-nocheck
import { Twitter } from "lucide-react";


export function SocialsSection({ twitter, farcaster }) {
  let username;
  let icon;
  if (twitter) {
    username = twitter?.username;
    icon = <Twitter className="h-4 text-gray-200" />;
  } else if (farcaster) {
    username = farcaster?.name;
    icon = <img src="/farcaster.png" className="size-10" alt="Farcaster" />;
  }
  return username && <SocialDisplayBlock username={username} icon={icon} />;
}

function SocialDisplayBlock({ username, icon }) {
  return (
    <div className="flex items-center font-medium">
      {icon}
      <p className="text-gray-200 text-md ml-1 font-medium">@{username}</p>
    </div>
  );
}
