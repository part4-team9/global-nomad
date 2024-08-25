import Image from 'next/image';
import MoveLeftIcon from 'public/assets/icons/move-left.svg';
import MoveRightIcon from 'public/assets/icons/move-right.svg';

interface ImageSliderProps {
  allImages: string[];
  currentImageIndex: number;
  handlePrevImage: () => void;
  handleNextImage: () => void;
  isMobile: boolean;
}

export default function ImageSlider({ allImages, currentImageIndex, handlePrevImage, handleNextImage, isMobile }: ImageSliderProps) {
  return (
    <>
      {isMobile ? (
        <div className="relative h-[310px] w-full">
          <img src={allImages[currentImageIndex]} alt={`이미지 ${currentImageIndex + 1}`} className="h-full w-full object-fill" />
          <div onClick={handlePrevImage} className="absolute left-[15px] top-1/2 -translate-y-1/2 transform cursor-pointer">
            <Image src={MoveLeftIcon} alt="왼쪽으로 이동" />
          </div>
          <div onClick={handleNextImage} className="absolute right-[15px] top-1/2 -translate-y-1/2 transform cursor-pointer">
            <Image src={MoveRightIcon} alt="오른쪽으로 이동" />
          </div>
        </div>
      ) : (
        <div className="mb-0 mb-[24px] grid h-[310px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[12px] tablet:mb-[84px] tablet:h-[534px]">
          <img src={allImages[0]} alt="첫 번째 이미지" className="col-span-2 row-span-2 h-full w-full object-fill" />
          {allImages.slice(1).map((img, index) => (
            <img key={index} src={img} alt={`나머지 이미지 ${index + 1}`} className="h-full w-full object-fill" />
          ))}
        </div>
      )}
    </>
  );
}
