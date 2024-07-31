import cx from 'clsx';
import DotIcon from 'public/assets/icons/calender/DotIcon';

import type { ReservationDataProps } from '@/_types';

import { filterReservationsByDate, getMaxStatus, getMaxStatusStyle, getStatusChipData } from '@/_utils/reservation';

interface CalendarCellProps {
  children: (chipData: { bgColor: string; count: number; label: string; textColor: string }[]) => JSX.Element;
  day: number;
  keyDate: string;
  monthType: string;
  reservations: ReservationDataProps[];
  today: string;
}

/**
 * 캘린더 셀을 렌더링합니다.
 * @param day 날짜
 * @param monthType 현재 달인지 이전/다음 달인지 여부
 * @param keyDate 날짜 키
 * @param reservations 예약 현황 데이터
 * @param today 오늘 날짜
 * @param children 셀 내부에 렌더링할 컴포넌트 (chips)
 */
export default function CalendarCell({ day, monthType, keyDate, reservations, today, children }: CalendarCellProps) {
  const dayReservation = filterReservationsByDate(reservations, keyDate);
  const maxStatus = getMaxStatus(dayReservation);
  const statusChipData = dayReservation ? getStatusChipData(dayReservation) : [];
  const maxStatusStyle = getMaxStatusStyle(maxStatus);

  return (
    <td className="border-grey-150 flex cursor-pointer flex-col justify-between border text-base/[21px] transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
      <p
        className={cx('m-3 box-border flex w-fit gap-1', {
          'text-gray-200': monthType !== 'current',
          'rounded bg-emerald-800 px-0.5 text-white': keyDate === today,
        })}
      >
        {day}
        {maxStatus && maxStatusStyle && <DotIcon colorClass="fill-blue-500" />}
      </p>
      {children(statusChipData)}
    </td>
  );
}
