import { Playlist } from './collections';

export type User = {
  id: number;
  username: string;
  avatar?: string;
};

export type UserProfile = {
  id: number;
  username: string;
  avatar?: string;
  playlists: Playlist[];
};

export type UserFeed = {
  playlists: Playlist[];
};

export type AuthInfo = {
  serverEphemeral: string;
  salt: string;
  srpSession: string;
};

export type AuthResult = {
  user: User;
  serverProof: string;
  accessToken: string;
};
