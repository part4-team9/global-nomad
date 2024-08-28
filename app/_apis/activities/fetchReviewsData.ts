import type { ReviewResponse } from '@/_types/details/types';

import axiosInstance from '@/_libs/axios';

export const fetchReviewsData = async (activityId: string): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.get<ReviewResponse>(`/activities/${activityId}/reviews`);
    return response.data;
  } catch (err) {
    throw new Error('리뷰 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};
