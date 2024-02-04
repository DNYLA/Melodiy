import Sidebar from '@/components/Navigation/Sidebar';
import Player from '@/components/Utils/Player';
import Providers from '@/providers';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

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
      <body className={`${font.className}`}>
        <Providers>
          <Sidebar>{children}</Sidebar>
          <Player />
        </Providers>
      </body>
    </html>
  );
}
