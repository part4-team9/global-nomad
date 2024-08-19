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
    if (error.response?.status === 401) {
      router.push('/login');
    } else {
      // TODO message modal
    }
  }

  return data && <AccountForm data={data} />;
}

export default MyAccountClient;
