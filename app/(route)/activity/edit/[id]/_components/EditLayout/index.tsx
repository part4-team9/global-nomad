'use client';

import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { getActivity, patchActivity } from '@/_apis/activities/activityForm';
import CommonModal from '@/(route)/activity/register/_components/CommonModal';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { ActivityEdit, ErrorResponseMessage } from '@/_types/activities/form.types';

import useModalState from '@/_hooks/useModalState';

import ActivityEditForm from '../ActivityEditForm';

interface EditLayoutProps {
  id: string;
}

/**
 * 체험 수정 페이지를 렌더링하고, 모달 상태 관리와 데이터 페칭을 담당하는 컴포넌트입니다.
 *
 * @param {string} id 수정할 체험의 ID 값
 */
function EditLayout({ id }: EditLayoutProps) {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ['activity', id], queryFn: () => getActivity(id) });
  const { closeModal, modalState, setModalState } = useModalState();

  const activityMutation = useMutation({
    mutationFn: patchActivity,
    onSuccess: (res) => {
      const { id: postId } = res.data;
      setModalState({
        isOpen: true,
        message: '수정이 완료되었습니다',
        onClose: () => {
          router.push(`/activity/detail/${postId}`);
        },
      });
    },
    onError: (error: AxiosError<ErrorResponseMessage>) => {
      if (error.response) {
        const { status } = error.response;
        const message = status === 500 ? '죄송합니다. 체험 수정에 실패했습니다.' : error.response.data.message;

        if (status === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
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
      {data && <ActivityEditForm data={data} onSubmit={onSubmitForm} isPending={isPending} title="내 체험 수정" buttonTitle="수정하기" />}
    </>
  );
}

export default EditLayout;
