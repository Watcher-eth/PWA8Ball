// @ts-nocheck

import { useCreateComment } from "@/supabase/mutations/useCreateComment";
import { User } from "@/types/UserTypes";
import { formatDateWithMilliseconds } from "@/utils/datetime/extractEndDate";
import { CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface AddCommentProps {
  user: User;
  id: number;
  topic_id: string;
  addOptimisticComment: () => void;
}

function AddComment({
  user,
  id,
  topic_id,
  addOptimisticComment,
}: AddCommentProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [content, setContent] = useState<string>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: AddComment } = useCreateComment();

  const handleCancel = () => {
    setIsFocused(false);
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
    const result = await AddComment({
      market_id: id,
      content: content!,
      created_by: user?.external_auth_provider_user_id,
      topic_id: topic_id,
      parent_id: "words[1]",
    });

    addOptimisticComment({
      name: user.name,
      pfp: user.pfp,
      content: content,
      date: formatDateWithMilliseconds(date),
      extraComments: [],
      id: id,
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
      <div className="flex flex-col w-[95%] relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
          placeholder="Add a comment..."
          rows={1}
          className={`pb-1 placeholder-[lightgray] w-full border-[#303030] text-[lightgray] bg-[transparent] focus:outline-none transition-all duration-300 resize-none ${
            isFocused ? "border-b-2 border-b-transparent" : "border-b-[0.8px]"
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={handleInput}
          style={{ outline: "none", overflow: "hidden" }}
        />
        <span
          className={`absolute left-0 w-full h-[2px] transition-all duration-300 ${
            isFocused
              ? "bg-[lightgray] scale-x-100"
              : "bg-[transparent] scale-x-0"
          }`}
          style={{
            transformOrigin: "center",
            top: `${26 + (lineCount - 1) * 24}px`,
          }}
        ></span>
        {isFocused && (
          <div className="flex flex-row mt-3 items-center space-x-3 justify-end">
            <div
              className="text-white text-[0.9rem] font-semibold cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </div>
            <div
              onClick={addUserComment}
              className="text-white text-[0.9rem] font-semibold py-1.5 px-3 bg-[#FF0050] rounded-full cursor-pointer"
            >
              Comment
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddComment;
