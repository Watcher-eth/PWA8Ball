// @ts-nocheck
import { convertIpfsUrl } from "@/utils/urls/convertIpfsUrl";
import { useUserStore } from "@/lib/stores/UserStore";
import { trackItemShare } from "@/lib/events/StandardEvents";

export function FindFriendsItem({ name, pfp, handle, isFollowing, type }) {
  const { user } = useUserStore();

  const shareLink = async () => {
    try {
      trackItemShare("user", user?.external_auth_provider_user_id, "pwa");

      const result = await navigator.share({
        message: "Follow me on Glimpse to see my predictions for the future",
        url: "https://tryglimpse.xyz",
        title: `${user?.name} on Glimpse`,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full my-2">
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        className="flex flex-row items-center bg-none border-none cursor-pointer"
      >
        <img
          className="size-10 rounded-[19px] object-cover overflow-hidden"
          src={convertIpfsUrl(pfp)}
          alt="profile"
        />
        <div className="flex flex-col ml-2">
          <p className="text-[17px] text-white font-bold">{name}</p>
          <p className="text-[14px] text-[lightgray] font-semibold">{handle}</p>
        </div>
      </button>
      <button
        onClick={() => {
          type === 1 ? console.log("follow") : shareLink();
        }}
        className={`
          font-bold text-sm p-2.5 rounded-lg overflow-hidden
          ${isFollowing ? "text-gray-500" : "text-[rgb(22,22,22)]"}
          ${isFollowing ? "bg-gray-300" : "bg-white"}
          border-none cursor-pointer
        `}
      >
        {type === 1
          ? isFollowing
            ? "Following"
            : "Follow"
          : isFollowing
          ? "Invited"
          : "Invite"}
      </button>
    </div>
  );
}
