'use client';
import SearchInput from '@/components/navigation/Navbar/SearchInput';
import { useRouter } from 'next/navigation';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import AuthSection from './AuthSection';

const Navbar = () => {
  const canGoBack = true;
  const canGoForward = true;
  const router = useRouter();

  //TODO: Handle Forward & Back navigation so it doesn't redirect to a different site and the state shows if a forward and back prop is possible
  const handleBackward = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  return (
    <div className="sticky top-0 z-50 flex w-full flex-row justify-between bg-[#131111] px-2 py-3">
      <div className="flex flex-row items-center gap-x-3">
        <div className="flex flex-row gap-x-3 text-inactive">
          <AiOutlineLeft
            onClick={handleBackward}
            size={20}
            className={twMerge(
              'cursor-not-allowed',
              canGoBack && 'cursor-pointer text-white'
            )}
          />
          <AiOutlineRight
            onClick={handleForward}
            size={20}
            className={twMerge(
              'cursor-not-allowed',
              canGoForward && 'cursor-pointer text-white'
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
};

export default Navbar;
