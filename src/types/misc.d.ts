import type { MediaSet } from '@hey/lens'

export interface MediaSetWithoutOnChain extends Omit<MediaSet, 'onChain'> {}

export interface NewAttachment extends MediaSetWithoutOnChain {
  id: string
  file?: File
  previewItem: string
}

export interface UserSuggestion {
  uid: string
  id: string
  display: string
  name: string
  picture: string
}

export interface OG {
  url: string
  title?: string
  description?: string
  site?: string
  image?: string
  favicon?: string
  isLarge?: boolean
  html?: string
}

export type ProfileCategory = { label: string; id: string }

export interface ProfileInterest {
  category: ProfileCategory
  subCategories: ProfileCategory[]
}

export interface Emoji {
  emoji: string
  description: string
  category: string
  aliases: string[]
  tags: string[]
}

export interface MessageDescriptor {
  id?: string
  comment?: string
  message?: string
  context?: string
  values?: Record<string, unknown>
}

export interface OptimisticTransaction {
  txHash?: string
  txId?: string
  title?: string
  cover?: string
  author?: string
  content: string
  attachments: MediaSet[]
}

export interface MarkupLinkProps {
  href?: string
  title?: string
}
