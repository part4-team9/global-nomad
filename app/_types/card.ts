export enum ContentType {
  Activities = 'activities',
  Reservation = 'reservation',
}

export enum ReservationStatus {
  Approved = 'Approved', // 예약 승인
  Canceled = 'Canceled', // 예약 취소
  Completed = 'Completed', // 체험 완료
  Confirmed = 'Confirmed', // 예약 완료
  Refusal = 'Refusal', // 예약 거절
}

export interface ReservationContents {
  button?: React.ReactNode;
  headCount: number;
  period: string;
  price: number;
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
  title: string;
  type: ContentType.Activities;
}

export type ContentsType = ReservationContents | ActivitiesContents;
