import ImageOverlay from '@/app/playlist/[id]/components/image-overlay';
import { Playlist } from '@/types/playlist';
import { getDefaultImage } from '@/utils';
import dayjs from 'dayjs';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';

export interface IPlaylistHeader {
  data: Playlist;
}

const PlaylistHeader: React.FC<IPlaylistHeader> = ({ data }) => {
  const calculateDuration = () => {
    if (!data.tracks || data.tracks.length === 0) return '0 MINUTES';
    const totalDuration = data.tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} MINUTES`;
  };

  const getPlaylistDetails = () => {
    const trackAmount = data.tracks?.length ?? 0;
    const duration = calculateDuration();
    const date = dayjs(data.createdAt ?? new Date());

    return `${trackAmount} SONGS • ${duration} • ${date.year()}`;
  };

  return (
    <div className="flex gap-x-4">
      <div className="group relative cursor-pointer">
        <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform cursor-pointer flex-col place-items-center text-white group-hover:flex ">
          <FiEdit2
            size={30}
            className="center flex snap-center place-items-center content-center justify-center object-center align-middle"
          />
          <span className="text-md">Select Photo</span>
        </div>
        <ImageOverlay
          src={data.imagePath ? data.imagePath : getDefaultImage()}
        />
      </div>
      <div>
        <div>
          <p className="text-inactive">Public Playlist</p>
          <p className="text-xl font-bold md:text-2xl lg:text-3xl">
            {data.title}
          </p>
          <p className="cursor-pointer text-inactive hover:underline">
            {data.user.username}
          </p>
          <p className="font-light">{getPlaylistDetails()}</p>
        </div>

        <div className="mt-8">
          {/* TODO: Update Button Hover Effect */}
          <button className="text-cneter group flex items-center gap-x-1 rounded bg-primary px-3 py-[2px]">
            <BsFillPlayFill size={25} className="" />
            <p className="group-hover:text-inactive">PLAY</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
