import { ClipboardList } from "lucide-react"
import { toast } from "sonner"

export function copyToClipboard(text: string) {
  navigator.clipboard
    ?.writeText(text)
    .then(() => {
      console.log("Text copied to clipboard")
      toast(
        <div className="w-full rounded-full bg-[#212121]/30 backdrop-blur-lg border-[0.1rem] border-[#212121]/20 text-base font-medium px-3 pr-4 text-white flex flex-row items-center p-2">
          <div className="p-0.5 py-1.5 rounded-full bg-[#323232] mr-2 flex justify-center items-center">
            <ClipboardList className="text-white h-[0.95rem]" />
          </div>
          Copied to Clipboard
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
      )
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}
