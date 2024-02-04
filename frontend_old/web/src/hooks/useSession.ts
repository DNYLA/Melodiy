import { SessionContext } from '@/providers/SessionProvider';
import { useContext } from 'react';

function useSession() {
  const session = useContext(SessionContext);

  // console.log(session.user);
  // console.log(session.accessToken);

  return {
    user: session?.user,
    signIn: session.login,
    signOut: session.logout,
    signUp: session.register,
    loading: session.isLoading,
  };
}

export default useSession;
