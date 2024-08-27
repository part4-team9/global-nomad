import Carousel from '@/_components/Carousel';

/**
 * Banner 컴포넌트 입니다.
 */

export default function Banner() {
  return (
    <div className="relative h-[240px] w-full mobile:h-[540px]">
      <Carousel />
    </div>
  );
}
