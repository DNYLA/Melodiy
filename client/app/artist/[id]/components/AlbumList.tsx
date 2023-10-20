import Image from 'next/image';

export interface IAlbumList {}

const AlbumList: React.FC<IAlbumList> = () => {
  const albums = [
    {
      title: 'Feed Tha Streets III',
      artist: 'Roddy Ricch',
      cover: 'https://i.scdn.co/image/ab67616d0000b273d513f31f1445121235424acb',
    },
    {
      title: 'Live Life Fast',
      artist: 'Roddy Ricch',
      cover: 'https://i.scdn.co/image/ab67616d0000b2738007e1fcf108e4270b6df942',
    },
    {
      title: 'Please Excuse Me For Being Antisocial',
      artist: 'Roddy Ricch',
      cover: 'https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f',
    },
    {
      title: 'Feed Tha Streets II',
      artist: 'Roddy Ricch',
      cover: 'https://i.scdn.co/image/ab67616d0000b273434f4eeb4231f6f4862cafd4',
    },
    {
      title: 'Feed Tha Streets',
      artist: 'Roddy Ricch',
      cover: 'https://i.scdn.co/image/ab67616d00001e02b834dd9d23629caa40dc62f2',
    },
  ];

  return (
    <div className="">
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">Albums</h1>
        <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
          View All
        </span>
      </div>
      <div className="flex gap-x-5">
        {albums.map((album) => (
          <div
            key={album.title}
            className="flex cursor-pointer flex-col gap-y-1"
          >
            <Image
              draggable={false}
              className={'h-[200px] w-[200px] rounded-md'}
              priority={true}
              // onMouseLeave={() => setFilter(randomImageFilter())} //Looks good but looks weird if u spam or enter/exit quickly
              src={album.cover}
              width={200}
              height={200}
              alt="Playlist Cover"
              quality={100}
            />
            <div className="m-0 flex flex-col gap-0 p-0">
              <p className="max-w-[200px] truncate font-bold hover:underline">
                {album.title}
              </p>
              <span className="m-0 p-0 text-sm font-light text-[#969696]">
                {album.artist}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
