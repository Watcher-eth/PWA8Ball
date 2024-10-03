// @ts-nocheck

import { IUser, IUserWithBet } from "@/supabase/types"
import { User } from "@/__generated__/graphql"

export type BetComment = {
  setReply: () => void
  hasPosition: boolean
  user?: User
  user2: IUserWithBet
  handleComment: () => void
  name: string
  pfp: string
  content: string
  date: string
  extraComments: BetComment[]
  id: string
  currentUser: string
  created_by: string
}
