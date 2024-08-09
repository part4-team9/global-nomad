// mockContents.ts

import type { ExperienceContents, ReservationContents } from '@/_types/card';
import { ContentType } from '@/_types/card';

export const mockReservationContents: ReservationContents = {
  period: '2024-08-09 to 2024-08-12',
  price: 300,
  status: 'Confirmed',
  title: 'Hotel Reservation',
  type: ContentType.Reservation,
};

export const mockExperienceContents: ExperienceContents = {
  type: ContentType.Experience,
  price: 150,
  rating: 4.5,
  title: 'City Tour',
};

export const mockContentsList = [
  {
    type: ContentType.Reservation,
    period: '2024-09-01 to 2024-09-05',
    price: 500,
    status: 'Pending',
    title: 'Flight Reservation',
  } satisfies ReservationContents,
  {
    type: ContentType.Experience,
    price: 200,
    rating: 4.8,
    title: 'Mountain Hiking',
  } satisfies ExperienceContents,
];
