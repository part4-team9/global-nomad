import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { ReservationParams } from '@/(route)/my/reservations/page';

import type { MyReservations } from '@/_types/myReservations';

import axiosInstance from '@/_libs/axios';

const getReservations = async (params: ReservationParams) => {
  try {
    const res: AxiosResponse<MyReservations> = await axiosInstance.get('/my-reservations', {
      params,
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

export default getReservations;
