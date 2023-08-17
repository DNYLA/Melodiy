import { Song } from '@/types/playlist';
import React from 'react';

interface Props {
  songs: Song[];
}

export default function SongList({ songs }: Props) {
  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
}
