'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { getUser } from '@/_apis/user/userAccount';
import { useQuery } from '@tanstack/react-query';

import AccountForm from '../AccountForm';

function MyAccountClient() {
  const router = useRouter();
  const { data, isError, error } = useQuery({ queryKey: ['account'], queryFn: getUser, retry: 0 });

  if (isError && error instanceof AxiosError) {
    router.push('/login');
  }

  return data && <AccountForm data={data} />;
}

export default MyAccountClient;
