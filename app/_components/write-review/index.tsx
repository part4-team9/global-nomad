'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import usePostReview from '@/_hooks/my-reservations/usePostReview';

import { getCookie } from '@/_utils/cookie';

import ReviewCardFrame from './review-card-frame';
import Button from '../button';
import Modal from '../modal';
import Textarea from '../textarea';

import Star from 'public/assets/icons/star.svg';
import Xbtn from 'public/assets/icons/x-btn.svg';

interface WriteReviewProps {
  closeModal: () => void;
  isOpen: boolean;
}

/**
 * 후기 작성 모달 컴포넌트 입니다.
 * @param {boolean} isOpen - 모달을 열어줍니다.
 * @param {function} closeModal - 모달을 닫아줍니다.
 * @param {string} title - 체험 타이틀 입니다.
 * @param {string} bannerImageUrl - 체험 사진경로 입니다.
 * @param {string} date - 체험 날짜 입니다.
 * @param {string} startTime 체험시작 시간 입니다.
 * @param {string} endTime 체험종료 시간 입니다.
 * @param {number} headCount - 체험 인원수 입니다.
 * @param {number} totalPrice - 체험 가격 입니다.
 * @param {number} reservationId - 리뷰할 체험 고유 값 입니다.
 */

const mockData = [
  {
    title: '함께 배우면 즐거운 스트릿 댄스',
    bannerImageUrl: '',
    date: '2024.08.09',
    startTime: '2024-08-09T14:17:18.923Z',
    endTime: '2024-08-09T20:17:18.923Z',
    headCount: 99,
    totalPrice: 200000000,
    reservationId: 3,
  },
];

export default function WriteReview({ isOpen, closeModal }: WriteReviewProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const { mutate } = usePostReview();

  const handleStarClick = (clicked: number) => {
    setRating(clicked);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getCookie('accessToken'); 

    if (rating && reviewText && token) {
      mutate({
        reservationId: mockData[0].reservationId,
        rating,
        content: reviewText,
        token,
      });
    } else {
      console.log('별점, 후기, 토큰을 모두 작성해 주세요.');
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="box-border flex h-dvh w-dvw flex-col justify-center gap-9 px-6 pb-[41px] pt-[23px] mobile:max-h-[750px] mobile:max-w-[480px]">
          <div className="flex items-center justify-between">
            <span className="text-[28px] font-bold leading-6.5 mobile:text-2xl">후기 작성</span>
            <Image src={Xbtn} alt="닫기" className="cursor-pointer" onClick={closeModal} />
          </div>
          <div className="flex flex-col gap-8 mobile:gap-12">
            {mockData.map((data, idx) => (
              <ReviewCardFrame
                key={idx}
                title={data.title}
                bannerImageUrl={data.bannerImageUrl}
                date={data.date}
                startTime={data.startTime}
                endTime={data.endTime}
                headCount={data.headCount}
                totalPrice={data.totalPrice}
              />
            ))}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <div key={id} onClick={() => handleStarClick(id)} className="cursor-pointer">
                  <Image src={Star} alt={id <= rating ? '노란 별' : '빈 별'} width={56} height={56} className={id <= rating ? '' : 'grayscale'} />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Textarea value={reviewText} onChange={handleReviewChange} size="small" placeholder="후기를 작성해 주세요" />
              <Button type="submit" variant="black" className="h-14 w-full text-lg">
                작성하기
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
