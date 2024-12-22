import { AddtoPlaylistIcon, PlaylistIcon } from '@melodiy/icons';
import { Link } from '@melodiy/router';
import { twMerge } from 'tailwind-merge';
import { useSession } from '../../../hooks';
import { usePlaylists } from '../../../hooks/query/usePlaylist';
import { useAuthModal } from '../../Modals';
import { useUploadModal } from '../../Modals/MultiUpload/useUploadModal';

export interface ILibraryItem {
  name: string;
  imageUrl: string;
  redirect?: string;
}

const LibraryItems = () => {
  const { data, isLoading, error } = usePlaylists();
  const { user } = useSession();
  const { onOpen: onOpenUpload } = useUploadModal();
  const { onOpen: onOpenAuth } = useAuthModal();

  const handleOpen = () => {
    if (user) onOpenUpload();
    else onOpenAuth();
  };
  if (error || isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-inactive">
      {data &&
        data.map((playlist) => (
          <Link
            key={playlist.id}
            to={'/playlist/$id'}
            params={{ id: playlist.id }}
            className={twMerge(
              `... cursor-pointer truncate hover:text-white flex flex-row items-center self-stretch`
            )}
            activeProps={{
              style: {
                color: 'white',
              },
            }}
          >
            <PlaylistIcon
              width={30}
              height={30}
              className="group-hover:stroke-content"
            />
            {playlist.title}
          </Link>
        ))}

      <div
        className={twMerge(
          `... cursor-pointer truncate hover:text-white flex flex-row items-center self-stretch font-medium`
        )}
        onClick={handleOpen}
      >
        <AddtoPlaylistIcon
          width={30}
          height={30}
          className="group-hover:stroke-content h-[50%]"
        />
        Create
      </div>
    </div>
  );
};

export default LibraryItems;
