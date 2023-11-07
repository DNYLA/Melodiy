'use client';
import { Button } from '@/components/Inputs/Buttons/Button';
import UserMenu from '@/components/navigation/Navbar/UserMenu';
import useSession from '@/hooks/useSession';
// import useAuthModal from '@/hooks/modals/useAuthModal';
// import { useSession } from 'next-auth/react';
// import Button from '../../Inputs/Buttons/Button/Button';

const AuthSection = () => {
  // const { onOpen } = useAuthModal();
  const { user } = useSession();

  return (
    <div className="flex items-center justify-between gap-x-1">
      {user ? (
        <div>
          <UserMenu />
        </div>
      ) : (
        <>
          <div>
            <Button
            // onClick={() => onOpen(false)}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button
              variant={'alternative'}
              size={'lg'}
              // onClick={() => onOpen()}
            >
              Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSection;
