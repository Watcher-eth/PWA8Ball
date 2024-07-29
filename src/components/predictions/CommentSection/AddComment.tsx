// @ts-nocheck
import { useState, useRef } from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import type { User } from "@/types/UserTypes";
import { useCreateComment } from "@/supabase/mutations/useCreateComment";

import { formatDateWithMilliseconds } from "@/utils/datetime/extractEndDate";

export function AddComment({
  user,
  id,
  topic_id,
  addOptimisticComment,
}: {
  user: User;
  id: number;
  topic_id: string;
  addOptimisticComment: () => void;
}) {
  const [lineCount, setLineCount] = useState(1);
  const [content, setContent] = useState<string>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: addComment } = useCreateComment();

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      const lines = inputRef.current.value.split("\n").length;
      setLineCount(lines);
      // Adjust the height of the textarea to fit the content
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  async function addUserComment() {
    const date = new Date();
    if (content?.length < 1) {
      toast.error("Comment cannot be empty!", {});
      return;
    }
    addOptimisticComment({
      name: user.name,
      pfp: user.pfp,
      content: content,
      date: formatDateWithMilliseconds(date),
      extraComments: [],
      id: id,
    });
    const result = await addComment({
      market_id: id,
      content: content!,
      created_by: user?.external_auth_provider_user_id,
      topic_id: topic_id,
      parent_id: "words[1]",
    });

    toast.success("Commented successfully!", {
      icon: <CheckCircle height={"15px"} />,
      style: {
        backgroundColor: "rgba(21, 21, 21, 0.75)",
        backdropFilter: "blur(20px)",
        color: "white",
        border: "0px",
      },
    });
  }

  return (
    <div className="flex flex-row w-full mb-1 mt-3">
      <img
        className="size-12 rounded-[50%] overflow-hidden object-cover mr-2.5"
        src={user?.pfp}
        alt="User Profile"
      />
      <div className="flex flex-col w-full relative group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
          placeholder="Add a comment..."
          rows={1}
          className={`pb-1 bg-[transparent] placeholder-[lightgray] w-full border-[#303030] text-[lightgray] bg-transparentfocus:outline-none transition-all duration-300 resize-none
          border-b-[0.8px] focus:border-b-2 focus:border-b-transparent outline-none overflow-hidden
          `}
          onInput={handleInput}
        />
        <span
          className={`absolute left-0 w-full h-[2px] transition-all duration-300
            group-focus-within:bg-[#505050] group-focus-within:scale-x-100
            bg-transparentscale-x-0 transform origin-center
          `}
          style={{
            transformOrigin: "center",
            top: `${26 + (lineCount - 1) * 24}px`,
          }}
        ></span>

        <div // hidden group-focus-within:flex
          className={`
            h-12 group-focus-within:h-12 flex flex-row  items-center space-x-3 justify-end
            mt-0 group-focus-within:mt-2 overflow-y-hidden overflow-x-visible transition-all
            opacity-0 group-focus-within:opacity-100 px-2
          `}
        >
          <CommentActionButton
            className={`
              text-white/80
              hover:text-white/100 hover:ring-1 hover:ring-white/10
            `}
            onClick={handleCancel}
            label="Cancel"
          />
          <CommentActionButton
            onClick={() => addUserComment()}
            className={`
              text-white
              bg-blue-600
            `}
            label="Comment"
          />
        </div>
      </div>
    </div>
  );
}

function CommentActionButton({ onClick, label, className = "" }) {
  return (
    <div
      className={`
        text-sm font-semibold cursor-pointer
        py-1.5 px-3 rounded-full
        hover:scale-105 active:scale-95 transition-all

        ${className}
      `}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
