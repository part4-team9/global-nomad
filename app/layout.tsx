import '../styles/globals.css';

import AuthSession from './_components/AuthSession';
import Footer from './_components/Footer';
import Header from './_components/header';
import Providers from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthSession>
          <Header />
          <Providers>
            <main className="mt-[70px]">{children}</main>
          </Providers>
          <Footer />
        </AuthSession>
      </body>
    </html>
  );
}
