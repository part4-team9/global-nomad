import { calcLastColumCellStyles } from '@/_utils/calender';
import { cn } from '@/_utils/classNames';

/**
 * 달력의 요일을 렌더링합니다.
 */
export default function Weekdays() {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <tr className="grid grid-cols-7">
      {weekDays.map((day, index) => (
        <th className={cn('flex p-3 text-base font-medium', calcLastColumCellStyles({ index, length: weekDays.length }))} key={day}>
          {day}
        </th>
      ))}
    </tr>
  );
}
