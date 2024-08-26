import '../styles/globals.css';

import type { Metadata } from 'next';

import Footer from './_components/Footer';
import Header from './_components/header';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '당신의 여행에 활력을 더할 액티비티와 체험을 손쉽게 예약해보세요. 잊지 못할 추억을 만들어 드립니다.',
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
