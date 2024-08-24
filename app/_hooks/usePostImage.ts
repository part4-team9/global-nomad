import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { postImage } from '@/_apis/activities/activityForm';
import { useMutation } from '@tanstack/react-query';

import type { ErrorResponseMessage } from '@/_types/activities/form.types';

import type { ModalStateProps } from './useModalState';

interface PostImageProps {
  callback: (res: string) => void;
  router: AppRouterInstance;
  setModalState: Dispatch<SetStateAction<ModalStateProps>>;
}

export const usePostImage = ({ router, setModalState, callback }: PostImageProps) =>
  useMutation({
    mutationFn: postImage,
    mutationKey: ['postImage'],
    onSuccess: (res) => {
      callback(String(res.activityImageUrl));
    },
    onError: (error: AxiosError<ErrorResponseMessage>) => {
      if (error.response) {
        const { status } = error.response;
        const message = status === 500 ? '죄송합니다. 이미지 등록에 실패했습니다.' : error.response.data.message;
        if (status === 401) {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
            onClose: () => {
              router.push('/login');
            },
          }));
        } else {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message,
            onClose: () => {},
          }));
        }
      }
    },
  });
