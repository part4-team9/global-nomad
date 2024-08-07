'use client';

import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import getActivity from '@/_apis/activities/getActivity';
import patchActivity from '@/_apis/activities/patchActivity';
import CommonModal from '@/(route)/activity/register/_components/common-modal';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { ActivityEdit } from '../../page';
import ActivityEditForm from '../activity-edit-form';

interface EditLayoutProps {
  id: string;
}

function EditLayout({ id }: EditLayoutProps) {
  const router = useRouter();
  const { data, isSuccess } = useQuery({ queryKey: ['activity', id], queryFn: () => getActivity(id) });

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
    mutationFn: patchActivity,
    onSuccess: (res) => {
      const { id: postId } = res.data;
      setModalState({
        isOpen: true,
        message: '수정이 완료되었습니다',
        onClose: () => {
          /**
           * @TODO 체험 상세 url에 맞게 수정 필요
           */
          router.push(`/activity/${postId}`);
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
        let errorMessage;
        switch (status) {
          case 404:
            errorMessage = '존재하지 않는 체험입니다.';
            break;
          default:
            errorMessage = message;
            break;
        }
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          message: errorMessage,
        }));
      }
    },
  });

  const { isPending } = activityMutation;

  const onSubmitForm = (formData: ActivityEdit) => {
    activityMutation.mutate({ id, body: formData });
  };

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
      <ActivityEditForm data={data} isSuccess={isSuccess} onSubmit={onSubmitForm} isPending={isPending} title="내 체험 수정" buttonTitle="수정하기" />
    </>
  );
}

export default EditLayout;
