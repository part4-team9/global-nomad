/**
 * 입력받은 숫자를 3자리마다 쉼표(,)로 구분하여 문자열로 반환합니다.
 * @param num
 */

export const formatNumberWithCommas = (num: number) => num.toLocaleString('ko-KR');

/**
 * (YYYY.M.D) 형식의 날짜 문자열을 반환합니다.
 * @param isoString - ISO 8601 형식 날짜 문자열 (YYYY-MM-DDTHH:mm:ss.sssZ)
 */

export const formatDate = (date: string) => {
  const formDate = new Date(date);
  return `${formDate.getFullYear()}. ${formDate.getMonth() + 1}. ${formDate.getDate()}`;
};

/**
 * ISO 8601 형식 날짜 문자열 인수 2개를 받아 시간 범위를 문자열로 반환합니다. (HH:mm-HH:mm)
 * @param isoString1 - 시작 ISO 8601 날짜 문자열
 * @param isoString2 - 종료 ISO 8601 날짜 문자열
 */

export const formatTimeRange = (isoString1: string, isoString2: string): string => {
  const formatTime = (date: Date) => date.toISOString().slice(11, 16);
  return `${formatTime(new Date(isoString1))} - ${formatTime(new Date(isoString2))}`;
};
