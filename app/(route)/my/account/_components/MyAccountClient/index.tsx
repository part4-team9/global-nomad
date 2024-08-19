'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { getUser } from '@/_apis/user/userAccount';
import { useQuery } from '@tanstack/react-query';

import AccountForm from '../AccountForm';

function MyAccountClient() {
  const router = useRouter();
  const { data, isError, error } = useQuery({ queryKey: ['account'], queryFn: getUser, retry: 0 });

  if (isError && error instanceof AxiosError) {
    if (error.response?.status === 401) {
      router.push('/login');
    } else {
      // TODO message modal
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      // 페이지 벗어날 때 authConfirm 쿠키 삭제 (과거로 설정)
      document.cookie = 'authConfirm=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return data && <AccountForm data={data} />;
}

export default MyAccountClient;
