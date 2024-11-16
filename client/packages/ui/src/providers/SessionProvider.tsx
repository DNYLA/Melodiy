import {
  RegisterMasterAdmin,
  getApiError,
  login,
  logout,
  refreshToken,
  register,
} from '@melodiy/api';
import { IContainer, User } from '@melodiy/types';
import { useNavigate } from '@tanstack/react-router';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type SessionContextType = {
  user?: User;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    password: string,
    setup: boolean,
  ) => Promise<boolean>;
  logout: () => void;
  // update: () => void;
};

const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => Promise<void>,
});

function SessionProvider({ children }: IContainer) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    if (user) return;

    try {
      setLoading(true);
      const data = await refreshToken();

      if ('setup' in data) {
        navigate({ to: '/setup' });
      } else {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const user = await login(username, password);
        toast.success(`Welcome back, ${username}!`);
        setUser({ id: user.id, username: user.username });
        return true;
      } catch (err) {
        toast.error(getApiError(err).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSignUp = useCallback(
    async (username: string, password: string, setup: boolean) => {
      try {
        setLoading(true);
        console.log(setup);
        if (setup) {
          const user = await RegisterMasterAdmin(username, password);
          toast.success(`Created Admin Account ${user.username}`);
          setUser({ id: user.id, username: user.username });
        } else {
          const user = await register(username, password);
          toast.success('Successfully regisetered account');
          setUser({ id: user.id, username: user.username });
        }

        return true;
      } catch (err) {
        toast.error(getApiError(err).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success('Logout successfull');
      setUser(undefined);
      navigate({ to: '/' });
    } catch (err) {
      toast.error(getApiError(err).message);
    }
  }, [navigate]);

  return (
    <SessionContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleSignUp,
        logout: handleLogout,
        isLoading: loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
