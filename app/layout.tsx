import '../styles/globals.css';

import Footer from './_components/FooterTest';
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
        <Header />
        <Providers>
          <main className="mt-[70px]">{children}</main>
        </Providers>
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
