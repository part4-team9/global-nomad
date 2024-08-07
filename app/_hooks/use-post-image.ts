import type { Dispatch, SetStateAction } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import postImage from '@/_apis/activities/postImage';
import { useMutation } from '@tanstack/react-query';

interface PostImageProps {
  callback: (res: string) => void;
  router: AppRouterInstance;
  setModalState: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      message: string;
      onClose: () => void;
    }>
  >;
}

export const usePostImage = ({ router, setModalState, callback }: PostImageProps) =>
  useMutation({
    mutationFn: postImage,
    onSuccess: (res) => {
      callback(String(res.activityImageUrl));
    },
    onError: (error) => {
      if (typeof error === 'number') {
        if (error === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
            onClose: () => {
              router.push('/login');
            },
          });
        } else {
          setModalState({
            isOpen: true,
            message: '죄송합니다. 이미지 등록에 실패했습니다.',
            onClose: () => {},
          });
        }
      }
    },
  });
