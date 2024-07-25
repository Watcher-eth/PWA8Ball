import { User } from "@/types/UserTypes";
import { useState } from "react";

interface AddCommentProps {
  user: User;
}

function AddComment({ user }: AddCommentProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-row w-full mb-5 mt-3">
      <img
        className="size-12 rounded-[50%] overflow-hidden object-cover mr-2.5"
        src={user.pfp}
        alt="User Profile"
      />
      <div className="flex flex-col w-[95%]">
        <input
          placeholder="Add a comment..."
          className={`border-b-[0.8px] placeholder-[lightgray] w-full border-[#303030] text-[lightgray] bg-[transparent] focus:outline-none transition-all duration-300 ${
            isFocused ? "border-b-[2px] border-[lightgray]" : ""
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ outline: "none" }}
        />
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="text-white text-[1rem]"></div>
      </div>
    </div>
  );
}

export default AddComment;
