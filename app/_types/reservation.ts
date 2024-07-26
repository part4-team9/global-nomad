export enum ReservationStatus {
  COMPLETE = 'complete',
  CONFIRMED = 'confirmed',
  RESERVATION = 'reservation',
  SEAT = 'seat',
}

export interface ReservationDataProps {
  [ReservationStatus.RESERVATION]: {
    [ReservationStatus.COMPLETE]: number;
    [ReservationStatus.CONFIRMED]: number;
    [ReservationStatus.SEAT]: number;
  };
  date: string;
}
