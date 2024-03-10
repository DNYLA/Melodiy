'use client';
import { Button } from '@/components/Inputs/Buttons/Button';
import UserMenu from '@/components/Navigation/Navbar/UserMenu';
import useAuthModal from '@/hooks/modals/useAuthModal';
import useSession from '@/hooks/useSession';

const AuthSection = () => {
  const { onOpen } = useAuthModal();
  const { user } = useSession();

  return (
    <div className="flex items-center justify-between gap-x-1">
      {user ? (
        <UserMenu />
      ) : (
        <>
          <div>
            <Button
              className="py-2"
              variant={'unstyled'}
              onClick={() => onOpen(false)}
            >
              Sign Up
            </Button>
          </div>

          <div>
            <Button
              variant={'alternative'}
              size={'lg'}
              onClick={() => onOpen()}
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
