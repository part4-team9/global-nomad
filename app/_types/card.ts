export enum ContentType {
  Experience = 'experience',
  Reservation = 'reservation',
}

export interface ReservationContents {
  button?: React.ReactNode;
  period: string;
  price: number;
  status: string;
  title: string;
  type: ContentType.Reservation;
}

export interface ExperienceContents {
  button?: React.ReactNode;
  price: number;
  rating: number;
  title: string;
  type: ContentType.Experience;
}

export type ContentsType = ReservationContents | ExperienceContents;
