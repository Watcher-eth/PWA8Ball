// @ts-nocheck
import _ from "lodash";

export function MiniExternalLink({
  IconComponent,
  href,
  iconClassName = ""
}: {
  IconComponent?: any,
  href?: string,
  iconClassName?: string
}) {
  return (
    href &&
    href !== "unknown" && (
      <a
        className="group rounded-md bg-slate-400/10 ring-1 ring-white/10 hover:ring-white/20 "
        href={href}
        onClick={(e) => e.stopPropagation()}
        target="_blank"
      >
        <IconComponent
          className={`w-3 h-3 inline-block mx-1.5 -mt-0.5 ${iconClassName}`}
        />
      </a>
    )
  );
}
