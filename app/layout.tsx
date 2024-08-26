import '../styles/globals.css';

import type { Metadata } from 'next';

import Footer from './_components/Footer';
import Header from './_components/header';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  icons: {
    icon: '/assets/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Providers>
          <main className="mt-[70px]">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
