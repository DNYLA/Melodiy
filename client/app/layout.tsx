import Sidebar from '@/components/navigation/Sidebar';
import ToasterProvider from '@/providers/ToasterProvider';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melodiy',
  description: 'Listen to your favourite artis..',
}

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Sidebar>{children}</Sidebar>
        {/* <SessionProvider>
          <SWRProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
            <Player />
          </SWRProvider>
        </SessionProvider> */}
      </body>
    </html>
  )
}
