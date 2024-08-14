import type { MyReservations } from '@/_types/myReservations';

import NoReservation from '@/_components/NoReservation';

import ReservationList from '../ReservationList';

interface ReservationData {
  data: MyReservations;
}

function ReservationContainer({ data }: ReservationData) {
  const { totalCount, reservations } = data;

  return totalCount === 0 ? <NoReservation /> : <ReservationList datas={reservations} />;
}

export default ReservationContainer;
