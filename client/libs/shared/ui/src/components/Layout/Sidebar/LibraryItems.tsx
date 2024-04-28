import { Link } from '@tanstack/react-router';
import { usePlaylists } from '../../../hooks/query/usePlaylist';
import { twMerge } from 'tailwind-merge';

export interface ILibraryItem {
  name: string;
  imageUrl: string;
  redirect?: string;
}

const LibraryItems = () => {
  const { data, isLoading, error } = usePlaylists();

  if (error || isLoading) {
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
            className={twMerge(`... cursor-pointer truncate hover:text-white`)}
            activeProps={{
              style: {
                color: 'white',
              },
            }}
          >
            {playlist.title}
          </Link>
        ))}
    </div>
  );
};

export default LibraryItems;
