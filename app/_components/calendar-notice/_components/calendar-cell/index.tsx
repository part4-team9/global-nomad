import cx from 'clsx';

import type { ReservationDataProps } from '@/_types';
import { ReservationStatus } from '@/_types';

import StatusChip from '../status-chips';

interface CalendarCellProps {
  day: number;
  keyDate: string;
  monthType: string;
  reservations: ReservationDataProps[];
  today: string;
}

export default function CalendarCell({ day, monthType, keyDate, reservations, today }: CalendarCellProps) {
  return (
    <td className="flex cursor-pointer flex-col justify-between border border-zinc-200 text-base/[21px] transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
      <p
        className={cx('m-3 w-fit', {
          'text-gray-200': monthType !== 'current',
          'rounded bg-emerald-800 text-white': keyDate === today,
        })}
      >
        {day}
      </p>
      {reservations
        .filter((reservation) => reservation.date === keyDate)
        .map((reservation, idx) => (
          <div key={idx} className="flex flex-wrap">
            <StatusChip count={reservation.reservation.seat} status={ReservationStatus.RESERVATION} />
            <StatusChip count={reservation.reservation.confirmed} status={ReservationStatus.CONFIRMED} />
            <StatusChip count={reservation.reservation.complete} status={ReservationStatus.COMPLETE} />
          </div>
        ))}
    </td>
  );
}
