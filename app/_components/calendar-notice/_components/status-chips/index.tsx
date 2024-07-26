import { ReservationStatus } from '@/_types';

interface StatusChipProps {
  count: number;
  status: ReservationStatus;
}

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

/**
 * 예약 상태에 따라 스타일이 다른 칩을 렌더링합니다.
 */
export default function StatusChip({ count, status }: StatusChipProps) {
  if (count === 0) return null;

  const { bgColor, textColor, label } = statusStyles[status];

  return (
    <span className={`mx-0.5 mb-0.5 flex w-full gap-0.5 rounded px-1 text-m font-medium max-mobile:text-s ${bgColor} ${textColor}`}>
      {label}
      {count}
    </span>
  );
}
