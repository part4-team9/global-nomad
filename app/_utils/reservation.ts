import type { ReservationDataProps } from '@/_types';
import { ReservationStatus } from '@/_types';

export const statusStyles = {
  [ReservationStatus.COMPLETE]: {
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-700',
    label: '완료',
  },
  [ReservationStatus.CONFIRMED]: {
    bgColor: 'bg-orange-200',
    textColor: 'text-orange-500',
    label: '확정',
  },
  [ReservationStatus.RESERVATION]: {
    bgColor: 'bg-white',
    textColor: 'text-blue-500',
    label: '예약',
  },
  [ReservationStatus.SEAT]: {
    bgColor: 'bg-white',
    textColor: 'text-blue-500',
    label: '잔여',
  },
};

export function getMaxStatus(reservation: ReservationDataProps | undefined): ReservationStatus | null {
  if (!reservation) return null;

  const res = reservation.reservation;
  const counts: { [key in ReservationStatus]: number } = {
    [ReservationStatus.SEAT]: res[ReservationStatus.SEAT],
    [ReservationStatus.CONFIRMED]: res[ReservationStatus.CONFIRMED],
    [ReservationStatus.COMPLETE]: res[ReservationStatus.COMPLETE],
    [ReservationStatus.RESERVATION]: 0,
  };

  return (Object.keys(counts) as ReservationStatus[]).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

export function filterReservationsByDate(reservations: ReservationDataProps[], date: string): ReservationDataProps | undefined {
  return reservations.find((reservation) => reservation.date === date);
}

export function getStatusChipData(reservation: ReservationDataProps): Array<{ bgColor: string; count: number; label: string; textColor: string }> {
  return Object.values(ReservationStatus)
    .filter((status) => status !== ReservationStatus.RESERVATION)
    .map((status) => ({
      count: reservation.reservation[status],
      ...statusStyles[status],
    }))
    .filter((chipData) => chipData.count > 0);
}

export function getMaxStatusStyle(maxStatus: ReservationStatus | null) {
  if (!maxStatus) return null;
  return statusStyles[maxStatus];
}
