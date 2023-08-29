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
      className="group min-w-[200px] cursor-pointer duration-300 ease-in-out hover:scale-110"
    >
      <Image
        className="rounded-lg"
        src={imageUrl}
        width={200}
        height={200}
        alt="Playlist Cover"
      />
      <div className="mt-1">
        <p className="cursor-pointer truncate text-lg font-bold hover:underline ">
          {title}
        </p>
        <p className="text-sm text-inactive hover:underline">{owner}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
