import type { MyReservations } from '@/_types/myReservations';

import NoReservation from '@/_components/no-reservation';

import CancelModal from '../cancel-modal';

interface ReservationData {
  data: MyReservations;
}

function ReservationContainer({ data }: ReservationData) {
  const { totalCount, reservations, cursorId } = data;

  return (
    <>
      {totalCount === 0 ? <NoReservation /> : <div>예약내역입니다</div>}
      {/* <CancelModal /> */}
    </>
  );
}

export default ReservationContainer;
