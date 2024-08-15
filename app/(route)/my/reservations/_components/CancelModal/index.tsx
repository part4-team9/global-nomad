import Lottie from 'react-lottie-player';

import Button from '@/_components/button';
import Modal from '@/_components/modal';

import CheckBlack from 'public/assets/lottie/check-black.json';

interface CancelModalProps {
  cancelMode: boolean;
  message: string;
  onClose: (action?: 'close' | 'cancel') => void;
}

function CancelModal({ message, cancelMode, onClose }: CancelModalProps) {
  return (
    <Modal isOpen onClose={onClose}>
      <div className="mb-6 mt-5 flex w-full max-w-[298px] flex-col items-center px-[65px]">
        <Lottie className="size-9" animationData={CheckBlack} play loop={false} />
        <p className="mt-3 leading-[1.6] text-black">{message}</p>
        <div className="mt-[30px] flex gap-2">
          {cancelMode ? (
            <>
              <Button variant="white" onClick={onClose} className="h-[38px] w-20 text-sm font-bold">
                아니오
              </Button>
              <Button variant="black" onClick={() => onClose('cancel')} className="h-[38px] w-20 text-sm font-bold">
                취소하기
              </Button>
            </>
          ) : (
            <Button variant="black" onClick={onClose} className="h-[38px] w-20 text-sm font-bold">
              확인
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CancelModal;
