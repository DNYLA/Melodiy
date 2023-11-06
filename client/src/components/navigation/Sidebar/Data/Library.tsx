// import useAuthModal from '@/hooks/modals/useAuthModal';
// import useUploadModal from '@/hooks/modals/useUploadModal';
// import { useSession } from 'next-auth/react';
import LibraryItems from '@/components/navigation/Sidebar/Data/LibraryItems';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface IPlaylistTitle {
}

// TODO: Convert to server component once data fetching is correctly setup.
const Library: React.FC<IPlaylistTitle> = () => {
  // const { data: session } = useSession();
  // const { onOpen: onOpenUpload } = useUploadModal();
  // const { onOpen: onOpenAuth } = useAuthModal();

  const handleOpen = () => {
    // if (session) onOpenUpload();
    // else onOpenAuth();
  };

  return (
    <div className="flex flex-col gap-y-1 py-0">
      <div className="flex items-center justify-between">
        <p className="truncate text-lg font-semibold">Playlists</p>
        <AiOutlinePlus
          onClick={handleOpen}
          size={18}
          className="cursor-pointer text-neutral-400 hover:text-white"
        />
      </div>
      <LibraryItems />
    </div>
  );
};

export default Library;
