import Button from '@/_components/button';

/**
 * ReviewButton 컴포넌트
 *
 * 체험 완료된 항목의 경우 리뷰를 작성할 수 있도록 후기 작성 버튼을 렌더링합니다.
 * @TODO 후기 작성 컴포넌트 연동 필요
 */
function ReviewButton({ id }: { id: number }) {
  return (
    <Button
      type="button"
      variant="black"
      borderRadius="6px"
      // onClick={}
      className="h-8 w-20 text-sm tablet:h-[42px] tablet:w-[144px] mobile:h-10 mobile:w-28 mobile:text-base mobile:leading-[1.6]"
    >
      후기 작성
    </Button>
  );
}

export default ReviewButton;
