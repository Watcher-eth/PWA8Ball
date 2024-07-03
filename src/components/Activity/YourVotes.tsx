import React from "react";
import ProfileModal from "../Common/ProfileModal";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useProfile } from "@/lib/context/context";
import { Profile } from "@lens-protocol/react-web";

function YourVotes() {
  const profile = useProfile();
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <div className="flex items-center justify-between my-3 w-[90vw] mx-6">
        <div className="text-[1.4rem] font-bold ">Your Dashboard</div>
      </div>

      <div className="text-[1.2rem] my-3 mb-1 mx-6 font-bold ">
        Your Dashboard
      </div>
      <YourVotesActivity />
    </div>
  );
}

export default YourVotes;

export function YourSubmission(props: { profile: any }) {
  const exampleProfiles = [
    "https://ik.imagekit.io/lens/media-snapshot/39843a4ba7315518ab9bc843496a5bd2e78be2ea2f61e1b65673702b72f68b13.png?tr=w-150",
    "https://ik.imagekit.io/lens/media-snapshot/b011b41aaaafa83febea13bcb991912a805874520f36ea66f3f8ab4c05fd8d08.png?tr=w-150",
    "https://ik.imagekit.io/buttrfly/tr:n-avatar/https://gw.ipfs-lens.dev/ipfs/QmVJbxHTTHQtmKcmVMFqn2B5L8y4pPcMcLYZ3ZJANoZ3aP",
  ];
  return (
    <div
      style={{ borderRadius: "14px" }}
      className="flex  items-center h-[15vh] w-[88vw] mx-6  my-2 bg-[#1B1B1E]"
    >
      <div
        style={{ borderRadius: "10.3px" }}
        className=" h-[13vh] w-[13vh] mx-2 rounded-xl  bg-gray-800"
      />
      <div className="flex flex-col w-[51vw] ">
        <div className="text-[0.95rem] text-gray-300">Your Submission</div>
        <div className="text-[1rem] font-bold text-white">
          Most chaotic picture
        </div>
        <div className="text-[1.35rem]  font-bold items-center text-white flex justify-between ">
          <div>12 Votes</div>
          <div className="flex items-center relative  space-x-[-0.2rem]">
            {exampleProfiles.map((url, index) => {
              return (
                <Avatar className="h-[1.65rem] w-[1.65rem]" key={index}>
                  <AvatarImage src={url} />
                </Avatar>
              );
            })}
          </div>
        </div>
        <div className="text-[1rem] text-gray-300 flex items-center">
          <div>You earned {32}</div>
          <Avatar className="h-[1.16rem] w-[1.16rem] ml-1 ">
            <AvatarImage src="https://raw.githubusercontent.com/aave/branding-assets/c49501125de27714b08921590d2ea30d669b42c9/Gho/Logos/SVG/Icon-Dark.svg" />
          </Avatar>
        </div>
      </div>
    </div>
  );
}

function YourVotesActivity() {
  //TODO: Fetch all currently active votes from contract
  const activeVotes = [
    {
      name: "Winny.eth",
      currentPrice: 12,
      amount: 3,
      buyPrice: 8,
      pfp: "https://pbs.twimg.com/profile_images/1716574480993071104/j58mjsfX_400x400.jpg",
    },
    {
      name: "Stani.eth",
      currentPrice: 25,
      amount: 1,
      buyPrice: 16,
      pfp: "https://ik.imagekit.io/lens/media-snapshot/98e279526cad20389c0959c26059cc3fe7a35793e8e050b43802916ea0d42d33.png?tr=w-150",
    },
    {
      name: "Watcher.eth",
      currentPrice: 6,
      amount: 5,
      buyPrice: 8,
      pfp: "https://ik.imagekit.io/lens/media-snapshot/508346438e744deaa5ee2ecc5a7be38123365f2b1baaa97496d4872ca3953a5b.jpg?tr=w-150",
    },
    {
      name: "Proofofjake.eth",
      currentPrice: 12,
      amount: 3,
      buyPrice: 8,
      pfp: "https://ik.imagekit.io/buttrfly/tr:n-avatar/https://gw.ipfs-lens.dev/ipfs/bafybeib5mbbqj55xcqzerga2yvsfzl2g4sygm5yqulamhimtn6pztzkyce",
    },
  ];
  return (
    <div className="flex flex-col items-center  mx-6 w-[88vw] my-2">
      {activeVotes.map((sub, index) => {
        return (
          <div
            style={{ borderRadius: "14px" }}
            className="flex bg-[#1B1B1E] items-center p-2  my-1  "
          >
            <div
              className="h-[6vh] w-[6vh] relative mr-1"
              style={{ borderRadius: "11.3px" }}
            >
              <img src={sub.pfp} style={{ borderRadius: "6px" }} />
            </div>
            <div className="flex justify-between w-[70vw] px-1">
              <div className="flex flex-col space-y-[-0.25rem]">
                <div className="text-[1rem] text-gray-300 ">
                  {sub.name}`s Blitz
                </div>
                <div className="text-[1.2rem] font-bold text-white flex items-center">
                  <div>{sub.currentPrice}</div>
                  <Avatar className="h-[1.16rem] w-[1.16rem] ml-1 ">
                    <AvatarImage src="https://raw.githubusercontent.com/aave/branding-assets/c49501125de27714b08921590d2ea30d669b42c9/Gho/Logos/SVG/Icon-Dark.svg" />
                  </Avatar>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-[-0.25rem]">
                <div className="text-[1rem] text-gray-300 ">
                  You own {sub.amount}
                </div>
                <div className="text-[1.2rem] font-bold text-white flex items-center">
                  {Math.round((sub.currentPrice / sub.buyPrice - 1) * 100)}%
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
