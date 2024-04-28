import { Playlist } from '@melodiy/types';
import { PlaylistCard } from '../../Cards';
import { FC } from 'react';

export interface PlaylistListProps {
  header?: string;
  playlists: Playlist[];
  viewMoreRedirect?: string;
}

const PlaylistList: FC<PlaylistListProps> = ({
  header,
  playlists,
  viewMoreRedirect,
}) => {
  return (
    <div className="pl-3">
      <div className="mb-1 flex items-center justify-between align-middle">
        {header && <h1 className="text-xl font-bold">{header}</h1>}
        {viewMoreRedirect && (
          <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
            View All
          </span>
        )}
      </div>

      <div className="flex gap-x-5 overflow-x-auto overflow-y-hidden pb-3">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            title={playlist.title}
            owner={playlist.user}
            imageSrc={playlist.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
