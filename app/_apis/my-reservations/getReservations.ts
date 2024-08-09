import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { MyReservations } from '@/_types/myReservations';

import axiosInstance from '@/_libs/axios';

const getReservations = async () => {
  try {
    const res: AxiosResponse<MyReservations> = await axiosInstance.get('/my-reservations');
    const { data } = res;
    console.log(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status } = (error.response as AxiosResponse) ?? 500;
      throw status;
    } else {
      throw error;
    }
  }
};

export default getReservations;
