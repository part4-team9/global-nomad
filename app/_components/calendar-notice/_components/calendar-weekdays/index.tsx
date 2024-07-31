/**
 * 달력의 요일을 렌더링합니다.
 */
export default function Weekdays() {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <tr className="grid grid-cols-7">
      {weekDays.map((day) => (
        <th className="flex border p-3 text-base font-medium" key={day}>
          {day}
        </th>
      ))}
    </tr>
  );
}
