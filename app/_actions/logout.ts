'use server';

import { redirect } from 'next/navigation';

import { removeCookie } from '../_utils/cookie';

// 로그아웃을 위한 서버 액션
// eslint-disable-next-line @typescript-eslint/require-await
export async function logout() {
  removeCookie('accessToken');
  removeCookie('userId');
  redirect('/');
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function redirectAction(url: string) {
  redirect(url);
}
