export type User = {
  id: number;
  username: string;
  avatar?: string;
};

export type AuthResult = {
  id: number;
  username: string;
  accessToken: string;
};
