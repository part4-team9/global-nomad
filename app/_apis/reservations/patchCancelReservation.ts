import axios from 'axios';

import axiosInstance from '@/_libs/axios';

const patchCancelReservation = async (id: number) => {
  try {
    const res = await axiosInstance.patch(`/my-reservations/${id}`, {
      status: 'canceled',
    });
    // return res.data;
    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export default patchCancelReservation;
