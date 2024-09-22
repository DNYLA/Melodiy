import { Track } from '@melodiy/types';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { Image } from '../Data/Image';

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
      className="flex items-center w-full p-2 cursor-pointer cursor-poiner gap-x-2 "
    >
      <div className="relative overflow-hidden rounded-[3px] h-14 w-14">
        <Image
          src={data.image}
          alt="Media Item"
          className="object-cover h-14 w-14"
        />
      </div>
      <div className="flex flex-col overflow-hidden ">
        <p className="flex text-sm text-white truncate">{data.title}</p>
        <div className="flex gap-x-1">
          {data.artists.map(({ id, name }, i) => (
            <Link to={'/artist/$id'} params={{ id }}>
              <span
                key={id}
                className="text-sm cursor-pointer text-base-accent hover:underline"
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
