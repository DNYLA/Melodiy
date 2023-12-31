import useAuthModal from '@/hooks/modals/useAuthModal';
import useUploadModal from '@/hooks/modals/useUploadModal';
import useSession from '@/hooks/useSession';
import React, { Suspense } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import LibraryItems from './LibraryItems';

interface IPlaylistTitle {}

const Library: React.FC<IPlaylistTitle> = () => {
  const { user, loading } = useSession();
  const { onOpen: onOpenUpload } = useUploadModal();
  const { onOpen: onOpenAuth } = useAuthModal();

  const handleOpen = () => {
    if (user) onOpenUpload();
    else onOpenAuth();
  };

  return (
    <div className="flex flex-col gap-y-1 py-0">
      <div className="flex items-center justify-between">
        <p className="truncate text-lg font-semibold">Playlists</p>
        {loading ? (
          <FaSpinner size={18} className="animate-spin" />
        ) : (
          <AiOutlinePlus
            onClick={handleOpen}
            size={18}
            className="cursor-pointer text-neutral-400 hover:text-white"
          />
        )}
      </div>
      <Suspense fallback={<FaSpinner size={18} className="animate-spin" />}>
        <LibraryItems />
      </Suspense>
    </div>
  );
};

export default Library;
