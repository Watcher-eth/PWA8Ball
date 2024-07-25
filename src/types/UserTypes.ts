export type User = {
  id: string;
  name: string;
  walletaddress: string;
  pfp: string;
  pointsBalance: number;
  setState: (values: Partial<User>) => void;
  reset: () => void;
};

export type EditUserState = {
  name: string;
  pfp: string;
  background: string;
  setState: (values: Partial<EditUserState>) => void;
  reset: () => void;
};
