import { ProfileToolTip } from "@/components/profile/ProfileToolTip";
import React from "react";

interface LeaderBoardTopUser {
  name: string;
  image: string;
  score: number;
}

interface LeaderboardTopProps {
  users: LeaderBoardTopUser[];
}

const UserCard: React.FC<{
  user: LeaderBoardTopUser;
  showMarginTop?: boolean;
}> = ({ user, showMarginTop }) => (
  <div
    className={`flex flex-col items-center ${showMarginTop ? "mt-2.5" : ""}`}
  >
    {user.image ? (
      <ProfileToolTip user={{ pfp: user?.image, name: user?.name }}>
        <img
          src={user.image}
          alt={user.name}
          className="h-20 w-20 rounded-full"
        />
      </ProfileToolTip>
    ) : (
      <div className="h-20 w-20 rounded-full bg-gray-300 animate-pulse"></div>
    )}
    {user.name ? (
      <p className="text-lg font-semibold text-white mt-2 mb-0">{user.name}</p>
    ) : (
      <div className="h-4 w-24 bg-gray-300 animate-pulse mt-2 mb-2"></div>
    )}
    {user.score !== undefined ? (
      <p className="text-sm text-[lightgray] font-medium">
        ${user.score.toFixed(2)}
      </p>
    ) : (
      <div className="h-3 w-20 bg-gray-300 animate-pulse"></div>
    )}
  </div>
);

const LeaderBoardTop3: React.FC<LeaderboardTopProps> = ({ users }) => (
  <div className="flex justify-between mt-5 mb-5 w-11/12 mx-auto">
    <UserCard user={users[1]} showMarginTop />
    <UserCard user={users[0]} />
    <UserCard user={users[2]} showMarginTop />
  </div>
);

export default LeaderBoardTop3;
