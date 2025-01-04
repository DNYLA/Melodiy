import { useContext } from 'react';
import { SessionContext } from '../providers/SessionProvider';

function useSession() {
  const session = useContext(SessionContext);
  return {
    user: session?.user,
    updateAvatar: session.updateAvatar,
    signIn: session.login,
    signOut: session.logout,
    signUp: session.register,
    loading: session.isLoading,
  };
}

export { useSession };
