'use client';

import { useState } from 'react';
import getActivity from '@/_apis/activities/getActivity';
import CommonModal from '@/(route)/activity/register/_components/common-modal';
import { useQuery } from '@tanstack/react-query';

import ActivityEditForm from '../activity-edit-form';

interface EditLayoutProps {
  id: string;
}

function EditLayout({ id }: EditLayoutProps) {
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

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
      <ActivityEditForm data={data} isSuccess={isSuccess} title="내 체험 수정" buttonTitle="수정하기" />
    </>
  );
}

export default EditLayout;
