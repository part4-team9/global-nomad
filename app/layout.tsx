import '../styles/globals.css';

import type { Metadata } from 'next';

import { getLoginStatus } from '@/_utils/isLogin';

import Header from './_components/der';
import Footer from './_components/Footer';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '당신의 여행에 활력을 더할 액티비티와 체험을 손쉽게 예약해보세요. 잊지 못할 추억을 만들어 드립니다.',
  icons: {
    icon: '/assets/icons/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isLogIn = getLoginStatus();

  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header isLogIn={isLogIn} />
          <main className="mt-[70px]">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
