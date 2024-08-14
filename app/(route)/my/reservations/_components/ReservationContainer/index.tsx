import type { MyReservations } from '@/_types/myReservations';

import NoReservation from '@/_components/NoReservation';

import CardDataTransformer from '../CardDataTransformer';

interface ReservationData {
  data: MyReservations;
}

function ReservationContainer({ data }: ReservationData) {
  const { totalCount, reservations } = data;

  return totalCount === 0 ? (
    <NoReservation />
  ) : (
    <div className="mt-3 grid gap-2 tablet:gap-6 mobile:mt-6 mobile:gap-4">
      {reservations.map((reservation) => (
        <CardDataTransformer key={reservation.id} data={reservation} />
      ))}
    </div>
  );
}

export default ReservationContainer;
