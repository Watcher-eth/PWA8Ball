export type User = {
  id: string;
  name: string;
  address: string;
  pfp: string;
  pointsBalance: number;
  streak: number;
  accuracy: number;
  friends: User[] | [];
  // A generic setter function type
  setState: (values: Partial<User>) => void;
  reset: () => void;
};


export type EditUserState = {
  name: string;
  pfp: string;
  background: string
  // A generic setter function type
  setState: (values: Partial<EditUserState>) => void;
  reset: () => void;
};
