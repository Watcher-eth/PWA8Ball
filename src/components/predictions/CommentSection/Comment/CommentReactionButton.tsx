export function CommentReactionButton({
  onClick,
  IconComponent,
  className,
}: {
  onClick: () => void
  IconComponent: React.FC<any>
  className: string
}) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-none border-none cursor-pointer
        flex items-center hover:scale-103 active:scale-98
      `}
    >
      <IconComponent
        size={19}
        strokeWidth={3}
        className={`
          transition-all duration-75 hover:scale-101 active:scale-99
          ${className}
        `}
      />
    </button>
  )
}
