import Image from 'next/image';

import starSvg from 'public/assets/icons/star.svg';

// 나중에 main page 하시는 분이 api 연결하시고 수정 해주시면 될 것 같습니다!

interface RatingProps {
  rating: number;
  reviewCount: number;
  use: 'hot' | 'all' | 'detail' | 'manage';
}

/**
 * Rating 컴포넌트 입니다.
 * @param {number} rating - 점수 값 입니다.
 * @param {number} reviewCount - 리뷰 갯수 입니다.
 * @property {string} use - 인기 체험: hot, 모든 체험: all, 체험 상세: detail, 체험 관리: manage
 */

export default function Rating({ rating, reviewCount, use = 'manage' }: RatingProps) {
  let ratingClass = '';
  let reviewClass = '';

  switch (use) {
    case 'hot':
      ratingClass = 'text-m font-semibold leading-6 text-white bg-black';
      break;
    case 'all':
      ratingClass = 'flex items-center gap-0.5 text-base font-medium leading-6 text-black';
      reviewClass = 'text-gray-500';
      break;
    case 'detail':
      ratingClass = 'text-m font-normal leading-6';
      break;
    default:
      ratingClass = 'text-base leading-5';
  }

  return (
    <div className="flex items-center gap-[5px]">
      <Image src={starSvg} className="h-[20px] w-[20px] mobile:h-[18px] mobile:w-[18px]" alt="rating" />
      <div className={`${ratingClass}`}>
        {rating.toFixed(1)}
        <span className={`${reviewClass}`}> ({reviewCount})</span>
      </div>
    </div>
  );
}
