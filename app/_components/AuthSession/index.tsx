'use client';

import { SessionProvider } from 'next-auth/react';

interface SessionProviderProps {
  children: React.ReactNode;
}

export default function AuthSession({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
