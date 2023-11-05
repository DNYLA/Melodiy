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

export type TokenPayload = {
  sub: string;
  name: string;
  jti: string;
  exp: Date;
  iss: string;
  aud: string;
};
