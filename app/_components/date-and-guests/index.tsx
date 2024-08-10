/**
 * 예약 날짜 및 예약 인원 렌더링하는 컴포넌트입니다.
 * @param date 예약 날짜
 * @param startTime 시작 시간
 * @param endTime 끝나는 시간
 * @param headCount 예약 인원
 * @returns return 형식 예시: 2024. 08. 10 · 17:00 - 20:00 · 1명
 */

import dayjs from 'dayjs';

interface DateGuestProps {
  date: string;
  endTime: string;
  headCount: number;
  startTime: string;
}

function DateAndGuests({ date, startTime, endTime, headCount }: DateGuestProps) {
  const formattedDate = dayjs(date).format('YYYY. MM. DD');

  return (
    <p className="flex items-center gap-[2px] text-xs leading-[2] text-nomad-black mobile:gap-1 mobile:text-sm mobile:leading-[1.7] tablet:gap-2 tablet:text-lg tablet:leading-[1.3]">
      <span>{formattedDate}</span>
      <span>·</span>
      <span>
        {startTime} - {endTime}
      </span>
      <span>·</span>
      <span>{headCount}명</span>
    </p>
  );
}

export default DateAndGuests;
