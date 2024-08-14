import Lottie from 'react-lottie-player';

import Button from '@/_components/button';
import Modal from '@/_components/modal';

import CheckBlack from 'public/assets/lottie/check-black.json';

interface CancelModalProps {
  closeModal: () => void;
  id: number;
  message: string;
}

function CancelModal({ id, message, closeModal }: CancelModalProps) {
  const handleCloseModal = (action = 'close') => {
    if (action === 'cancel') {
      // TODO 예약 취소하는 로직 필요
      console.log(id);
    }

    closeModal();
  };

  return (
    <Modal isOpen onClose={handleCloseModal}>
      <div className="mb-6 mt-5 flex w-full max-w-[298px] flex-col items-center px-[65px]">
        <Lottie className="size-9" animationData={CheckBlack} play loop={false} />
        <p className="mt-3 leading-[1.6] text-black">{message}</p>
        <div className="mt-[30px] flex gap-2">
          <Button variant="white" onClick={handleCloseModal} className="h-[38px] w-20 text-sm font-bold">
            아니오
          </Button>
          <Button variant="black" onClick={() => handleCloseModal('cancel')} className="h-[38px] w-20 text-sm font-bold">
            취소하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CancelModal;
