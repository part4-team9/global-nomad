export type ReservationStatus = 'pending' | 'canceled' | 'confirmed' | 'declined' | 'completed';

export interface Reservations {
  activity: {
    bannerImageUrl: string;
    id: number;
    title: string;
  };
  createdAt: string;
  date: string;
  endTime: string;
  headCount: number;
  id: number;
  reviewSubmitted: boolean;
  scheduleId: number;
  startTime: string;
  status: ReservationStatus;
  teamId: string;
  totalPrice: number;
  updatedAt: string;
  userId: number;
}

export interface MyReservations {
  cursorId: number;
  reservations: Reservations[];
  totalCount: number;
}
