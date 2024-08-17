import Modal from '@/_components/modal';

interface ReviewModalProps {
  bannerImageUrl: string;
  closeModal: () => void;
  date: string;
  endTime: string;
  headCount: number;
  isOpen: boolean;
  reservationId: number;
  startTime: string;
  title: string;
  totalPrice: number;
}

/**
 * ReviewModal 컴포넌트
 *
 * 사용자가 체험 완료한 예약 건에 대해 후기를 작성할 수 있는 모달 컴포넌트입니다.
 */
function ReviewModal({ isOpen, closeModal, title, bannerImageUrl, date, startTime, endTime, headCount, totalPrice, reservationId }: ReviewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div>리뷰 모달</div>
    </Modal>
  );
}

export default ReviewModal;
