import ModalProvider from '@/providers/ModalProvider';
import TanstackProvider from '@/providers/TanstackProvider';
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
      <SessionProvider>
        <TanstackProvider>
          <ModalProvider />
          {children}
        </TanstackProvider>
      </SessionProvider>
      ;
    </>
  );
};

export default Providers;
