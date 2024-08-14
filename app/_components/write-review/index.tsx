import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import { useModal } from '@/_hooks/useModal';

import Button from '../button';
import Modal from '../modal';
import Textarea from '../textarea';

import Star from 'public/assets/icons/star.svg';
import Xbtn from 'public/assets/icons/x-btn.svg';

export default function WriteReview() {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const { isOpen, openModal, closeModal } = useModal();

  const handleStarClick = (clicked: number) => {
    setRating(clicked);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating && reviewText) {
      console.log('제출 성공');
    } else {
      console.log('별점과 후기를 모두 작성해 주세요.');
    }
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        모달 열기
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex w-dvw flex-col gap-9 px-6 pb-[41px] pt-[23px] mobile:max-w-[480px]">
          <div className="flex items-center justify-between">
            <span className="text-[28px] font-bold leading-[26px] mobile:text-2xl">후기 작성</span>
            <Image src={Xbtn} alt="닫기" className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-8 mobile:gap-12">
            <div>카드 프레임 넣을거에요</div>
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
