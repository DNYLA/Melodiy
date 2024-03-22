import { createContext } from 'react';
import { IContainer, User } from '@melodiy/types';

type SessionContextType = {
  user?: User;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
  // update: () => void;
};

export const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isLoading: true,
  login: async () => Promise<void>,
  register: async () => Promise<void>,
  logout: async () => Promise<void>,
});

export default function SessionProvider({ children }: IContainer) {
  // return (
  //   <SessionContext.Provider
  //     value={{
  //       user,
  //       login: handleLogin,
  //       register: handleSignUp,
  //       logout: handleLogout,
  //       isLoading: loading,
  //     }}
  //   >
  //     {children}
  //   </SessionContext.Provider>

  // );

  return <div>{children}</div>;
}
