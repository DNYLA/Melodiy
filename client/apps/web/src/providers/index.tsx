import { IContainer } from '@melodiy/types';
import ModalProvider from './ModalProvider';
import SessionProvider from './SessionProvider';
import TanstackProvider from './TanstackProvider';
import ToasterProvider from './ToasterProvider';

export default function Providers({ children }: IContainer) {
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
