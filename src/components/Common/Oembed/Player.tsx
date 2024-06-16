// @ts-nocheck

import type { OG } from '../../../types/misc'
import type { FC } from 'react'

interface PlayerProps {
  og: OG
}

const Player: FC<PlayerProps> = ({ og }) => {
  const width = '100%' // Adjust the width as needed
  const height = '300px' // Adjust the height as needed

  // Modify the og.html content to include width and height
  const modifiedHtml = og.html.replace(
    /<iframe /,
    `<iframe width="${width}" height="${height}" `,
  )

  return (
    <div
      className="mt-4 w-full rounded-xl overflow-hidden text-sm"
      data-testid={`rich-oembed-${og.url}`}
    >
      <div
        className="oembed-player" // Set the maxWidth to 85vw using a Tailwind CSS class
        dangerouslySetInnerHTML={{ __html: modifiedHtml as string }}
      />
    </div>
  )
}

export default Player
