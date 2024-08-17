import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUser } from '@/_apis/user/userAccount';
import { getCookie } from '@/_utils/cookie';
import MyAccountClient from './_components/MyAccountClient';
import AccountConfirm from './_components/AccountConfirm';

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
