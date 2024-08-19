import Button from '@/_components/button';
import Modal from '@/_components/modal';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

/**
 * 내 정보 수정 페이지에서 공통으로 사용하는 모달입니다.
 */
function CommonModal({ message, isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[220px] w-[540px] max-w-[calc(100vw-48px)] items-end p-7 tablet:h-[250px]">
        <div className="grid w-full gap-12 tablet:gap-[45px]">
          <span className="break-keep text-center text-2lg font-medium text-[#333236]">{message}</span>
          <Button
            borderRadius="8px"
            className="mx-auto h-[42px] w-[138px] font-medium tablet:ml-auto tablet:mr-0 tablet:h-[48px] tablet:w-[120px]"
            variant="black"
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CommonModal;
