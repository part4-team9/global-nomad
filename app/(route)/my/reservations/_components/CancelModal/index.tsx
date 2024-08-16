'use client';

import Lottie from 'react-lottie-player';

import { cn } from '@/_utils/classNames';

import Button from '@/_components/button';
import Modal from '@/_components/modal';

import CheckBlack from 'public/assets/lottie/check-black.json';
import Loading from 'public/assets/lottie/loading.json';

interface CancelModalProps {
  isError?: boolean;
  isFirstRender?: boolean;
  isPending?: boolean;
  isSuccess?: boolean;
  message: string;
  onClose: (action?: 'close' | 'cancel' | 'confirm') => void;
}

function CancelModal({ message, isFirstRender, isError, isPending, isSuccess, onClose }: CancelModalProps) {
  return (
    <Modal isOpen onClose={onClose}>
      <div className="relative mb-6 mt-5 flex w-full max-w-[298px] flex-col items-center px-[65px]">
        {(isFirstRender || isSuccess) && <Lottie className="size-9" animationData={CheckBlack} play loop={false} />}

        <p className={cn('mt-3 break-keep text-center leading-[1.6] text-black', isError && 'mt-5')}>{message}</p>
        <div className="mt-[30px] flex gap-2">
          {isFirstRender ? (
            <>
              <Button variant="white" onClick={onClose} className="h-[38px] w-20 text-sm font-bold">
                아니오
              </Button>
              <Button variant="black" onClick={() => onClose('cancel')} className="h-[38px] w-20 text-sm font-bold">
                취소하기
              </Button>
            </>
          ) : (
            <Button variant="black" onClick={() => onClose(isSuccess ? 'confirm' : 'close')} className="h-[38px] w-20 text-sm font-bold">
              확인
            </Button>
          )}
        </div>
        {isPending && (
          <div className="absolute z-[1] flex size-full items-center justify-center bg-[rgba(255,255,255,0.95)]">
            <Lottie className="size-20" animationData={Loading} play />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CancelModal;
