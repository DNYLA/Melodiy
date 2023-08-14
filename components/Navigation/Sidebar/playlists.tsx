import React from 'react';
import { twMerge } from 'tailwind-merge';
import { AiOutlinePlus } from 'react-icons/ai';

function Playlists() {
  const tempPlaylists = [
    { name: 'Please Excuse Me for Being Antisocial', active: false },
    { name: "90's rap", active: false },
    { name: 'Rippity Rap', active: false },
    { name: 'Feed tha streets II', active: true },
    { name: 'West Bay', active: false },
    { name: 'Man On The Moon III: The Chosen', active: false },
  ];

  return (
    <div className="flex flex-col py-0 gap-y-1">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Playlists</p>
        <AiOutlinePlus
          // onClick={onClick}
          size={18}
          className="text-neutral-400 cursor-pointer hover:text-white"
        />
      </div>
      <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-inactive">
        {tempPlaylists.map((playlist) => (
          <p
            key={playlist.name}
            className={twMerge(
              `cursor-pointer truncate ... hover:text-white`,
              playlist.active && 'text-white'
            )}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
