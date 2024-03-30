import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import usePlaylists from '../../../hooks/usePlaylist';
import { twMerge } from 'tailwind-merge';

export interface ILibraryItem {
  name: string;
  imageUrl: string;
  redirect?: string;
}

//TODO: Conver to Server component
const LibraryItems = () => {
  const { data, isLoading, error } = usePlaylists();
  const path = useRouterState();

  if (error || isLoading) {
    // console.log(error);
    // console.log()

    return <div></div>;
  }

  return (
    <div className="mx-2 flex flex-col gap-y-1 overflow-hidden text-sm font-light text-inactive">
      {data &&
        data.map((playlist) => (
          <Link
            key={playlist.id}
            to={'/playlist/$playlistId'}
            params={{ playlistId: playlist.id }}
            className={twMerge(
              `... cursor-pointer truncate hover:text-white`
              // path === `/playlist/${playlist.id}` && 'text-white'
            )}
          >
            {playlist.title}
          </Link>
        ))}
    </div>
  );
};

export default LibraryItems;
