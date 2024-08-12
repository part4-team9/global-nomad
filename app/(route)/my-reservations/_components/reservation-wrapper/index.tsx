import type { Reservations } from '@/_types/myReservations';

interface ReservationsWrapper {
  datas: Reservations[];
}

function ReservationWrapper({ datas }: ReservationsWrapper) {
  return (
    <div className="mt-3 grid gap-2 mobile:mt-6 mobile:gap-4 tablet:mt-4 tablet:gap-6">
      {datas.map((data) => (
        <div key={data.activity.id} />
      ))}
    </div>
  );
}

export default ReservationWrapper;
