import type { Address } from 'react-daum-postcode';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Image from 'next/image';

import Modal from '../../../../../_components/modal';

import CloseBtn from 'public/assets/icons/close.svg';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (key: string, address: string) => void;
}

function AddressModal({ isOpen, onClose, onComplete }: AddressModalProps) {
  const onCompletePost = (data: Address) => {
    const { address } = data;
    onComplete('address', address);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="grid gap-4 px-5 py-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px]">주소 검색</h3>
            <button type="button" onClick={onClose}>
              <Image src={CloseBtn} alt="닫기" />
            </button>
          </div>
          <DaumPostcodeEmbed onComplete={onCompletePost} />
        </div>
      </Modal>
    </div>
  );
}

export default AddressModal;