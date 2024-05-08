import { Playlist } from '@melodiy/types';
import { FC } from 'react';
import { PlaylistCard } from '../../Cards';

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
      <div className="flex items-center justify-between mb-1 align-middle">
        {header && <h1 className="text-xl font-bold">{header}</h1>}
        {viewMoreRedirect && (
          <span className="text-sm font-light text-center uppercase align-middle transition-all ease-in-out delay-100 cursor-pointer hover:opacity-80">
            View All
          </span>
        )}
      </div>

      <div className="flex pb-3 overflow-x-auto overflow-y-hidden gap-x-5">
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
