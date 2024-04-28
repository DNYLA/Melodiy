import { Track } from '@melodiy/types';
import { Image } from '../Data';
import React from 'react';
import { Link } from '@tanstack/react-router';

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
      className="cursor-poiner flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-600/25"
    >
      <div className="relative h-[48px] w-[48px] overflow-hidden rounded-md">
        <Image src={data.image} alt="Media Item" className="object-cover" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="flex truncate text-white hover:underline">{data.title}</p>
        <Link to="/artist/$id" params={{ id: 15 }}></Link>
        <div className="flex gap-x-1">
          {data.artists.map(({ id, name }, i) => (
            <Link to={'/artist/$id'} params={{ id }}>
              <span
                key={id}
                className="cursor-pointer text-sm text-inactive hover:underline"
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
