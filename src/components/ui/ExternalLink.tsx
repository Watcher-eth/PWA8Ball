import _ from "lodash"

export function ExternalLink({ label, IconComponent, href, iconClassName="" }) {
  return ( href && (href !== "unknown") && (href?.length > 0) &&
    <a
      className="group rounded-md bg-slate-400/10 ring-1 ring-white/10 hover:ring-white/20 m-1 pb-0.5"
      href={href}
      target="_blank"
    >
      <IconComponent
        className={`w-3 h-3 inline-block mx-1 -mt-0.5 ${iconClassName}`}
      />
      {label && (
        <>
          <div className="inline-block text-white/70 text-xs pr-2 group-hover:text-white">
            {label}
          </div>
          {/* <ClipboardIconButton content={address} /> */}
        </>
      )}
    </a>
  );
}
