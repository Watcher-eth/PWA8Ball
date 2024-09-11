export function NavIconButton({
  icon,
  IconComponent,
  className = "",
  iconClassName = "",
}: {
  icon?: React.ReactNode
  IconComponent?: any
  className?: string
  iconClassName?: string
}) {
  return (
    <div
      className={`
        hover:scale-105 active:scale-98 transition-all
        cursor-pointer ${className}
      `}
    >
      {icon ?? (
        <IconComponent
          className={`size-6 ${iconClassName}`}
          strokeWidth={2.9}
        />
      )}
    </div>
  )
}
