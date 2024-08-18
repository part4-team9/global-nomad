import Image from 'next/image';

import Rating from '@/_components/rating';

interface ActivityCardProps {
  activity: {
    bannerImageUrl: string;
    id: number;
    price: number;
    rating: number;
    reviewCount: number;
    title: string;
  };
  onClick: () => void;
}

export default function ActivityCard({ activity, onClick }: ActivityCardProps) {
  return (
    <div
      className="relative size-[186px] flex-shrink-0 transform cursor-pointer rounded-[24px] transition-transform duration-300 hover:-translate-y-2 hover:drop-shadow-xl mobile:size-[384px]"
      onClick={onClick}
    >
      <Image
        src={activity.bannerImageUrl}
        alt={activity.title}
        fill
        priority
        style={{ objectFit: 'cover' }}
        sizes="h-[186px] w-[186px]"
        className="rounded-[24px]"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 rounded-[24px]"
        style={{
          background: 'linear-gradient(to top, #1B1B1B, transparent)',
        }}
      />
      <div className="absolute bottom-[24px] left-[20px] right-0 flex flex-col gap-[6px] text-white mobile:gap-[20px]">
        <Rating rating={activity.rating} reviewCount={activity.reviewCount} ratingTarget="hot" />
        <div className="mr-[20px] break-keep text-lg mobile:mr-[113px] mobile:text-[28px] mobile:leading-[42px]">{activity.title}</div>
        <div className="text-md mobile:text-2lg">
          ₩ {activity.price.toLocaleString()}
          <span className="text-md font-regular"> /인</span>
        </div>
      </div>
    </div>
  );
}
