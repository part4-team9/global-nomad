/**
 * 입력받은 숫자를 3자리마다 쉼표(,)로 구분하여 문자열로 반환합니다.
 * @param num
 */
export const formatNumberWithCommas = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * (YYYY.M.D) 형식의 날짜 문자열을 반환합니다.
 * @param isoString - ISO 8601 형식 날짜 문자열 (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}`;
}

/**
 * ISO 8601 형식 날짜 문자열 인수 2개를 받아 시간 범위를 문자열로 반환합니다. (HH:mm-HH:mm)
 * @param isoString1 - 시작 ISO 8601 날짜 문자열
 * @param isoString2 - 종료 ISO 8601 날짜 문자열
 */
export function formatTimeRange(isoString1: string, isoString2: string): string {
  const date1 = new Date(isoString1);
  const date2 = new Date(isoString2);

  const hours1 = date1.getUTCHours().toString().padStart(2, '0');
  const minutes1 = date1.getUTCMinutes().toString().padStart(2, '0');

  const hours2 = date2.getUTCHours().toString().padStart(2, '0');
  const minutes2 = date2.getUTCMinutes().toString().padStart(2, '0');

  return `${hours1}:${minutes1} - ${hours2}:${minutes2}`;
}
