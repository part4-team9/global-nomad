import '../styles/globals.css';

import Footer from './_components/footer';
import Header from './_components/header';
import Providers from './providers';

import { getLoginStatus } from '@/_utils/isLogin';

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
