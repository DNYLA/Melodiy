import { addTrackToPlaylist } from '@melodiy/api';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { usePlaylists } from '../../../../hooks/query/usePlaylist';
import { AddtoPlaylistIcon } from '@melodiy/icons';
import ContextItemBase from '../Base/ContextItemBase';
import { Input } from '../../../../components/Inputs';

interface AddToPlaylistContextItemProps {
  trackId: string;
}

function AddToPlaylistContextItem({ trackId }: AddToPlaylistContextItemProps) {
  const [filter, setFilter] = useState('');
  const { data, isLoading } = usePlaylists();
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, [filter]);

  const filterPlaylists = () => {
    if (!data || isLoading) return [];

    return data.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleAdd = async (id: string, name: string) => {
    try {
      await addTrackToPlaylist(id, trackId);
      toast.success(`Added to ${name}`);
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
        className="group relative flex h-9 items-center rounded-[3px] py-5 text-sm leading-none outline-none data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive"
      >
        <AddtoPlaylistIcon
          width={45}
          height={45}
          className="group-hover:stroke-content group-[&.active]:stroke-content p-1"
        />
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
          className="min-w-[220px] overflow-hidden rounded-md mx-2 bg-modal p-[5px] text-content"
          sideOffset={2}
          alignOffset={-5}
        >
          <Input
            className="bg-accent text-content placeholder:text-neutral-500"
            type="text"
            id="search"
            placeholder="Search for a playlist"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            ref={searchInput}
            autoFocus
          />

          <ContextMenu.Separator className="m-[5px] h-[1px] bg-violet6" />
          <div className="overflow-y-auto max-h-48">
            {filterPlaylists().map((playlist) => (
              <ContextItemBase
                className="p-2"
                onClick={() => handleAdd(playlist.id, playlist.title)}
                key={playlist.title}
              >
                <span className="truncate">{playlist.title}</span>
              </ContextItemBase>
            ))}
          </div>
        </ContextMenu.SubContent>
      </ContextMenu.Portal>
    </ContextMenu.Sub>
  );
}

export default AddToPlaylistContextItem;
