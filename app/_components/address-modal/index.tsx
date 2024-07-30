import type { Address } from 'react-daum-postcode';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Modal from '../modal';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (address: string) => void;
}

function AddressModal({ isOpen, onClose, onComplete }: AddressModalProps) {
  const onCompletePost = (data: Address) => {
    const { address } = data;
    console.log(address, 'address');
    onComplete(address);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="grid gap-4 p-7">
          <h3>주소 검색</h3>
          <DaumPostcodeEmbed onComplete={onCompletePost} />
        </div>
      </Modal>
    </div>
  );
}

export default AddressModal;
