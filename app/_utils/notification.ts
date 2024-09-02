export enum ListContentType {
  CONFIRMED, // 예약 확정
  DECLINED, // 예약 거절
  NEW, // 새로운 예약 추가
}

export interface ExtractSentence {
  sentence: string;
  type: ListContentType;
}

export const extractSentence = (content: string): ExtractSentence | null => {
  const confirmed = '예약이 승인되었습니다';
  const declined = '예약이 거절되었습니다';
  const newReservation = '새로 들어왔어요';

  let sentence: string | null = null;
  let type: ListContentType | null = null;

  if (content.indexOf(confirmed) !== -1) {
    sentence = content.slice(0, content.indexOf(confirmed)).trim();
    type = ListContentType.CONFIRMED;
  } else if (content.indexOf(declined) !== -1) {
    sentence = content.slice(0, content.indexOf(declined)).trim();
    type = ListContentType.DECLINED;
  } else if (content.indexOf(newReservation) !== -1) {
    sentence = content.slice(0, content.indexOf(newReservation)).trim();
    type = ListContentType.NEW;
  }

  if (sentence && type !== null) {
    return { sentence, type };
  }

  return null;
};
