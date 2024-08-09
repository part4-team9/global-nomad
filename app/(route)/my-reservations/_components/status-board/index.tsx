import type { ReservationStatus } from '@/_types/myReservations';

interface StatusProps {
  status: ReservationStatus;
}

function StatusBoard({ status }: StatusProps) {
  const statusManager = {
    pending: {
      text: '예약 완료',
      color: '#2EB4FF',
    },
    canceled: {
      text: '예약 취소',
      color: '#79747E',
    },
    confirmed: {
      text: '예약 승인',
      color: '#FF7C1D',
    },
    declined: {
      text: '예약 거절',
      color: '#FF472E',
    },
    completed: {
      text: '체험 완료',
      color: '#79747E',
    },
  };

  return (
    <span className="text-sm font-bold leading-[1.8] mobile:text-base mobile:leading-[1.6]" style={{ color: statusManager[status].color }}>
      {statusManager[status].text}
    </span>
  );
}

export default StatusBoard;
