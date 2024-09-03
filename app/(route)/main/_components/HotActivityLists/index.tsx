import HotListsCarousel from './HotListsCarousel';

/**
 * 인기 체험 리스트 컴포넌트 입니다.
 */

export default function HotActivityLists() {
  return (
    <div className="relative flex flex-col py-0 font-bold mobile:py-2">
      <div className="mb-2 max-w-fit text-2xl mobile:mb-4 mobile:text-[36px] mobile:leading-[43px]">🔥 인기 체험</div>
      <HotListsCarousel />
    </div>
  );
}
