import { ClipboardList } from "lucide-react"
import { toast } from "sonner"
import { showToast } from "./Toasts/showToast"

export function copyToClipboard(text: string) {
  navigator.clipboard
    ?.writeText(text)
    .then(() => {
      console.log("Text copied to clipboard")
      showToast({
        icon: <ClipboardList className="text-white h-[0.95rem]" />,
        message: "Copied to Clipboard",
      })
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}
