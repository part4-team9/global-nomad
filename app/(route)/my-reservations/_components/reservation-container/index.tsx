import type { MyReservations } from '@/_types/myReservations';

import NoReservation from '@/_components/no-reservation';

import ReservationWrapper from '../reservation-wrapper';

interface ReservationData {
  data: MyReservations;
}

function ReservationContainer({ data }: ReservationData) {
  const { totalCount, reservations, cursorId } = data;

  return totalCount === 0 ? <NoReservation /> : <ReservationWrapper datas={reservations} />;
}

export default ReservationContainer;
