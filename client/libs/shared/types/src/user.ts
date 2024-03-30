export type User = {
  id: number;
  username: string;
  avatar?: string;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};
