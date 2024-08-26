'use client';

import { useState } from 'react';
import Image from 'next/image';
import DefaultProfileImage from 'public/assets/images/default-profile.png';
import Pagination from '@/(route)/main/_components/Pagination';

import Start from 'public/assets/icons/star.svg';

interface Review {
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
}

interface ReviewSectionProps {
  averageRating: number;
  getSatisfactionLabel: (rating: number) => string;
  reviews: Review[];
  totalReviews: number;
}

export default function Reviews({ averageRating, reviews, totalReviews, getSatisfactionLabel }: ReviewSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="mb-[24px] border-t pt-[40px]" style={{ borderColor: 'rgba(17, 34, 17, 0.25)', borderTopWidth: '1px' }}>
      <div className="px-[24px] tablet:px-0">
        <div className="mb-[24px] text-2lg font-bold text-nomad-black">후기</div>
        <div className="mb-[24px] flex gap-[16px]">
          <div className="text-[50px] font-[600]">{averageRating.toFixed(1)}</div>
          <div className="flex flex-col justify-center text-nomad-black">
            <div>{getSatisfactionLabel(averageRating)}</div>
            <div className="flex items-center gap-[6px]">
              <Image src={Start} alt="별" />
              {totalReviews}개 후기
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[72px] space-y-[24px]">
        {currentReviews.map((review, index) => (
          <div
            key={review.id}
            className={`flex gap-[16px] px-[24px] pb-[24px] tablet:px-0 ${index !== currentReviews.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div>
              <Image
                src={review.user.profileImageUrl || DefaultProfileImage}
                alt={`${review.user.nickname} 프로필 이미지`}
                width={45}
                height={45}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-start">
              <div className="my-[4px] flex items-center">
                <p className="text-lg font-bold text-nomad-black">{review.user.nickname}</p>
                <span className="mx-2 text-black">|</span>
                <p className="text-lg text-gray-500">
                  {new Date(review.createdAt)
                    .toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })
                    .replace(/\//g, '. ')}
                </p>
              </div>
              <p className="text-lg text-nomad-black">{review.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Pagination totalCount={reviews.length} itemsInPage={reviewsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
}
