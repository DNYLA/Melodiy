import ModalProvider from './ModalProvider';
import SessionProvider from './SessionProvider';
import TanstackProvider from './TanstackProvider';
import ToasterProvider from './ToasterProvider';
import React from 'react';

export interface IProvider {
  children: React.ReactNode;
}

export default function Providers({ children }: IProvider) {
  return (
    <>
      <ToasterProvider />
      <SessionProvider>
        <TanstackProvider>
          <ModalProvider />
          {children}
        </TanstackProvider>
      </SessionProvider>
    </>
  );
}
