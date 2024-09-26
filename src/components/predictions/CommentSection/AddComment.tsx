// @ts-nocheck
import { useState, useRef } from "react"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"
import type { User } from "@/types/UserTypes"
import { useCreateComment } from "@/supabase/mutations/useCreateComment"

import { formatDateWithMilliseconds } from "@/utils/datetime/extractEndDate"
import { useUserStore } from "@/lib/stores/UserStore"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"

export function AddComment({
  id,
  topic_id,
  addOptimisticComment,
}: {
  id: number
  topic_id: string
  addOptimisticComment: () => void
}) {
  const [lineCount, setLineCount] = useState(1)
  const [content, setContent] = useState<string>()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { mutate: addComment } = useCreateComment()

  const { user } = useUserStore()
  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  console.log("params", id, topic_id)
  const handleInput = () => {
    if (inputRef.current) {
      const lines = inputRef.current.value.split("\n").length
      setLineCount(lines)
      // Adjust the height of the textarea to fit the content
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }

  async function addUserComment() {
    const date = new Date()
    if (content?.length < 1) {
      toast.error("Comment cannot be empty!", {})
      return
    }
    addOptimisticComment({
      user2: { name: user.name, pfp: user.pfp },
      user: { name: user.name, pfp: user.pfp },
      name: user.name,
      pfp: user.pfp,
      content: content,
      date: formatDateWithMilliseconds(date),
      extraComments: [],
      id: id,
    })

    const result = await addComment({
      market_id: id,
      content: content!,
      created_by: user?.walletAddress,
      topic_id: topic_id,
      parent_id: null,
    })

    toast.success("Commented successfully!", {
      icon: <CheckCircle color="#34C759" height={"15px"} />,
      style: {
        backgroundColor: "rgba(52, 199, 89, 0.15)",
        backdropFilter: "blur(20px)",
        color: "white",
        border: "0px",
      },
    })
  }

  return (
    <div className="flex flex-row -mb-9 w-full  mt-4">
      <img
        className="h-10 min-w-10  rounded-[50%] overflow-hidden object-cover mr-2.5"
        src={user?.pfp ? user?.pfp : DEFAULT_PFP_PLACEHOLDER}
        alt="User Profile"
      />
      <div className="flex flex-col w-full relative group">
        <div
          className=" h-11  rounded-full bg-transparent placeholder-[lightgray] w-full  text-[lightgray] focus:outline-none transition-all duration-300 
           text-xl  outline-none "
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ref={inputRef}
            placeholder="Join the discussion..."
            rows={1}
            className={`p-[0.5rem] -mt-0.5 rounded-md px-3.5 border-[#353535]  pb-2 bg-transparent placeholder-[lightgray] w-full  text-[white] focus:outline-none transition-all duration-300 
          text-[1.05rem] border-[0.95px] focus:border-b-1 focus:border-[lightgray]  outline-none overflow-hidden
          `}
            onInput={handleInput}
          />
        </div>
        {/* <span
          className={`absolute left-0 w-7/10 h-[2px] transition-all duration-300
            group-focus-within:bg-[#505050] group-focus-within:scale-x-100
            bg-transparent scale-x-0 transform origin-center
          `}
          style={{
            transformOrigin: "center",
            top: `${26 + (lineCount - 1) * 24}px`,
          }}
        ></span> */}

        <div // hidden group-focus-within:flex
          className={`
            h-12 group-focus-within:h-12 group-focus-within:mb-9 flex flex-row  items-center space-x-3 justify-end
           mt-0 group-focus-within:mt-1  overflow-y-hidden overflow-x-visible transition-all
            opacity-0 group-focus-within:opacity-100 px-0
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
              text-black
              bg-white
            `}
            label="Comment"
          />
        </div>
      </div>
    </div>
  )
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
  )
}
