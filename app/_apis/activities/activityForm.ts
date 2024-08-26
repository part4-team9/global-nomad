/**
 * 체험 등록, 수정 페이지에서 사용하는 API 파일입니다.
 *
 * 이 파일에는 체험 상세 조회, 수정, 등록, 이미지 등록 등의 API 호출 함수들이 정의되어 있습니다.
 */

import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { Activity, ActivityDetail, ActivityEdit } from '@/_types/activities/form.types';

import axiosInstance from '@/_libs/axios';

/**
 * 체험 상세 조회 API
 *
 * @param {string} activityId - 조회할 체험의 ID
 */
export const getActivity = async (activityId: string) => {
  try {
    const result: AxiosResponse<ActivityDetail> = await axiosInstance.get(`/activities/${activityId}`);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

/**
 * 체험 수정 API
 *
 * @param {PatchActivityProps} params - 수정할 체험의 ID와 수정할 데이터를 포함하는 객체
 */
interface PatchActivityProps {
  body: ActivityEdit;
  id: string;
}

export const patchActivity = async ({ id, body }: PatchActivityProps) => {
  try {
    const result = await axiosInstance.patch(`/my-activities/${id}`, body);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

/**
 * 체험 등록 API
 *
 * @param {Activity} body - 등록할 체험의 데이터
 */
export const postActivity = async (body: Activity) => {
  try {
    const result = await axiosInstance.post('/activities', body);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

/**
 * 체험 이미지 등록 API
 *
 * @param {FormData} body - 업로드할 이미지 데이터를 포함하는 FormData 객체
 */
interface PostImageResponse {
  activityImageUrl: string;
}

export const postImage = async (body: FormData): Promise<PostImageResponse> => {
  try {
    const response: AxiosResponse<PostImageResponse> = await axiosInstance.post('/activities/image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status } = (error.response as AxiosResponse) ?? { status: 500 };
      throw status;
    } else {
      throw error;
    }
  }
};
