export interface BaseEntity {
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface Activity extends BaseEntity {
  address: string;
  bannerImageUrl: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  userId: number;
}

export interface ActivitiesResponse {
  activities: Activity[];
  cursorId: number;
  totalCount: number;
}

export enum ReservationStatus {
  COMPLETE = 'complete', // 완료 싱태 (완료)
  CONFIRMED = 'confirmed', // 확정 상태 (승인)
  DECLINED = 'declined', // 거절 상태 (거절)
  PENDING = 'pending', // 신청 상태 (예약)
}

export interface ReservationStatusCount {
  [ReservationStatus.COMPLETE]?: number;
  [ReservationStatus.CONFIRMED]: number;
  [ReservationStatus.DECLINED]?: number;
  [ReservationStatus.PENDING]: number;
}

export interface DateReservations {
  date: string;
  reservations: ReservationStatusCount;
}

export type ScheduleStatusCount = ReservationStatusCount;

export interface Schedule {
  count: ScheduleStatusCount;
  endTime: string;
  scheduleId: number;
  startTime: string;
}

export interface BaseReservation extends BaseEntity {
  activityId: number;
  date: string;
  endTime: string;
  headCount: number;
  reviewSubmitted: boolean;
  scheduleId: number;
  startTime: string;
  status: string;
  teamId: string;
  totalPrice: number;
  userId: number;
}

interface Reservation extends BaseReservation {
  nickname: string;
}

export interface ReservationsResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}
