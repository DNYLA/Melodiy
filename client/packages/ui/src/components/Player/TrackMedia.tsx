import { Track } from '@melodiy/types';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { Image } from '../Data';

interface TrackMediaProps {
  data: Track;
  onClick?: (id: string) => void;
}

const TrackMedia: React.FC<TrackMediaProps> = ({ data, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    //TODO: Default turn on player
  };

  return (
    // <SongContextMenu
    //   trackId={data.uid}
    //   ownerId={data.user?.id}
    //   key={data.uid}
    //   type={PlaylistType.Playlist}
    // >
    <div
      onClick={handleClick}
      className="flex items-center w-full p-2 rounded-md cursor-pointer cursor-poiner gap-x-3 hover:bg-neutral-600/25"
    >
      <div className="relative h-[48px] w-[48px] overflow-hidden rounded-md">
        <Image src={data.image} alt="Media Item" className="object-cover" />
      </div>
      <div className="flex flex-col overflow-hidden gap-y-1">
        <p className="flex text-white truncate hover:underline">{data.title}</p>
        <Link to="/artist/$id" params={{ id: 15 }}></Link>
        <div className="flex gap-x-1">
          {data.artists.map(({ id, name }, i) => (
            <Link to={'/artist/$id'} params={{ id }}>
              <span
                key={id}
                className="text-sm cursor-pointer text-inactive hover:underline"
              >
                {name}
                {i !== data.artists.length - 1 ? ',' : ''}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    // </SongContextMenu>
  );
};

export default TrackMedia;
