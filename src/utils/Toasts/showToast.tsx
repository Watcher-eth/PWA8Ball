import { toast } from "sonner"

export const showToast = (icon: React.ReactNode, message: string) => {
  toast(
    <div className="w-full rounded-full bg-[#212121]/40 backdrop-blur-lg border-[0.1rem] border-[#212121]/20 text-base font-medium px-3 pr-4 text-white flex flex-row items-center p-2">
      <div className="p-0.5 py-1.5 rounded-full bg-[rgba(52, 199, 89, 0.15)] mr-2 flex justify-center items-center">
        {icon}
      </div>
      {message}
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
}
