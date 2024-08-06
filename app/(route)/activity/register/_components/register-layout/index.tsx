'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import postActivity from '@/_apis/activities/postActivity';
import { useMutation } from '@tanstack/react-query';

import type { Activity } from '../../page';
import ActivityForm from '../activity-register-form';
import CommonModal from '../common-modal';

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
      setModalState({
        isOpen: true,
        message: '체험 등록이 완료되었습니다',
        onClose: () => {
          /**
           * @TODO 체험 상세 url에 맞게 수정 필요
           */
          // router.push(`/activity/${res.data.id}`);
        },
      });
    },
    onError: (error) => {
      if (typeof error === 'number') {
        if (error === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다',
            onClose: () => {
              router.push('/login');
            },
          });
        } else {
          let message = '';
          switch (error) {
            case 400:
              message = '제목은 문자열로 입력해주세요';
              break;
            case 409:
              message = '겹치는 예약 가능 시간대가 존재합니다';
              break;
            default:
              message = '죄송합니다. 체험 등록에 실패했습니다.';
              break;
          }
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message,
          }));
        }
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
