'use client';

import { resetAccessToken, setAccessToken } from '@/lib/network';
import { getApiError } from '@/lib/utils';
import { IProvider } from '@/providers';
import { AuthResult, User } from '@/types/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type SessionContextType = {
  user?: User;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  // update: () => void;
};

export const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
});

export const SessionProvider: React.FC<IProvider> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{ user: User; accessToken: string }>(
        '/api/me'
      );

      //Update user context.
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const { data } = await axios.post<AuthResult>('/api/auth/login', {
          username,
          password,
        });

        toast.success('Succesfully created user');

        //Update user context.
        setUser({ id: data.id, username: data.username });
        setAccessToken(data.accessToken);

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
    async (username: string, password: string) => {
      try {
        setLoading(true);
        const { data } = await axios.post<AuthResult>('/api/auth/signup', {
          username,
          password,
        });
        toast.success('Successfully regisetered account');

        //Update user context.
        setUser({ id: data.id, username: data.username });
        setAccessToken(data.accessToken);

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
      await axios.get('/api/auth/logout');
      toast.success('Logout successfull');
      resetAccessToken();
      setUser(undefined);
      router.refresh();
    } catch (err) {
      toast.error(getApiError(err).message);
    }
  }, [router]);

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
};
