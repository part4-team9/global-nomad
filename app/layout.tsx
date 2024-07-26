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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
