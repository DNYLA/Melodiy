'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { AiOutlinePlus } from 'react-icons/ai';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const fetcherWithToken = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res: any) => res.data);

export const fetchWithUser = async (url: string, token: string) => {
  return fetch(`${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error;
    }
  });
};
// TODO: Convert to server component once data fetching is correctly setup.
function Playlists() {
  const { data: session } = useSession();
  const router = useRouter();

  // const { data, error } = useSWR(
  //   [
  //     `http://localhost:5062/api/playlist`,
  //     'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJkYW4iLCJuYmYiOjE2OTIwMjY3NTMsImV4cCI6MTY5MjYzMTU1MywiaWF0IjoxNjkyMDI2NzUzfQ.6bbnqHg5-3FWPEqKoTwo9WbbEPyiOoUFqgiDuzudzMQDHRtz2lAR2gX1r5mOebD9PvZLVN5cNTaQxvE-ewH_4g',
  //   ],
  //   fetcherWithToken
  // );
  const { data: playlists, isLoading } = useSWR(
    session?.user.accessToken
      ? ['http://localhost:5062/api/playlist', session?.user.accessToken]
      : null,
    ([url, token]) => fetcherWithToken(url, token)
  );
  // console.log(data);
  // console.log(error);
  const tempPlaylists = [
    { name: 'Please Excuse Me for Being Antisocial', active: false },
    { name: "90's rap", active: false },
    { name: 'Rippity Rap', active: false },
    { name: 'Feed tha streets II', active: true },
    { name: 'West Bay', active: false },
    { name: 'Man On The Moon III: The Chosen', active: false },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (!playlists)
    return (
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Playlists</p>
        <AiOutlinePlus
          // onClick={onClick}
          size={18}
          className="text-neutral-400 cursor-pointer hover:text-white"
        />
      </div>
    );

  console.log(playlists);

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
        {playlists.data.map((playlist: any) => (
          <p
            key={playlist.shareId}
            className={twMerge(
              `cursor-pointer truncate ... hover:text-white`,
              playlist.active && 'text-white'
            )}
            onClick={() => router.push(`/playlist/${playlist.shareId}`)}
          >
            {playlist.title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
