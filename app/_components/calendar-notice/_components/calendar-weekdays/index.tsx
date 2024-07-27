// TODO 주 시작 요일에 따른 요일, 날짜 재랜더링

interface WeekDaysProps {
  weekStartDay?: number;
}

/**
 * 달력의 요일을 렌더링합니다.
 */
export default function Weekdays({ weekStartDay }: WeekDaysProps) {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <thead>
      <tr className="grid grid-cols-7">
        {weekDays
          .slice(weekStartDay)
          .concat(weekDays.slice(0, weekStartDay))
          .map((day) => (
            <th className="flex border p-3 text-base font-medium" key={day}>
              {day}
            </th>
          ))}
      </tr>
    </thead>
  );
}
