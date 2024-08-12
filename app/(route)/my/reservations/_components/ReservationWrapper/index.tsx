import type { Reservations } from '@/_types/myReservations';

import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';

import CancelModal from '../CancelModal';

interface ReservationsWrapper {
  datas: Reservations[];
}

function ReservationWrapper({ datas }: ReservationsWrapper) {
  const { modalState, setModalState, openModal, closeModal } = useModalState();

  const handleClickCancel = () => {
    setModalState((prev) => ({
      ...prev,
      message: '예약을 취소하시겠어요?',
    }));
    openModal();
  };

  return (
    <div className="mt-3 grid gap-2 mobile:mt-6 mobile:gap-4 tablet:mt-4 tablet:gap-6">
      {/* TODO 카드 컴포넌트로 이동 필요 (현재 모달 테스트 중) */}
      <Button
        type="button"
        variant="white"
        borderRadius="6px"
        onClick={handleClickCancel}
        className="h-8 w-20 text-sm mobile:h-10 mobile:w-28 mobile:text-base mobile:leading-[1.6] tablet:h-[42px] tablet:w-[144px]"
      >
        예약 취소
      </Button>
      {modalState.isOpen && <CancelModal message={modalState.message} closeModal={closeModal} />}
      {datas.map((data) => (
        <div key={data.activity.id} />
      ))}
    </div>
  );
}

export default ReservationWrapper;
