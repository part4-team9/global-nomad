import getMyActivities from '@/_apis/reservation/getMyActivities';
import { useQuery } from '@tanstack/react-query';

const queryKeys = {
  reservations: () => ['reservations'] as const,
  reservationsByStatus: (status: string) => ['reservations', 4, status] as const,
  reservationTimeTable: (id: number, year: string, month: string) => ['reservationTimeTable', id, year, month] as const,
};

const useMyActivity = (status: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.reservationsByStatus(status),
    queryFn: getMyActivities,
  });

  return { myActivityData: data, isLoading, error };
};

export default useMyActivity;
