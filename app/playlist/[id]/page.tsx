import { getPlaylist } from '@/app/action';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Playlist({ params }: { params: { id: string } }) {
  const data = await getPlaylist(params.id);
  console.log(data);
  return (
    <div className="">
      <p>{data.title}</p>
      <p>{data.user.username}</p>
      <p>{data.shareId}</p>
    </div>
  );
}
