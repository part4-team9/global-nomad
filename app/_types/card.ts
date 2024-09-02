export enum ContentType {
  Activities = 'activities',
  Reservation = 'reservation',
}

export enum ReservationStatus {
  canceled = 'canceled', // 예약 취소
  completed = 'completed', // 체험 완료
  confirmed = 'confirmed', // 예약 승인
  declined = 'declined', // 예약 거절
  pending = 'pending', // 예약 신청
}

export interface ReservationContents {
  button?: React.ReactNode;
  headCount: number;
  period: string;
  price: number;
  reservationId: number;
  status: ReservationStatus;
  time1: string;
  time2: string;
  title: string;
  type: ContentType.Reservation;
}

export type ReservationContentsWithStringStatus = Omit<ReservationContents, 'status'> & { status: string };

export interface ActivitiesContents {
  button?: React.ReactNode;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  type: ContentType.Activities;
}

export type ContentsType = ReservationContents | ActivitiesContents;
