import { useQuery } from '@tanstack/react-query';

import type { ReservationsResponse } from '@/_types';

import axiosInstance from '@/_libs/axios';

import CardApprove from '../CardApprove';
import CardPending from '../CardPending';
import CardRejected from '../CardRejected';

type CardSectionProps = {
  activeIndex: number;
  activityId?: number;
  onRefetch?: () => void;
  selectedScheduleId: number | null;
};

export default function CardSection({ activityId, selectedScheduleId, activeIndex, onRefetch }: CardSectionProps) {
  const { data: reservationStatus, refetch } = useQuery<ReservationsResponse>({
    queryKey: ['reservationStatus', activityId, selectedScheduleId, activeIndex],
    queryFn: async () => {
      const status = activeIndex === 0 ? 'pending' : activeIndex === 1 ? 'confirmed' : 'declined';
      const response = await axiosInstance.get<ReservationsResponse>(
        `/my-Activities/${activityId}/reservations?scheduleId=${selectedScheduleId}&status=${status}`,
      );
      return response.data;
    },
  });

  return (
    <>
      <h3 className="mt-8">예약 내역</h3>
      <div className="h-[300px] overflow-x-hidden overflow-y-scroll">
        {reservationStatus?.reservations &&
          activeIndex === 0 &&
          reservationStatus.reservations.map((res) => (
            <CardPending
              key={res.id}
              activityId={activityId}
              nickname={res.nickname}
              headCount={res.headCount}
              reservationId={res.id}
              refetch={refetch}
              onRefetch={onRefetch}
            />
          ))}

        {reservationStatus?.reservations &&
          activeIndex === 1 &&
          reservationStatus.reservations.map((res) => (
            <CardApprove
              key={res.id}
              activityId={activityId}
              nickname={res.nickname}
              headCount={res.headCount}
              reservationId={res.id}
              refetch={refetch}
              onRefetch={onRefetch}
            />
          ))}

        {reservationStatus?.reservations &&
          activeIndex === 2 &&
          reservationStatus.reservations.map((res) => (
            <CardRejected
              key={res.id}
              activityId={activityId}
              nickname={res.nickname}
              headCount={res.headCount}
              reservationId={res.id}
              refetch={refetch}
              onRefetch={onRefetch}
            />
          ))}
      </div>
    </>
  );
}
