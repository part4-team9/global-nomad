import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';

import CancelModal from '../CancelModal';

function CancelButton({ id }: { id: number }) {
  const { modalState, setModalState, openModal, closeModal } = useModalState();

  const handleClickCancel = () => {
    setModalState((prev) => ({
      ...prev,
      message: '예약을 취소하시겠어요?',
    }));
    openModal();
  };

  return (
    <>
      {modalState.isOpen && <CancelModal id={id} message={modalState.message} closeModal={closeModal} />}
      <Button
        type="button"
        variant="white"
        borderRadius="6px"
        onClick={handleClickCancel}
        className="h-8 w-20 text-sm tablet:h-[42px] tablet:w-[144px] mobile:h-10 mobile:w-28 mobile:text-base mobile:leading-[1.6]"
      >
        예약 취소
      </Button>
    </>
  );
}

export default CancelButton;
