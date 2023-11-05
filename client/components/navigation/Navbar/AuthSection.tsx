'use client';
import UserMenuCard from '@/components/Cards/UserMenu/UserMenuCard';
// import useAuthModal from '@/hooks/modals/useAuthModal';
// import { useSession } from 'next-auth/react';
// import Button from '../../Inputs/Buttons/Button/Button';

const AuthSection = () => {
  // const { onOpen } = useAuthModal();
  // const { data: session } = useSession();
  const session = {
    user: false,
  }


  return (
    <div className="flex items-center justify-between gap-x-1">
      {session?.user ? (
        <div>
          <UserMenuCard />
        </div>
      ) : (
        <>
          <div>
            <button>
              Sign Up
            </button>
            {/* <Button
              className="bg-transparent font-medium text-white"
              onClick={() => onOpen(false)}
            >
              Sign Up
            </Button> */}
          </div>
          <div>
            <button>
              Login
            </button>
            {/* <Button className="px-6 py-2" onClick={() => onOpen()}>
              Login
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSection;
