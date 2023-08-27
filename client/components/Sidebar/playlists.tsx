import useUploadModal from '@/hooks/modals/useUploadModal';
import { useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface PlaylistHeaderProps {
  children: React.ReactNode;
}

// TODO: Convert to server component once data fetching is correctly setup.
function PlaylistHeader({ children }: PlaylistHeaderProps) {
  const { data: session } = useSession();
  const { onOpen } = useUploadModal();

  return (
    <div className="flex flex-col py-0 gap-y-1">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Playlists</p>
        {session && (
          <AiOutlinePlus
            onClick={() => onOpen()}
            size={18}
            className="text-neutral-400 cursor-pointer hover:text-white"
          />
        )}
      </div>
      {children}
    </div>
  );
}

export default PlaylistHeader;
