import React, { useRef, useState } from "react";
import { Ban, ImagePlus } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { toast } from "sonner";

function DesktopCreateProfile() {
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");
  const { user, setUser } = useUserStore();
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the file

      setPfpUrl(fileUrl);
      // TODO: Add ipfs upload
    }
  };

  async function uploadProfileData() {
    if (!username) {
      toast(
        <div className="w-full rounded-full bg-[#101010] font-semibold text-[1rem] px-3 pr-4 text-white flex flex-row items-center p-2">
          <div className="p-0.5 py-1.5 rounded-full bg-[#FF0050] mr-2 flex justify-center items-center">
            <Ban strokeWidth={3} className="text-white h-[1rem]" />
          </div>
          Please add a username
        </div>,
        {
          unstyled: true,
          classNames: {
            title: "text-red-400 text-2xl",
            description: "text-red-400",
            actionButton: "bg-zinc-400",
            cancelButton: "bg-orange-400",
            closeButton: "bg-lime-400",
          },
        }
      );
      return;
    }

    if (user?.walletType === "eoa") {
      setUser({
        ...user,
        id: user?.walletaddress,
        name: username,
        pfp: pfpUrl,
        walletaddress: user?.walletaddress,
        createdAt: BigInt(Math.floor(Date.now() / 1000)),
        externalAuthProviderUserId: user?.external_auth_provider_user_id,
        updatedAt: BigInt(Math.floor(Date.now() / 1000)),
      });
    } else if (user?.walletaddress) {
      setUser({
        ...user,
        id: user?.walletaddress,
        name: username,
        pfp: pfpUrl,
        walletaddress: user?.walletaddress,
        createdAt: BigInt(Math.floor(Date.now() / 1000)),
        externalAuthProviderUserId: user?.external_auth_provider_user_id,
        updatedAt: BigInt(Math.floor(Date.now() / 1000)),
      });
    } else {
      setUser({
        ...user,
        name: username,
        pfp: pfpUrl,
        createdAt: BigInt(Math.floor(Date.now() / 1000)),
        externalAuthProviderUserId: user?.external_auth_provider_user_id,
        updatedAt: BigInt(Math.floor(Date.now() / 1000)),
      });
    }
  }

  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg min-w-[55vw] md:min-w-[68vw] sm:min-w-[90vw]">
      <div className="flex flex-col items-center justify-center w-1/2 p-10 py-8 text-white">
        <img
          src={"/images/OrbLogo.png"}
          className="flex items-center justify-center w-14 h-14 mb-3 rounded-full"
          alt="Logo"
        />
        <h2 className="text-2xl font-bold mb-2">Welcome to Glimpse</h2>
        <p className="text-center mb-6 px-6 text-[lightgray]">
          Please add a profile picture and a username to complete your profile
        </p>
        <div className="rounded-lg md:min-w-[23vw]  bg-[#101010] flex flex-col justify-between p-5 mt-5 shadow-lg h-[14.5rem] border-2 border-[#181818] w-full mx-3">
          <div className="flex flex-row items-start justify-between">
            {pfpUrl ? (
              <img
                src={pfpUrl}
                className="h-[5rem] hover:scale-101 active:scale-97 w-[5rem] bg-gradient-to-b from-[#161616] to-[#111111] rounded-full border-2 border-[#212121] flex justify-center items-center cursor-pointer"
              />
            ) : (
              <div
                className="h-[5rem] hover:scale-101 active:scale-97 w-[5rem] bg-gradient-to-b from-[#161616] to-[#111111] rounded-full border-2 border-[#212121] flex justify-center items-center cursor-pointer"
                onClick={handleImageUploadClick}
              >
                <ImagePlus
                  color="#383838"
                  className="hover:scale-103 active:scale-97"
                  strokeWidth={2.5}
                />
              </div>
            )}
            <div className="text-lg mt-1 color-[lightgray] font-[Benzin-Bold]">
              Beginner
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="flex flex-col -mb-2 -gap-4">
            <input
              placeholder="Satoshi Nakamoto"
              className="text-3xl font-[Aeonik-Bold] focus:outline-none placeholder-[#262626] active:border-0 w-full bg-[transparent] text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="text-lg text-[#262626] font-semibold">0xrf724sda3</div>
          </div>
        </div>

        <div
          onClick={uploadProfileData}
          className="w-full hover:scale-101 active:scale-97 mt-12 p-2.5 rounded-full bg-[#121212] flex items-center justify-center text-xl font-[Aeonik-Bold] border-2 border-[#181818] cursor-pointer"
        >
          Confirm
        </div>
        <div
          onClick={() => {
            user.name = "Anon";
            setUser(user);
          }}
          className="text-md mt-2.5 text-[#707070] underline font-[500]"
        >
          Skip setup
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="https://pbs.twimg.com/media/GUTMi52WgAAf3OS?format=jpg&name=4096x4096"
          alt="Onboarding illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default DesktopCreateProfile;
