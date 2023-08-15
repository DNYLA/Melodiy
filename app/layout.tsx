import Sidebar from '@/components/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import SessionProvider from '@/providers/SessionProvider';
import { SWRProvider } from '@/providers/SWRProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melodiy',
  description: 'Listen to your favourite artis..',
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SessionProvider>
          <SWRProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
