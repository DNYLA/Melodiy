import useUploadModal from '@/hooks/modals/useUploadModal';
import { useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface IPlaylistTitle {
  children: React.ReactNode;
}

// TODO: Convert to server component once data fetching is correctly setup.
const PlaylistTitle: React.FC<IPlaylistTitle> = ({ children }) => {
  const { data: session } = useSession();
  const { onOpen } = useUploadModal();

  return (
    <div className="flex flex-col gap-y-1 py-0">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Playlists</p>
        {session && (
          <AiOutlinePlus
            onClick={() => onOpen()}
            size={18}
            className="cursor-pointer text-neutral-400 hover:text-white"
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default PlaylistTitle;
