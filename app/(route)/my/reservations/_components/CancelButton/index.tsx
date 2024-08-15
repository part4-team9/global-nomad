'use client';

import { useState } from 'react';

import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';

import CancelModal from '../CancelModal';

function CancelButton({ id }: { id: number }) {
  const { modalState, setModalState, openModal, closeModal } = useModalState();
  const [cancel, setCancel] = useState(true);

  const handleClickCancel = () => {
    setModalState((prev) => ({
      ...prev,
      message: '예약을 취소하시겠어요?',
    }));
    openModal();
  };

  const handleCloseModal = (action = 'close') => {
    if (action === 'cancel') {
      // TODO 예약 취소하는 로직 필요
    }

    closeModal();
  };

  return (
    <>
      {modalState.isOpen && <CancelModal cancelMode={cancel} message={modalState.message} onClose={handleCloseModal} />}
      <Button
        type="button"
        variant="white"
        borderRadius="6px"
        onClick={handleClickCancel}
        className="h-8 w-20 text-sm mobile:h-10 mobile:w-28 mobile:text-base mobile:leading-[1.6] tablet:h-[42px] tablet:w-[144px]"
      >
        예약 취소
      </Button>
    </>
  );
}

export default CancelButton;
