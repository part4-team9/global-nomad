import type { Reservations } from '@/_types/myReservations';

import StatusBoard from '../status-board';

interface ReservationsWrapper {
  datas: Reservations[];
}

function ReservationWrapper({ datas }: ReservationsWrapper) {
  return (
    <div className="mt-3 mobile:mt-6 tablet:mt-4">
      {datas.map((data) => (
        <StatusBoard key={data.activity.id} status={data.status} />
      ))}
    </div>
  );
}

export default ReservationWrapper;
