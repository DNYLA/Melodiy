'use client';
import Input from '@/components/input';
import UserPanel from '@/components/user-panel';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

function Navbar() {
  const canGoBack = true;
  const canGoForward = true;
  const router = useRouter();

  //TODO: Move to seperate file
  //TODO: Handle Forward & Back navigation so it doesn't redirect to a different site and the state shows if a forward and back prop is possible
  const handleBackward = () => {
    // console.log(window.history);
    // if (window.history.state && window.history.state.tree.length > 0) {
    //   console.log('Going backwards');
    //   router.back();
    // }
    router.back();
  };

  const handleForward = () => {
    // console.log('running');
    // console.log(window.history);

    router.forward();
  };

  return (
    <div className="flex flex-row justify-between my-1">
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
          <Input placeholder="Search" />
        </div>
      </div>
      <div className="">
        <UserPanel />
      </div>
    </div>
  );
}

export default Navbar;
