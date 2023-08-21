import React, { useEffect, useRef, useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import usePlaylistStore from '@/hooks/stores/usePlaylistStore';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { revalidatePathClient } from '@/app/action';

interface Props {
  trackId: string;
}

export default function AddToPlaylistMenu({ trackId }: Props) {
  const [filter, setFilter] = useState('');
  const { playlists } = usePlaylistStore();
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, [filter]);

  const filterPlaylists = () => {
    return playlists.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleAdd = async (id: string, name: string) => {
    try {
      const { data } = await AXIOS.post(
        `playlist/song?playlistId=${id}&trackId=${trackId}`
      );
      if (!data.success) throw new Error('Playlist not created');
      toast.success(`Added to ${name}`);
      await revalidatePathClient(`playlist/${id}`);
    } catch (err) {
      console.log(err);
      toast.error('Unable to add to playlist');
    }
  };

  return (
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger
        onKeyDown={(e) => e.preventDefault()}
        onKeyDownCapture={(e) => e.preventDefault()}
        onKeyUp={(e) => e.preventDefault()}
        onKeyUpCapture={(e) => e.preventDefault()}
        className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none data-[state=open]:bg-neutral-700/80 data-[highlighted]:bg-neutral-700/80"
      >
        Add to playlist
        <div className="ml-auto pl-5 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
          <ChevronRightIcon />
        </div>
      </ContextMenu.SubTrigger>
      <ContextMenu.Portal>
        <ContextMenu.SubContent
          onKeyDown={(e) => e.stopPropagation()}
          onKeyDownCapture={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyUpCapture={(e) => e.stopPropagation()}
          className="min-w-[220px] bg-[#1b1818] text-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={2}
          alignOffset={-5}
        >
          <input
            className="bg-blackA5 shadow-blackA9 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
            type="text"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            ref={searchInput}
            autoFocus
          />

          <ContextMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          {filterPlaylists().map((ply) => (
            <ContextMenu.Item
              onClick={() => handleAdd(ply.uid, ply.title)}
              key={ply.title}
              className="group max-w-[250px] text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80"
            >
              <span className="truncate">{ply.title}</span>
              {/* </div> */}
            </ContextMenu.Item>
          ))}
        </ContextMenu.SubContent>
      </ContextMenu.Portal>
    </ContextMenu.Sub>
  );
}
