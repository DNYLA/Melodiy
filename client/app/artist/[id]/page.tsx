import ActionButton from '@/app/artist/[id]/components/ActionButton';
import TopTracks from '@/app/artist/[id]/components/TopTracks';
import Image from 'next/image';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiShuffle } from 'react-icons/bi';
import { BsFillPlayFill, BsPlayFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

function ArtistHeader() {
  const GenerateImage = (index: number) => {
    return (
      <div className="relative">
        <Image
          // src={'/images/cover-3.webp'}
          // src={'/images/cover-2.jpeg'}
          src={'/images/artist-cover.png'}
          fill={true}
          objectFit="cover"
          alt="Artist Cover"
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
          src={'/images/artist-cover.png'}
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
        {Array(3)
          .fill(0)
          .map((_, i) => GenerateImage(i))}
        <div className="absolute bottom-0 z-30 flex w-full items-center justify-between px-5 py-2">
          <div className="flex ">
            <div className="">
              <h1 className="text-3xl font-bold">Roddy Ricch</h1>
              <span className="hidden text-base font-medium md:block">
                24,230,012 Monthly Listerners
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
            <ActionButton icon={<BsPlayFill size={25} />} className="">
              Play
            </ActionButton>
            <ActionButton icon={<BiShuffle size={25} />} className="">
              Shuffle
            </ActionButton>
            <ActionButton icon={<AiOutlineUserAdd size={25} />}>
              Follow
            </ActionButton>
            <ActionButton icon={<FiShare size={25} />}>Share</ActionButton>
          </div>
        </div>
        {/* <div className="absolute bottom-0 right-56 pb-4">
          <div className="flex h-full w-full gap-x-8">
            <ActionButton icon={<BsPlayFill size={25} />}>Play</ActionButton>
            <ActionButton icon={<BiShuffle size={25} />}>Shuffle</ActionButton>
            <ActionButton icon={<AiOutlineUserAdd size={25} />}>
              Follow
            </ActionButton>
            <ActionButton icon={<FiShare size={25} />}>Share</ActionButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default async function Artist({ params }: { params: { id: string } }) {
  // if (playlist && playlist.success == false) return redirect('/');
  console.log(params.id);

  return (
    <div className="">
      <ArtistHeader />
      <div className="z-50 m-5 px-5">
        <TopTracks />
      </div>
    </div>
  );
}
