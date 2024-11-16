import { DownIcon, PlaylistIcon, RightIcon } from '@melodiy/icons';
import { Suspense, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import LibraryItems from './LibraryItems';
// import LibraryItems from './LibraryItems';

function Library() {
  const [expanded, setExpanded] = useState(false);

  const ToggleIcon = expanded ? DownIcon : RightIcon;

  return (
    <div>
      <div
        draggable={false}
        className="flex items-center self-stretch justify-between text-sm font-medium cursor-pointer gap-x-2 text-base-accent group hover:text-content"
        onClick={() => setExpanded(!expanded)}
      >
        <PlaylistIcon
          width={60}
          height={60}
          className="group-hover:stroke-content h-[50%]"
        />
        <span className="w-full truncate">Playlists</span>
        <ToggleIcon
          width={55}
          height={55}
          className="group-hover:stroke-content h-[50%]"
        />
      </div>

      <Suspense fallback={<FaSpinner size={18} className="animate-spin" />}>
        <div
          className={twMerge(
            'flex-col pl-5 opacity-0 transition-opacity ease-in duration-200 delay-100 absolute invisible pt-1',
            expanded && 'flex opacity-100 visible relative',
          )}
        >
          <LibraryItems />
        </div>
      </Suspense>
    </div>
  );
}

export default Library;
