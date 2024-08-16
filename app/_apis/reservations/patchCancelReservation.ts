import axios from 'axios';

import type { ReservationCancel } from '@/_types/myReservations';

import axiosInstance from '@/_libs/axios';

const patchCancelReservation = async (id: number): Promise<ReservationCancel> => {
  try {
    const res = await axiosInstance.patch<ReservationCancel>(`/my-reservations/${id}`, {
      status: 'canceled',
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export default patchCancelReservation;
