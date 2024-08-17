import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUser } from '@/_apis/user/userAccount';
import AccountCheck from './_components/AccountCheck';

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
          <AccountCheck />
        </HydrationBoundary>
      </StickyLayout>
    </CommonLayout>
  );
}
