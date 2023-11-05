import ImageOverlay from '@/app/playlist/[id]/components/image-overlay';
import { getImageUrl } from '@/lib/helpers';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';
import dayjs from 'dayjs';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';

export interface ITableHeader {
  // data: Playlist;
  title: string;
  coverPath?: string;
  releaseDate: Date;
  tracks: Song[];
  owner: string;
  redirect?: string;
  type: PlaylistType;
}

const TableHeader: React.FC<ITableHeader> = ({
  title,
  coverPath,
  releaseDate,
  tracks,
  owner,
  type,
}) => {
  const calculateDuration = () => {
    if (!tracks || tracks.length === 0) return '0 MINUTES';
    const totalDuration = tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} MINUTES`;
  };

  const getPlaylistDetails = () => {
    const trackAmount = tracks?.length ?? 0;
    const duration = calculateDuration();
    const date = dayjs(releaseDate ?? new Date());

    return `${trackAmount} SONGS • ${duration} • ${date.year()}`;
  };

  const getType = (type: PlaylistType) => {
    if (type == PlaylistType.Album) return 'Album';
    else if (type == PlaylistType.Playlist) return 'Public Playlist';
    else return 'Files';
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
        <ImageOverlay src={getImageUrl(coverPath)} />
      </div>
      <div>
        <div>
          <p className="text-inactive">{getType(type)}</p>
          <p className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</p>
          <p className="cursor-pointer text-inactive hover:underline">
            {owner}
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

export default TableHeader;
