'use server';

/* eslint-disable @typescript-eslint/require-await */

import { redirect } from 'next/navigation';

import { removeCookie } from '@/_utils/cookie';

// 로그아웃을 위한 서버 액션
export async function logout() {
  removeCookie('accessToken');
  removeCookie('userId');
  removeCookie('profileImageUrl');
  redirect('/');
}


