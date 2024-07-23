import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";



export function DropdownItem({
  label,
  IconComponent,
  iconSrc,
  href,
  disabled = false,
  onClick,
}: {
  label: string;
  IconComponent?: React.FC;
  iconSrc?: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const dropdownContent = (
    <DropdownMenuItem
      onClick={onClick}
      className="flex flex-row justify-between items-center hover:!bg-slate-400/20 rounded-md"
      disabled={disabled}
    >
      {label}
      {IconComponent && (
        <IconComponent className="size-4 text-white" strokeWidth={2.2} />
      )}
      {iconSrc?.length > 0 && (
        <img className="size-4 rounded-full" src={iconSrc} />
      )}
    </DropdownMenuItem>
  );
  return href ? (
    <Link href={href} prefetch={true}>
      {dropdownContent}
    </Link>
  ) : (
    dropdownContent
  );
}
