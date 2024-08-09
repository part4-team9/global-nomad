/**
 * 입력받은 숫자를 3자리마다 쉼표(,)로 구분하여 문자열로 반환합니다.
 * @param num
 */
export const formatNumberWithCommas = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
