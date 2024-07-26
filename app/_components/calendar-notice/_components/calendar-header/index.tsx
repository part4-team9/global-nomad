import React from 'react';
import cx from 'clsx';

import type { ReservationDataProps } from '@/_types';
import { ReservationStatus } from '@/_types';

import StatusChip, { statusStyles } from '../status-chips';

interface CalendarCellProps {
  day: number;
  keyDate: string;
  monthType: string;
  reservations: ReservationDataProps[];
  today: string;
}

/**
 * Renders a calendar cell.
 */
export default function CalendarCell({ day, monthType, keyDate, reservations, today }: CalendarCellProps) {
  const filteredReservations = reservations.filter((reservation) => reservation.date === keyDate);

  const getHighestEventType = (reservations: ReservationDataProps[]) => {
    const eventCounts: { [key: string]: number } = reservations.reduce(
      (acc, reservation) => {
        acc[ReservationStatus.COMPLETE] += reservation.reservation[ReservationStatus.COMPLETE];
        acc[ReservationStatus.CONFIRMED] += reservation.reservation[ReservationStatus.CONFIRMED];
        acc[ReservationStatus.SEAT] += reservation.reservation[ReservationStatus.SEAT];
        return acc;
      },
      {
        [ReservationStatus.COMPLETE]: 0,
        [ReservationStatus.CONFIRMED]: 0,
        [ReservationStatus.SEAT]: 0,
      },
    );

    const highestEventType: string = Object.keys(eventCounts).reduce((a, b) => (eventCounts[a] > eventCounts[b] ? a : b));
    return highestEventType;
  };

  const highestEventType = getHighestEventType(filteredReservations);

  const circleColor = highestEventType ? statusStyles[highestEventType].circleColor : 'bg-transparent';

  return (
    <td className="flex cursor-pointer flex-col justify-between border text-base transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
      <div className="m-3 flex items-center justify-between">
        <p
          className={cx('w-fit', {
            'text-gray-200': monthType !== 'current',
            'rounded bg-emerald-800 text-white': keyDate === today,
          })}
        >
          {day}
        </p>
        {highestEventType && <span className={`ml-2 h-4 w-4 rounded-full ${circleColor}`} />}
      </div>
      {filteredReservations.map((reservation, idx) => (
        <div key={idx} className="flex flex-wrap">
          <StatusChip count={reservation.reservation[ReservationStatus.SEAT]} status={ReservationStatus.SEAT} />
          <StatusChip count={reservation.reservation[ReservationStatus.CONFIRMED]} status={ReservationStatus.CONFIRMED} />
          <StatusChip count={reservation.reservation[ReservationStatus.COMPLETE]} status={ReservationStatus.COMPLETE} />
        </div>
      ))}
    </td>
  );
}
