// @ts-nocheck

import { IUserWithBet } from "@/lib/drizzle/drizzle/supabase/queries/markets/getUsersForMarket";
import { IUser } from "@/lib/drizzle/drizzle/supabase/types";

export type PostFeedType = {
  name: string;
  post: string;
  type: string;
  image: string;
};

export type PostUploadState = {
  content: string;
  type: string;
  media: string;
  topic: string;
  // A generic setter function type
  setState: (values: Partial<PostUploadState>) => void;
  reset: () => void;
};

export type BetComment = {
  setReply: () => void;
  hasPosition: boolean;
  user?: IUser;
  user2: IUserWithBet;
  handleComment: () => void;
  name: string;
  pfp: string;
  content: string;
  date: string;
  extraComments: BetComment[];
  id: string;
  currentUser: string;
  created_by: string;
};
