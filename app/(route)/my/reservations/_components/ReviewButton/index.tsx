import ReviewModal from '@/(route)/my/reservations/_components/ReviewModal';

import type { Reservations } from '@/_types/myReservations';

import { useModal } from '@/_hooks/useModal';

import Button from '@/_components/button';

interface ReviewButtonProps {
  data: Reservations;
  id: number;
}

/**
 * ReviewButton 컴포넌트
 *
 * 체험 완료된 항목의 경우 리뷰를 작성할 수 있도록 후기 작성 버튼을 렌더링합니다.
 * 버튼 클릭 시, 리뷰 작성 모달을 열고 해당 예약 데이터를 모달에 전달합니다.
 */
function ReviewButton({ id, data }: ReviewButtonProps) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button
        type="button"
        variant="black"
        borderRadius="6px"
        onClick={openModal}
        className="h-8 w-20 text-sm mobile:h-10 mobile:w-28 mobile:text-base mobile:leading-[1.6] tablet:h-[42px] tablet:w-[144px]"
      >
        후기 작성
      </Button>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        title={data.activity.title}
        bannerImageUrl={data.activity.bannerImageUrl}
        date={data.date}
        startTime={data.startTime}
        endTime={data.endTime}
        headCount={data.headCount}
        totalPrice={data.totalPrice}
        reservationId={id}
      />
    </>
  );
}

export default ReviewButton;
