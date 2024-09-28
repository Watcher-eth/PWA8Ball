export function SocialOnboardButton({
  IconComponent,
  onClick,
  label,
}: {
  IconComponent: React.FC<any>
  onClick: () => void
  label?: string
}) {
  return (
    <div
      className={`
        hover:scale-105 active:scale-98 transition-all
        p-3 bg-[#151515] border-2 border-[#181818]
        w-[5vw] justify-center items-center
        flex rounded-[0.4rem] text-white cursor-pointer
      `}
      onClick={onClick}
    >
      <IconComponent className="w-5 h-5 sm:w-10" />
    </div>
  )
}
