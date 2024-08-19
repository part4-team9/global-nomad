/* eslint-disable @typescript-eslint/await-thenable */
import { getUser } from '@/_apis/user/userAccount';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCookie } from '@/_utils/cookie';

import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import AccountConfirm from './_components/AccountConfirm';
import MyAccountClient from './_components/MyAccountClient';

export default async function MyAccountCheck() {
  const queryClient = new QueryClient();
  const cookie = await getCookie('authConfirm');

  await queryClient.prefetchQuery({
    queryKey: ['account'],
    queryFn: getUser,
    retry: 0,
  });

  return (
    <CommonLayout>
      <StickyLayout>
        <HydrationBoundary state={dehydrate(queryClient)}>{cookie ? <MyAccountClient /> : <AccountConfirm />}</HydrationBoundary>
      </StickyLayout>
    </CommonLayout>
  );
}
