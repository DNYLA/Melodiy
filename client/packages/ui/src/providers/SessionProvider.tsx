/* eslint-disable no-unused-vars */
import {
  getApiError,
  login,
  logout,
  refreshToken,
  registerUser,
} from '@melodiy/api';
import { IContainer, User } from '@melodiy/types';
import { useNavigate } from '@melodiy/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useKeys } from './useKeys';

type SessionContextType = {
  user?: User;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    password: string,
    setup: boolean
  ) => Promise<boolean>;
  logout: () => void;
  updateAvatar: (avatar?: string) => void;
  // update: () => void;
};

const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => Promise<void>,
  updateAvatar: async () => Promise<void>,
});

function SessionProvider({ children }: IContainer) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const keys = useKeys();
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
        const response = await login(username, password);
        toast.success(`Welcome back, ${username}!`);
        setUser({ id: response.user.id, username: response.user.username });
        keys.setKeys(response.keys);
        return true;
      } catch (err) {
        toast.error(getApiError(err).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSignUp = useCallback(
    async (username: string, password: string, setup: boolean) => {
      try {
        setLoading(true);

        const user = await registerUser(username, password, setup);
        const message = setup
          ? `Created Admin Account ${user.username}`
          : 'Successfully regisetered account';
        toast.success(message);
        setUser({ id: user.id, username: user.username });

        return true;
      } catch (err) {
        toast.error(getApiError(err).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
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

  const updateAvatar = useCallback(
    async (avatar?: string) => {
      if (user) {
        setUser({ ...user, avatar: avatar });
      }
    },
    [user]
  );

  return (
    <SessionContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleSignUp,
        logout: handleLogout,
        updateAvatar: updateAvatar,
        isLoading: loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
