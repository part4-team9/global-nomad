export interface StatusChipProps {
  bgColor: string;
  count: number;
  label: string;
  textColor: string;
}

/**
 * 예약 상태에 따라 스타일이 다른 chip을 렌더링합니다.
 * @param count chip에 표시할 숫자
 * @param bgColor chip의 배경색
 * @param textColor chip의 텍스트 색상
 * @param label chip의 레이블
 */
export default function StatusChip({ count, bgColor, textColor, label }: StatusChipProps) {
  return (
    <span className={`mx-0.5 mb-0.5 flex w-full gap-0.5 rounded px-1 text-m font-medium max-mobile:text-s ${bgColor} ${textColor}`}>
      <p>{label}</p> <p>{count}</p>
    </span>
  );
}
