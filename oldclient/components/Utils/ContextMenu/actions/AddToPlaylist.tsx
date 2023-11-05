import { revalidatePathClient } from '@/app/action';
import usePlaylistStore from '@/hooks/stores/usePlaylistStore';
import { AXIOS } from '@/utils/network/axios';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface IAddToPlaylistContextItem {
  trackId: string;
}

const AddToPlaylistContextItem: React.FC<IAddToPlaylistContextItem> = ({
  trackId,
}) => {
  const [filter, setFilter] = useState('');
  const { playlists } = usePlaylistStore();
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
        className="group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none data-[highlighted]:bg-neutral-700/80 data-[state=open]:bg-neutral-700/80"
      >
        Add to playlist
        <div className="ml-auto pl-5 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
          <ChevronRightIcon />
        </div>
      </ContextMenu.SubTrigger>
      <ContextMenu.Portal>
        <ContextMenu.SubContent
          onKeyDown={(e) => e.stopPropagation()}
          onKeyDownCapture={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyUpCapture={(e) => e.stopPropagation()}
          className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={2}
          alignOffset={-5}
        >
          <input
            className="bg-blackA5 shadow-blackA9 selection:color-white selection:bg-blackA9 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black]"
            type="text"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            ref={searchInput}
            autoFocus
          />

          <ContextMenu.Separator className="m-[5px] h-[1px] bg-violet6" />

          {filterPlaylists().map((ply) => (
            <ContextMenu.Item
              onClick={() => handleAdd(ply.uid, ply.title)}
              key={ply.title}
              className="group relative flex h-[25px] max-w-[250px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none  data-[highlighted]:bg-neutral-700/80"
            >
              <span className="truncate">{ply.title}</span>
              {/* </div> */}
            </ContextMenu.Item>
          ))}
        </ContextMenu.SubContent>
      </ContextMenu.Portal>
    </ContextMenu.Sub>
  );
};

export default AddToPlaylistContextItem;
