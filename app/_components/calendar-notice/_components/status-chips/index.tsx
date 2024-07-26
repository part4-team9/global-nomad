interface StatusChipProps {
  bgColor: string;
  count: number;
  label: string;
  textColor: string;
}

/**
 * 예약 상태에 따라 스타일이 다른 칩을 렌더링합니다.
 */
export default function StatusChip({ count, bgColor, textColor, label }: StatusChipProps) {
  return (
    <span className={`mx-0.5 mb-0.5 flex w-full gap-0.5 rounded px-1 text-m font-medium max-mobile:text-s ${bgColor} ${textColor}`}>
      {label}
      {count}
    </span>
  );
}
