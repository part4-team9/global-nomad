import '../styles/globals.css';

import { getLoginStatus } from '@/_utils/isLogin';

import Footer from './_components/Footer';
import Header from './_components/header';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isLogIn = getLoginStatus();

  return (
    <html lang="ko">
      <body>
        <Header isLogIn={isLogIn} />
        <Providers>
          <main className="mt-[70px]">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
