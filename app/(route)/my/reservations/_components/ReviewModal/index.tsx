'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import usePostReview from '@/_hooks/my-reservations/usePostReview';

import Button from '../../../../../_components/button';
import Modal from '../../../../../_components/modal';
import Textarea from '../../../../../_components/Textarea';
import ReviewCardFrame from '../ReviewCardFrame';

import Star from 'public/assets/icons/star.svg';
import Xbtn from 'public/assets/icons/x-btn.svg';

interface ReviewModalProps {
  bannerImageUrl: string;
  closeModal: () => void;
  date: string;
  endTime: string;
  headCount: number;
  isOpen: boolean;
  reservationId: number;
  startTime: string;
  title: string;
  totalPrice: number;
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

export default function ReviewModal({
  isOpen,
  closeModal,
  title,
  bannerImageUrl,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  reservationId,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const { mutate } = usePostReview();

  const handleStarClick = (clicked: number) => {
    setRating(clicked);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating && reviewText) {
      mutate({
        reservationId,
        rating,
        content: reviewText,
      });
      setErrMessage(null);
    } else {
      setErrMessage('별점과 후기를 모두 작성해 주세요.');
    }
  };

  return (
    <Modal isOpen={isOpen} size="full" onClose={closeModal}>
      <div className="mobile:max-h-[calc(100dvh-40px)]">
        <div className="box-border flex w-dvw flex-col justify-center gap-6 px-4 pb-[45px] pt-6 mobile:max-w-[480px] mobile:gap-10 mobile:px-6 mobile:pt-7">
          <div className="flex items-center justify-between px-2 mobile:px-0">
            <span className="text-[28px] font-bold leading-6.5">후기 작성</span>
            <Image src={Xbtn} alt="닫기" className="cursor-pointer" onClick={closeModal} />
          </div>
          <div className="scrollbar-hide grid max-h-[calc(100dvh-128px)] gap-8 overflow-y-auto mobile:max-h-[calc(100dvh-190px)] mobile:gap-12">
            <ReviewCardFrame
              title={title}
              bannerImageUrl={bannerImageUrl}
              date={date}
              startTime={startTime}
              endTime={endTime}
              headCount={headCount}
              totalPrice={totalPrice}
            />
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <div key={id} onClick={() => handleStarClick(id)} className="cursor-pointer">
                  <Image src={Star} alt={id <= rating ? '노란 별' : '빈 별'} width={56} height={56} className={id <= rating ? '' : 'grayscale'} />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Textarea value={reviewText} onChange={handleReviewChange} size="small" placeholder="후기를 작성해 주세요" />
                {errMessage && <span className="mx-auto text-md text-red-500">{errMessage}</span>}
              </div>
              <Button type="submit" variant="black" className="h-14 w-full text-lg">
                작성하기
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
