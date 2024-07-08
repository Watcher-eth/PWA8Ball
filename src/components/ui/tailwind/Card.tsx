import { twMerge } from 'tailwind-merge'

const baseClassName = `!bg-transparent bg-gradient-to-r from-slate-400/10 to-slate-400/10
  rounded-2xl ring-1 ring-white/10 p-4 rounded-md backdrop-blur-xl`
const titleBaseClassName = "font-medium text-lg text-white"

export function Card({
  title,
  className,
  children,
  titleClassName,
  image,
  divider = true,
  ...props
}: {
  title?: any;
  className?: string;
  children: any;
  titleClassName?: string;
  image?: string;
  divider?: boolean;
  [x: string]: any;
}) {
  const mergedClassName = twMerge(`${baseClassName} ${className}`);
  const mergedTitleClassname = twMerge(
    `${titleBaseClassName} ${titleClassName}`
  );

  let titleContent = null;
  if (title) {
    titleContent = (
      <>
        <div className={mergedTitleClassname}>{title}</div>
        {divider ? <hr className="hidden" /> : ""}
      </>
    );
  }

  return (
    <div {...props} className={mergedClassName}>
      {image && <div className="flex justify-start mb-2">{image}</div>}
      {titleContent}
      {children}
    </div>
  );
}
