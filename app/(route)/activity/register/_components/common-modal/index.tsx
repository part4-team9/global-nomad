import Button from '@/_components/button';
import type { ModalProps } from '@/_components/modal';
import Modal from '@/_components/modal';

function CommonModal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[250px] w-[540px] max-w-[calc(100vw-48px)] items-end p-7">
        <div className="grid w-full gap-[45px]">
          <span className="text-center text-lg font-medium text-[#333236]">{children}</span>
          <Button className="ml-auto h-[48px] w-[120px] font-medium" variant="black" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CommonModal;
