import type { Address } from "viem"
// types.ts
export interface IUser {
  internal_id: string;
  external_auth_provider_user_id: string;
  liquiditypoints?: number;
  rewardpoints?: number;
  walletaddress?: Address; // Walet address should be, you know, and address
  socials?: any; // Consider making this more specific if possible
  friends?: any; // Same here
  web_push_subscription?: any; // And here
  created_at?: string; // Assuming you may not always have this when creating a new user
  updated_at?: string; // Same assumption as created_at
  pfp: string,
  name: string,
}

export interface IUserWithBet extends IUser {
  amount: number; // Amount bet on the specific market
  option: string; // Betting option chosen
}
// Adjusted to remove the properties not present when creating a new user

export interface ITopic {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface Option {
  name: string;
  address: string;
}
export interface IMarket {
  id: number;
  topicid: string;
  title: string;
  question: string;
  options: Option[]; // Assuming JSON string or adjust based on actual structure
  image?: string;
  participants: number; // Assuming an integer count
  pair: string;
  outcome: string;
  topic?: ITopic; // This is the new property for topic details
  created_by: string;
}

export type NewMarket = Omit<IMarket, "outcome">; // Assuming 'id' is auto-generated

export type NewUser = Omit<IUser, "created_at" | "updated_at">;
export type NewTopic = Omit<ITopic, "id">;
