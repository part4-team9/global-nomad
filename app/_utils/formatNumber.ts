/**
 * 숫자에 쉼표 추가하는 유틸 함수입니다
 */
export function addCommasToPrice(value: string) {
  return Number(value.replace(/[^0-9]/g, '').replaceAll(',', '')).toLocaleString('ko-KR');
}

/**
 * 숫자에서 쉼표를 제거하는 유틸 함수입니다
 */
export function removeCommas(value: string) {
  return Number(value.replace(/[^0-9]/g, '').replaceAll(',', ''));
}
