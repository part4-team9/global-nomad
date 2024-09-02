'use server';

import { cookies } from 'next/headers';

export const setCookie = (name: string, value: string, options?: { httpOnly?: boolean; path?: string }) => {
  cookies().set(name, value, { path: options?.path || '/', httpOnly: options?.httpOnly });
};

export const getCookie = (name: string) => {
  const cookie = cookies().get(name);
  return cookie ? cookie.value : null;
};

export const removeCookie = (name: string) => {
  cookies().delete(name);
};
