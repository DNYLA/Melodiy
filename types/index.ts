export class ServiceResponse<T> {
  data: T | null = null;
  success: boolean = true;
  message: string = '';
}

export enum PlaylistType {
  Album = 1,
  Playlist = 2,
  Files = 3,
}
