import Image from 'next/image';
import MockImg from 'public/assets/images/default-profile.png';

interface ReviewCardFrameProps {
  bannerImageUrl: string;
  date: string;
  endTime: string;
  headCount: number;
  startTime: string;
  title: string;
  totalPrice: number;
}

/**
 * 카드 프레임 컴포넌트 입니다.
 * @param {string} title - 체험 타이틀 입니다.
 * @param {string} bannerImageUrl - 체험 사진경로 입니다.
 * @param {string} date - 체험 날짜 입니다.
 * @param {string} startTime 체험시작 시간 입니다.
 * @param {string} endTime 체험종료 시간 입니다.
 * @param {number} headCount - 체험 인원수 입니다.
 * @param {number} totalPrice - 체험 가격 입니다.
 */

const formatPrice = (totalPrice: number) => totalPrice.toLocaleString('ko-KR');

const formatDate = (date: string) => {
  const formatDate = new Date(date);
  return `${formatDate.getFullYear()}. ${formatDate.getMonth() + 1}. ${formatDate.getDate()}`;
};

const formatTimeRange = (startTime: string, endTime: string): string => {
  const formatTime = (date: Date) => date.toISOString().slice(11, 16);
  return `${formatTime(new Date(startTime))} - ${formatTime(new Date(endTime))}`;
};

export default function ReviewCardFrame({ title, bannerImageUrl, date, startTime, endTime, headCount, totalPrice }: ReviewCardFrameProps) {
  return (
    <div className="flex gap-2 mobile:gap-6">
      <div className="mobiel:max-w-[126px] max-h-[100px] max-w-[100px] overflow-hidden mobile:max-h-[126px] mobile:py-[5.5px]">
        <Image src={MockImg} alt={`${title} 사진`} className="aspect-square rounded-xl transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>
      <div className="flex w-full flex-col gap-1.5 font-bold">
        <span className="break-keep text-lg mobile:text-xl">{title}</span>
        <div className="flex gap-0.5 text-md font-regular mobile:gap-2 mobile:text-2lg">
          <span>{formatDate(date)}</span>
          <span>·</span>
          <span>{formatTimeRange(startTime, endTime)}</span>
          <span>·</span>
          <span>{headCount}명</span>
        </div>
        <div className="h-[1px] w-full bg-nomad-black opacity-10" />
        <span className="text-xl mobile:text-3xl">₩{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
