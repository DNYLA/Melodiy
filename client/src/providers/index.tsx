import React from 'react';
import { SessionProvider } from './SessionProvider';
import ToasterProvider from './ToasterProvider';

export interface IProvider {
  children: React.ReactNode;
}

const Providers: React.FC<IProvider> = ({ children }) => {
  return (
    <>
      <ToasterProvider />
      <SessionProvider>{children}</SessionProvider>;
    </>
  );
};

export default Providers;
