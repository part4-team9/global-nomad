import type { ReservationStatus } from '@/_types/myReservations';

export interface ReservationFilter {
  label: '예약 신청' | '예약 취소' | '예약 승인' | '예약 거절' | '체험 완료' | '전체 예약';
  status?: ReservationStatus;
}

export const RESERVATION_FILTER: ReservationFilter[] = [
  {
    status: undefined,
    label: '전체 예약',
  },
  {
    status: 'pending',
    label: '예약 신청',
  },
  {
    status: 'canceled',
    label: '예약 취소',
  },
  {
    status: 'confirmed',
    label: '예약 승인',
  },
  {
    status: 'declined',
    label: '예약 거절',
  },
  {
    status: 'completed',
    label: '체험 완료',
  },
];
