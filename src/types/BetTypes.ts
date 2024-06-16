export type BetUploadState = {
  question: string;
  title: string;
  icon: string;
  type: string;
  media: string;
  topic: string;
  options: string[];
  marketId: number;
  // A generic setter function type
  setState: (values: Partial<BetUploadState>) => void;
  reset: () => void;
};

export type BetVotingState = {
  question: string;
  title: string;
  betId: string;
  amount: number;
  odds: number;
  option: number;
  // A generic setter function type
  setState: (values: Partial<BetVotingState>) => void;
  reset: () => void;
};

export type betOptions = { name: string; value: number };
export type BetModalProps = {
  image: string;
  betId: string;
  question: string;
  title: string;
  options: betOptions[];
  totalPot: number;
  index: number;
  refetch?: () => void;
};

export interface VotingScreenProps {
  changeStep: (step: number) => void;
  image: string;
  question: string;
  totalPot: number;
  title: string;
  odds: number;
  options: betOptions[];
  onClose: () => void;
}

export interface BetModalConfirmationScreenProps {
  title: string;
  image: string;
  options: betOptions[];
  question: string;
  id: any;
  changeStep: (step: number) => void;
  multiplier: number;
  odds: number
  refetch: ()=> void
}

export interface BetViewProps {
  index: number;
  title: string;
  question: string;
  image: string;
  topic: string;
  marketId: string;
  option1: { amount: number; name: string; image: string };
  option2: { amount: number; name: string; image: string };
}

// Assuming this file is /src/types.ts
export interface NewPrediction {
  user_id: string; // Assuming user_id is stored as a string
  market_id: number;
  amount: number;
  option: string;
  multiplier: number;
}

export interface IPrediction {
  id: number; // assuming id is a number and not a UUID
  user_id: string;
  market_id: number; // or string if the IDs are stored as strings
  amount: number; // or string if you are handling numeric values as strings to prevent precision issues
  option: string;
  multiplier: number; // or string, same as for amount
  created_at: Date;
  isresolved: boolean;
}
