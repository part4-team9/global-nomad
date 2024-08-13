import getReservations from '@/_apis/my-reservations/getReservations';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import ReservationClient from './_components/ReservationClient';

export default async function MyReservations() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['reservations'],
    queryFn: getReservations,
  });

  const dehydratedState = dehydrate(queryClient);
  return <ReservationClient dehydratedState={dehydratedState} />;
}
