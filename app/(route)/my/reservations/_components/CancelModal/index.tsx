import Lottie from 'react-lottie-player';

import Button from '@/_components/button';
import Modal from '@/_components/modal';

import CheckAnimation from 'public/assets/lottie/check-animation.json';

function CancelModal() {
  return (
    <Modal
      isOpen
      onClose={() => {
        console.log('aa');
      }}
    >
      <div className="mb-6 mt-5 flex w-full max-w-[298px] flex-col items-center px-[65px]">
        <Lottie className="h-9 w-9" animationData={CheckAnimation} play loop={false} />
        <p className="mt-3 leading-[1.6] text-black">예약을 취소하시겠어요?</p>
        <div className="mt-[30px] flex gap-2">
          <Button variant="white" className="h-[38px] w-20 text-sm font-bold">
            아니오
          </Button>
          <Button variant="black" className="h-[38px] w-20 text-sm font-bold">
            취소하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CancelModal;
