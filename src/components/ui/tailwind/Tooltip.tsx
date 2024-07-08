// @ts-nocheck
import { useRef, useState } from 'react'
import { createPopper } from '@popperjs/core'
// import {flip, preventOverflow} from '@popperjs/core'

export function Tooltip({
  children,
  title,
  content,
  className,
  placement,
}: {
  children: any
  title?: any
  content: any
  className?: string
  placement?: string
}) {
  const [tooltipShow, setTooltipShow] = useState(false)
  const btnRef = useRef()
  const tooltipRef = useRef()
  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: placement ?? "auto-start",
      // strategy: "fixed",
      // offset: [500, 500],
      // modifiers: [preventOverflow, flip],
    });
    setTooltipShow(true)
  }
  const closeLeftTooltip = () => {
    setTooltipShow(false)
  }

  return (
    <>
      <div
        onMouseEnter={openLeftTooltip}
        onMouseLeave={closeLeftTooltip}
        ref={btnRef}
        className={`inline-block ${className}`}
      >
        {children}
      </div>
      <div className="overflow-visible">
        <div
          className={`
            backdrop-blur-lg border border-white/10
            mt-3 z-50 font-normal leading-normal
            text-sm max-w-[300px] text-left no-underline break-words rounded-lg
            ${tooltipShow ? 'block' : 'hidden'}
          `}
          ref={tooltipRef}
        >
          <div>
            {title && (
              <div
                className={`
                  font-medium rounded-t-lg tracking-wide
                  py-2 px-3 mb-0
                  text-gray-50
                  border-b border-solid border-white/10
                `}
              >
                {title}
              </div>
            )}
            <div className="p-3 font-light text-white">{content}</div>
          </div>
        </div>
      </div>
    </>
  )
}


