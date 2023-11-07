'use client';

import { IProvider } from '@/providers';
import { AuthResult, User } from '@/types/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type SessionContextType = {
  accessToken?: string;
  user?: User;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
  // update: () => void;
};

export const SessionContext = createContext<SessionContextType>({
  accessToken: undefined,
  user: undefined,
  isLoading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const SessionProvider: React.FC<IProvider> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{ user: User; accessToken: string }>(
        '/api/me'
      );

      //Update user context.
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  }, []);

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

        router.push('/profile');
      } catch (err: any) {
        toast.error(err.response.data.error);
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

        router.push('/profile');
      } catch (err: any) {
        toast.error(err.response.data.error);
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
      setAccessToken(undefined);
      setUser(undefined);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        accessToken,
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
