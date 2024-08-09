// mockContents.ts

import type { ActivitiesContents, ReservationContents } from '@/_types/card';
import { ContentType } from '@/_types/card';

export const mockReservationContents: Omit<ReservationContents, 'status'> & { status: string } = {
  period: '2024.08.09',
  price: 300,
  time: '14:00',
  headCount: 2,
  status: 'Confirmed',
  title: 'Hotel Reservation',
  type: ContentType.Reservation,
};

export const mockExperienceContents: ActivitiesContents = {
  type: ContentType.Experience,
  price: 150,
  rating: 4.5,
  title: 'City Tour',
};

export const mockContentsList = [
  {
    period: '2024.08.09',
    price: 300,
    time: '14:00',
    headCount: 2,
    status: 'Confirmed',
    title: 'Hotel Reservation',
    type: ContentType.Reservation,
  } satisfies ReservationContents,
  {
    type: ContentType.Activities,
    price: 20000,
    rating: 4.8,
    title: 'Mountain Hiking',
  } satisfies ActivitiesContents,
];
