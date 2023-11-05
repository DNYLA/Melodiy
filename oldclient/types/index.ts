export type ServiceResponse<T> = {
  message: string;
} & (SuccessProps<T> | FailProps<T>);

interface SuccessProps<T> {
  success: true;
  data: T;
}

type FailProps<T> = {
  success: false;
  data?: T;
};

export enum PlaylistType {
  Album = 1,
  Playlist = 2,
  Files = 3,
}
