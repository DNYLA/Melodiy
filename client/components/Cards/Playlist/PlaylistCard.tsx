import Image from 'next/image';

export interface IPlaylistCard {
  title: string;
  owner: string;
  imageUrl: string;
  onClick?: () => void;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({
  title,
  owner,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer hover:scale-110 ease-in-out duration-300 min-w-[200px]"
    >
      <Image
        className="rounded-lg"
        src={imageUrl}
        width={200}
        height={200}
        alt="Playlist Cover"
      />
      <div className="mt-1">
        <p className="text-lg font-bold hover:underline cursor-pointer truncate ">
          {title}
        </p>
        <p className="text-inactive hover:underline text-sm">{owner}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
