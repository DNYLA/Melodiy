export type User = {
  id: number;
  username: string;
};

export type PublicUser = {
  id: number;
  username: string;
};

export type AuthResult = {
  id: string;
  username: string;
  accessToken: string;
};
