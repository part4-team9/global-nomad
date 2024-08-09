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

/**
 * 다음 우편번호 서비스를 이용한 주소 검색 모달입니다
 * @param isOpen modal 오픈 boolean 값
 * @param onClose modal close 하는 함수
 * @param onComplete 주소 선택시 주소 데이터 받아서 form에 저장하는 함수
 */
function AddressModal({ isOpen, onClose, onComplete }: AddressModalProps) {
  const onCompletePost = (data: Address) => {
    const { address } = data;
    onComplete('address', address);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="grid gap-4 px-5 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px]">주소 검색</h3>
          <button type="button" onClick={onClose}>
            <Image src={CloseBtn} alt="닫기" />
          </button>
        </div>
        <DaumPostcodeEmbed style={{ height: 'calc(100dvh - 94px)', maxHeight: '466px' }} onComplete={onCompletePost} />
      </div>
    </Modal>
  );
}

export default AddressModal;
