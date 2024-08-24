/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance from '../axios';

export interface Request {
  content: string;
  rating: number;
  reservationId: number;
}

async function postReview({ reservationId, rating, content }: Request) {
  const response = await axiosInstance.post(`/my-reservations/${reservationId}/reviews`, {
    rating,
    content,
  });
  return response.data;
}

export default postReview;
