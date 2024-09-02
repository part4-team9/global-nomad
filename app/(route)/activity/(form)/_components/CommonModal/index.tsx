import Button from '@/_components/Button';
import Modal from '@/_components/Modal';

interface CommonModalProps {
  activeCloseModal: () => void;
  children: React.ReactNode;
  isOpen: boolean;
}

/**
 * 체험 등록, 수정 페이지에서 공통으로 사용하는 모달입니다.
 */
function CommonModal({ isOpen, activeCloseModal, children }: CommonModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={activeCloseModal}>
      <div className="flex h-[220px] w-[540px] max-w-[calc(100vw-48px)] items-end p-7 tablet:h-[250px]">
        <div className="grid w-full gap-12 tablet:gap-[45px]">
          <span className="break-keep text-center text-2lg font-medium text-[#333236]">{children}</span>
          <Button
            borderRadius="8px"
            className="mx-auto h-[42px] w-[138px] font-medium tablet:ml-auto tablet:mr-0 tablet:h-[48px] tablet:w-[120px]"
            variant="black"
            onClick={activeCloseModal}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CommonModal;
