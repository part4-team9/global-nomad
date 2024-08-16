'use client';

import { useState } from 'react';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import patchCancelReservation from '@/_apis/reservations/patchCancelReservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';

import CancelModal from '../CancelModal';

function CancelButton({ id }: { id: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { modalState, setModalState, openModal, closeModal } = useModalState();

  const handleClickCancel = () => {
    setIsFirstRender(true);
    setModalState((prev) => ({
      ...prev,
      message: '예약을 취소하시겠어요?',
    }));
    openModal();
  };

  const reservationMutation = useMutation({
    mutationFn: patchCancelReservation,
    onSuccess: () => {
      setIsFirstRender(false);
      setModalState((prev) => ({
        ...prev,
        message: '예약 취소가 완료되었습니다.',
      }));
      // await queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error: AxiosError) => {
      setIsFirstRender(false);
      const status = error.response?.status;
      const data = error.response?.data as { message?: string };
      const message = data?.message || '예약 취소에 실패했습니다.';
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

  const handleCloseModal = async (action = 'close') => {
    if (action === 'cancel') {
      reservationMutation.mutate(id);
    } else if (action === 'confirm') {
      await queryClient.invalidateQueries({ queryKey: ['reservations'] });
    } else {
      closeModal();
    }
  };

  const { isSuccess, isPending, isError } = reservationMutation;

  return (
    <>
      {modalState.isOpen && (
        <CancelModal
          message={modalState.message}
          isFirstRender={isFirstRender}
          isSuccess={isSuccess}
          isPending={isPending}
          isError={isError}
          onClose={handleCloseModal}
        />
      )}
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
