// @ts-nocheck

import { IUser, IUserWithBet } from "@/supabase/types"



export type BetComment = {
  setReply: () => void
  hasPosition: boolean
  user?: IUser
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
