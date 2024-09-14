import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { usePlaylists } from '../../../hooks/query/usePlaylist';

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
    <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-inactive">
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
