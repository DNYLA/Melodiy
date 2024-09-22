import {
  AddtoPlaylistIcon,
  AddtoQueueIcon,
  MoreIcon,
  PlayIcon,
} from '@melodiy/icons';
import { Button } from '@melodiy/ui/components/Inputs';
export interface ArtistHeaderProps {
  id: string;
  name: string | React.ReactNode;
  imageSrc?: string;
  listerners?: number;
}

function ArtistHeader({ id, name, imageSrc, listerners }: ArtistHeaderProps) {
  return (
    <div
      className="relative w-full rounded-lg border-base bg-accent h-96"
      style={
        {
          // backgroundColor: '#2b2525',
        }
      }
    >
      {imageSrc && (
        <img
          src={imageSrc}
          style={{
            objectFit: 'cover',
            filter: '',
            height: '100%',
            width: '100%',
            inset: '0px',
            color: 'transparent',
          }}
          draggable={false}
          alt={'Artist Cover'}
        />
      )}
      <div className="absolute bottom-0 flex flex-col w-full pr-24 my-6 pl-14">
        <h1 className="text-5xl font-bold">{name}</h1>
        <div className="flex flex-row justify-between w-full mt-5">
          {listerners != null && (
            <span className="hidden text-base font-medium md:block text-content">
              {listerners.toLocaleString()} Monthly Listerners
            </span>
          )}
          {id && (
            <div className="flex items-center gap-x-4 animate-fade">
              <button className="p-0 transition-all ease-in delay-75 border-none rounded-full hover:opacity-85">
                <PlayIcon width={50} height={50} className="p-1 fill-primary" />
              </button>
              <Button
                variant={'alternative'}
                className="w-24 font-medium bg-base-accent/100 text-content hover:bg-opacity-100 hover:opacity-90"
              >
                Follow
              </Button>
              <AddtoPlaylistIcon
                width={50}
                height={50}
                className="duration-200 ease-in-out cursor-pointer text-content hover:text-base-accent"
              />
              <AddtoQueueIcon
                width={50}
                height={50}
                className="duration-200 ease-in-out cursor-pointer text-content hover:text-base-accent"
              />
              <MoreIcon
                width={50}
                height={50}
                className="duration-200 ease-in-out cursor-pointer fill-content text-content hover:text-base-accent hover:fill-base-accent"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { ArtistHeader };
