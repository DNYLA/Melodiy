'use client';
import { Album } from '@/types/playlist';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface IAlbumList {
  header: string;
  albums: Album[];
}

const AlbumList: React.FC<IAlbumList> = ({ header, albums }) => {
  const router = useRouter();

  const handleRedirect = (id: string) => {
    // redirect(`artist/${id}`);
    router.push(`/album/${id}`);
  };
  return (
    <div className="">
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">{header}</h1>
        <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
          View All
        </span>
      </div>
      <div className="flex gap-x-5 overflow-auto">
        {albums.map((album) => (
          <div
            key={album.name}
            className="flex cursor-pointer flex-col gap-y-1"
            onClick={() => handleRedirect(album.uid)}
          >
            <Image
              draggable={false}
              className={'min-h-[200px] min-w-[200px] rounded-md'}
              priority={true}
              // onMouseLeave={() => setFilter(randomImageFilter())} //Looks good but looks weird if u spam or enter/exit quickly
              src={album.coverPath ?? 'images/default_playlist.png'}
              width={200}
              height={200}
              alt="Playlist Cover"
              quality={100}
            />
            <div className="m-0 flex flex-col gap-0 p-0">
              <p className="max-w-[200px] truncate font-bold hover:underline">
                {album.name}
              </p>
              <div className="flex">
                {album.artists.map((artist, i) => (
                  <span
                    key={artist.uid}
                    className="m-0 p-0 text-sm font-light text-[#969696] hover:underline"
                  >
                    {i > 0 ? `, ${artist.name}` : artist.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
