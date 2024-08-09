'use client';

import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import postActivity from '@/_apis/activities/postActivity';
import { useMutation } from '@tanstack/react-query';

import type { Activity } from '../../page';
import ActivityForm from '../activity-register-form';
import CommonModal from '../common-modal';

/**
 * 체험 등록 페이지 렌더링 및 modal 상태관리, data post하는 컴포넌트입니다.
 */
function RegisterLayout() {
  const router = useRouter();
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    onClose: () => {},
  });

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    modalState.onClose();
  };

  const activityMutation = useMutation({
    mutationFn: postActivity,
    onSuccess: (res) => {
      const { id } = res.data;
      setModalState({
        isOpen: true,
        message: '체험 등록이 완료되었습니다',
        onClose: () => {
          /**
           * @TODO 체험 상세 url에 맞게 수정 필요
           */
          router.push(`/activity/${id}`);
        },
      });
    },
    onError: (error: AxiosResponse) => {
      const { status } = error;
      const { message } = error.data;
      if (status === 401) {
        setModalState({
          isOpen: true,
          message,
          onClose: () => {
            router.push('/login');
          },
        });
      } else {
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          message,
        }));
      }
    },
  });

  // isPending 상태에서 버튼 disable 처리
  const { isPending } = activityMutation;

  const onSubmitForm = (formData: Activity) => {
    activityMutation.mutate(formData);
  };

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
      <ActivityForm title="내 체험 등록" buttonTitle="등록하기" onSubmit={onSubmitForm} isPending={isPending} />
    </>
  );
}

export default RegisterLayout;
