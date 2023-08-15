import { PublicUser } from './user';

export type Playlist = {
  id: number;
  shareId: string;
  title: string;
  imagePath: string;
  user: PublicUser;
};
