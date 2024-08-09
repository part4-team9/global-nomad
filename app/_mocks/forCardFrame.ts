import type { ActivitiesContents, ReservationContentsWithStringStatus } from '@/_types/card';
import { ContentType } from '@/_types/card';

export const mockContentsList = [
  {
    period: '2024.08.09',
    price: 300,
    time1: '2024-08-09T14:17:18.923Z',
    time2: '2024-08-09T20:17:18.923Z',
    headCount: 2,
    status: 'Confirmed',
    title: 'Hotel Reservation',
    type: ContentType.Reservation,
  } satisfies ReservationContentsWithStringStatus,
  {
    type: ContentType.Activities,
    price: 20000,
    rating: 4.8,
    title: 'Mountain Hiking',
  } satisfies ActivitiesContents,
];
