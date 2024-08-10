import type { Reservations } from '@/_types/myReservations';

import DateAndGuests from '@/_components/date-and-guests';

import StatusBoard from '../status-board';

interface ReservationsWrapper {
  datas: Reservations[];
}

function ReservationWrapper({ datas }: ReservationsWrapper) {
  return (
    <div className="mt-3 grid gap-2 mobile:mt-6 mobile:gap-4 tablet:mt-4 tablet:gap-6">
      {datas.map((data) => (
        <div key={data.activity.id}>
          <StatusBoard status={data.status} />
          <DateAndGuests date={data.date} startTime={data.startTime} endTime={data.endTime} headCount={data.headCount} />
        </div>
      ))}
    </div>
  );
}

export default ReservationWrapper;
