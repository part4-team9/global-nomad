import cx from 'clsx';

import type { ReservationDataProps } from '@/_types';
import { ReservationStatus } from '@/_types';

import { filterReservationsByDate, getMaxStatus, getMaxStatusStyle, getStatusChipData } from '@/_utils/reservation';

import StatusChip from '../status-chips';

interface CalendarCellProps {
  day: number;
  keyDate: string;
  monthType: string;
  reservations: ReservationDataProps[];
  today: string;
}

export default function CalendarCell({ day, monthType, keyDate, reservations, today }: CalendarCellProps) {
  const dayReservation = filterReservationsByDate(reservations, keyDate);
  const maxStatus = getMaxStatus(dayReservation);
  const statusChipData = dayReservation ? getStatusChipData(dayReservation) : [];
  const maxStatusStyle = getMaxStatusStyle(maxStatus);

  return (
    <td className="flex cursor-pointer flex-col justify-between border border-zinc-200 text-base/[21px] transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
      <p
        className={cx('m-3 w-fit', {
          'text-gray-200': monthType !== 'current',
          'rounded bg-emerald-800 text-white': keyDate === today,
        })}
      >
        {day}
        {maxStatus && maxStatusStyle && <span className={`ml-2 rounded px-1 text-m font-medium ${maxStatusStyle.textColor}`}>{maxStatusStyle.label}</span>}
      </p>
      {statusChipData.length > 0 && (
        <div className="flex flex-wrap">
          {statusChipData.map((chip, idx) => (
            <StatusChip key={idx} count={chip.count} bgColor={chip.bgColor} textColor={chip.textColor} label={chip.label} />
          ))}
        </div>
      )}
    </td>
  );
}
