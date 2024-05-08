import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { AuthSection } from './AuthSection';
import { SearchInput } from './SearchInput';

export function Navbar() {
  //TODO: Handle with tanstack router

  const handleBackward = () => {
    // router.back();
  };

  const handleForward = () => {
    // router.forward();
  };

  return (
    <div
      // style={{ width: `calc(100% - ${!Number.isNaN(size) ? size : 250}px )` }}
      style={{ width: `calc(100% - 250px )` }}
      className="fixed top-0 z-[100] flex h-[70px] w-full flex-row justify-between px-2 py-3"
    >
      <div className="flex flex-row items-center gap-x-3">
        <div className="flex flex-row gap-x-3 text-inactive">
          <AiOutlineLeft
            onClick={handleBackward}
            size={20}
            className={twMerge(
              'cursor-not-allowed',
              true && 'cursor-pointer text-white'
            )}
          />
          <AiOutlineRight
            onClick={handleForward}
            size={20}
            className={twMerge(
              'cursor-not-allowed',
              true && 'cursor-pointer text-white'
            )}
          />
        </div>

        <div>
          <SearchInput />
        </div>
      </div>

      <AuthSection />
    </div>
  );
}
