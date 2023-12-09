import ControlPanel from '@/app/artist/[id]/components/ControlPanel';
import Image from 'next/image';
import { BiShuffle } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

export interface IArtistHeader {
  name: string;
  coverUrl?: string;
  listerners: number;
}

const ArtistHeader: React.FC<IArtistHeader> = ({
  name,
  coverUrl,
  listerners,
}) => {
  const imgUrl = coverUrl ?? '/images/default_playlist.png';
  const GenerateImage = (index: number) => {
    return (
      <div className="relative">
        <Image
          // src={'/images/cover-3.webp'}
          // src={'/images/cover-2.jpeg'}
          src={imgUrl}
          fill={true}
          objectFit="cover"
          alt="Artist Cover"
          quality={100}
          draggable={false}
          className={twMerge(
            index % 2 == 0 ? 'opacity-[75%] mix-blend-lighten blur-[2px]' : ''
          )}
        />
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        className="absolute bottom-0 z-20 h-[60px] w-full -translate-y-20"
        // style={{
        //   transform:
        //     'translate3d( 0, calc(230px - (230px - 100px) * var(--normalizedTop, 0) * 1), 0 );',
        // }}
      >
        <img
          // src={'/images/cover-3.webp'}
          // src={'/images/cover-2.jpeg'}
          src={imgUrl}
          alt="Artist Cover"
          className={' bottom-0 z-10 h-[60px] w-full object-cover blur-[75px]'}
        />
      </div>
      <div
        className="relative grid h-[500px] grid-cols-1 grid-rows-1 md:grid-cols-2 xl:grid-cols-3"
        // style={{
        //   background:
        //     'linear-gradient(180.04deg, rgba(23, 23, 26, 0) 0.04%, rgba(23, 23, 26, 0.7) 99.96%)',
        // }}
      >
        {Array(1)
          .fill(0)
          .map((_, i) => GenerateImage(i))}
        <div className="absolute bottom-0 z-30 flex w-full items-center justify-between px-5 py-2">
          <div className="flex ">
            <div className="">
              <h1 className="text-3xl font-bold">{name}</h1>
              <span className="hidden text-base font-medium md:block">
                {listerners.toLocaleString()} Monthly Listerners
              </span>
            </div>
            <div className="mx-10  flex items-center gap-x-4 align-middle ">
              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BsFillPlayFill size={25} className="" />
                Play
              </button>

              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BiShuffle size={25} className="" />
                Shuffle
              </button>
            </div>
          </div>

          <div className="flex h-full gap-x-8 pr-48">
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
