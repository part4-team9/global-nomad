import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUser } from '@/_apis/user/userAccount';
import AccountConfirm from './_components/AccountConfirm';

export default async function MyAccountCheck() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['account'],
    queryFn: getUser,
    retry: 0,
  });

  return (
    <CommonLayout>
      <StickyLayout>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AccountConfirm />
        </HydrationBoundary>
      </StickyLayout>
    </CommonLayout>
  );
}
