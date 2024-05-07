import { Suspense } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { useSession } from '../../../hooks/useSession';
import { useAuthModal } from '../../Modals/Auth/useAuthModal';
import useUploadModal from '../../Modals/MultiUpload/useUploadModal';
import LibraryItems from './LibraryItems';

function Library() {
  const { user, loading } = useSession();
  const { onOpen: onOpenUpload } = useUploadModal();
  const { onOpen: onOpenAuth } = useAuthModal();

  const handleOpen = () => {
    if (user) onOpenUpload();
    else onOpenAuth();
  };

  return (
    <div className="flex flex-col py-0 gap-y-1">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold truncate">Playlists</p>
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
}

export default Library;
