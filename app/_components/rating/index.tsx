import Image from 'next/image';

import starSvg from 'public/assets/icons/star.svg';

// 나중에 main page 하시는 분이 api 연결하시고 수정 해주시면 될 것 같습니다!

interface RatingProps {
  use: 'hot' | 'all' | 'detail' | 'manage';
}

/**
 * @property {object} item - 체험 리스트 조회 값 중 하나
 * @property {string} use - 인기 체험: hot, 모든 체험: all, 체험 상세: detail, 체험 관리: manage
 */

export default function Rating({ /* item, */ use = 'manage' }: RatingProps) {
  const item = {
    // 예시 (데이터 연결시 삭제!)
    rating: 4.75,
    reviewCount: 352,
  };

  let ratingClass = '';
  let reviewClass = '';
  let detailClass = '';
  let manageClass = '';

  switch (use) {
    case 'hot':
      ratingClass = 'text-m font-[600] leading-[24px] text-white bg-black';
      break;
    case 'all':
      ratingClass = 'flex items-center gap-[2px] text-base font-[500] leading-[26px] text-black';
      reviewClass = 'text-gray-500';
      break;
    case 'detail':
      detailClass = 'text-m font-[400] leading-[24px]';
      break;
    default:
      manageClass = 'text-base leading-[19px]';
  }

  return (
    <div className="flex items-center gap-[5px]">
      <Image src={starSvg} className="h-[20px] w-[20px] mobile:h-[18px] mobile:w-[18px]" alt="rating" />
      <div className={`${ratingClass} ${detailClass} ${manageClass}`}>
        {item.rating.toFixed(1)}
        <span className={`${reviewClass}`}> ({item.reviewCount})</span>
      </div>
    </div>
  );
}
