import type { Dayjs } from 'dayjs';

interface HeaderProps {
  currentDate: Dayjs;
  goToNextMonth: () => void;
  goToNextYear: () => void;
  goToPreviousMonth: () => void;
  goToPreviousYear: () => void;
  goToday: () => void;
}

/**
 * 캘린더의 헤더를 렌더링합니다.
 * 캘린더 내 날짜 이동 버튼을 제공합니다.
 * @param currentDate 현재 날짜
 * @param goToNextMonth 다음 달로 이동하는 함수
 * @param goToNextYear 다음 해로 이동하는 함수
 * @param goToPreviousMonth 이전 달로 이동하는 함수
 * @param goToPreviousYear 이전 해로 이동하는 함수
 * @param goToday 오늘로 이동하는 함수
 */

export default function Header({ currentDate, goToNextMonth, goToNextYear, goToPreviousMonth, goToPreviousYear, goToday }: HeaderProps) {
  return (
    <div className="relative flex w-full items-center justify-between pb-[24px]">
      <div className="mx-auto flex w-full max-w-[342px] items-center justify-between py-[5px]">
        <div className="flex gap-2 text-stone-400">
          <button type="button" onClick={goToPreviousYear} className="hover:text-black">
            {'<<'}
          </button>
          <button type="button" onClick={goToPreviousMonth} className="hover:text-black">
            {'<'}
          </button>
        </div>
        <span className="text-l/[26px] font-bold">{currentDate.format('YYYY년 MM월')}</span>
        <div className="flex gap-2 text-stone-400">
          <button type="button" onClick={goToNextMonth} className="hover:text-black">
            {'>'}
          </button>
          <button type="button" onClick={goToNextYear} className="hover:text-black">
            {'>>'}
          </button>
        </div>
      </div>
      <button type="button" onClick={goToday} className="absolute right-0 rounded hover:bg-gray-100">
        Go Today
      </button>
    </div>
  );
}
