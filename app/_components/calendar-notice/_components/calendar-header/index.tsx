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
 * Renders the header (controller and display of year and month) of the calendar.
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
