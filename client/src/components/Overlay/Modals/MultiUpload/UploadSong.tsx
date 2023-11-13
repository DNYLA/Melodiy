'use client';

export interface IUploadSongForm {
  title: string;
  artist: string;
  album: string;
  albumArtist: string;
  image?: FileList;
  song: FileList;
}

export interface IUploadSong {}

const UploadSong: React.FC<IUploadSong> = () => {
  return <div>Upload Song Modal</div>;
};

export default UploadSong;
