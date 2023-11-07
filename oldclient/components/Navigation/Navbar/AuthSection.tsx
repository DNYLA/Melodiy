'use client';
import useAuthModal from '@/hooks/modals/useAuthModal';
import { useSession } from 'next-auth/react';
import Button from '../../Inputs/Buttons/Button/Button';
import UserMenu from './UserMenu';

const AuthSection = () => {
  const { onOpen } = useAuthModal();
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between gap-x-1">
      {session?.user ? (
        <div>
          <UserMenu />
        </div>
      ) : (
        <>
          <div>
            <Button
              className="bg-transparent font-medium text-white"
              onClick={() => onOpen(false)}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button className="px-6 py-2" onClick={() => onOpen()}>
              Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSection;
