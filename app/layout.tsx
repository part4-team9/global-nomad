import '../styles/globals.css';

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
        <div id="modal-root" />
      </body>
    </html>
  );
}
