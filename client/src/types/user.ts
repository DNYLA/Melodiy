export type Session = {
  accessToken: string;
  user: User;
};

export type User = {
  id: number;
  username: string;
  avatar?: string;
};

export type PublicUser = {
  id: number;
  username: string;
};

export type AuthResult = {
  id: number;
  username: string;
  accessToken: string;
};

export type TokenPayload = {
  sub: string;
  name: string;
  jti: string;
  exp: Date;
  iss: string;
  aud: string;
};
