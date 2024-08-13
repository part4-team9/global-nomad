import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { MyReservations } from '@/_types/myReservations';

import axiosInstance from '@/_libs/axios';

const getReservations = async (): Promise<MyReservations> => {
  try {
    const res: AxiosResponse<MyReservations> = await axiosInstance.get('/my-reservations');
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
