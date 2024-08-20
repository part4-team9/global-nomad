import axiosInstance from '@/_libs/axios';
import { ReservationsResponse } from '@/_types';
import { useQuery } from '@tanstack/react-query';
import CardPending from '../CardPending';
import CardApprove from '../CardApprove';
import CardRejected from '../CardRejected';

type CardSectionProps = {
  activityId?: number;
  selectedScheduleId: number | null;
  activeIndex: number;
};

export default function CardSection({ activityId, selectedScheduleId, activeIndex }: CardSectionProps) {
  const { data: reservationStatus } = useQuery<ReservationsResponse>({
    queryKey: ['reservationStatus', activityId, selectedScheduleId, activeIndex],
    queryFn: async () => {
      const status = activeIndex === 0 ? 'pending' : activeIndex === 1 ? 'confirmed' : 'declined';
      const response = await axiosInstance.get(`/my-Activities/${activityId}/reservations?scheduleId=${selectedScheduleId}&status=${status}`);
      return response.data;
    },
  });

  return (
    <>
      <h3 className="mt-8">예약 내역</h3>
      <div className="h-[300px] overflow-x-hidden overflow-y-scroll">
        {reservationStatus?.reservations &&
          activeIndex === 0 &&
          reservationStatus.reservations.map((res) => <CardPending key={res.id} nickname={res.nickname} headCount={res.headCount} />)}

        {reservationStatus?.reservations &&
          activeIndex === 1 &&
          reservationStatus.reservations.map((res) => <CardApprove key={res.id} nickname={res.nickname} headCount={res.headCount} />)}

        {reservationStatus?.reservations &&
          activeIndex === 2 &&
          reservationStatus.reservations.map((res) => <CardRejected key={res.id} nickname={res.nickname} headCount={res.headCount} />)}
      </div>
    </>
  );
}
