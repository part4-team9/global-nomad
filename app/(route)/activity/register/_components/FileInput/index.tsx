'use client';

import { forwardRef } from 'react';
import Lottie from 'react-lottie-player';
import Image from 'next/image';

import type { SubImage } from '@/_types/activities/formTypes';

import DeleteIcon from 'public/assets/icons/delete.svg';
import PlusIcon from 'public/assets/icons/plus.svg';

import Loading from 'public/assets/lottie/loading.json';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  count: number;
  editImages?: SubImage[];
  images?: string[];
  isPending?: boolean;
  onClear: (image: string, id?: number) => void;
}

/**
 * input file type 컴포넌트
 *
 * @param images 이미지 미리보기
 * @param editImages 체험 수정 기존 이미지 배열
 * @param onClear 삭제 버튼 클릭 이벤트 함수
 * @param isPending Post 이미지 isPending 여부
 * @param count 첨부 이미지 개수
 */
export default forwardRef(function FileInput(
  { images, editImages, count, isPending, onClear, ...rest }: FileInputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <div className="grid">
      <div className="grid grid-cols-2 gap-2 tablet:gap-4 pc:grid-cols-4 pc:gap-6">
        <div className="relative flex aspect-square flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed border-gray-700 p-2">
          <Image src={PlusIcon} alt="등록" />
          <span className="text-center text-xl leading-[1.1] text-gray-700">이미지 등록</span>
          <input type="file" ref={ref} {...rest} className="absolute left-0 top-0 size-full cursor-pointer opacity-0" />
        </div>

        {images?.map((image, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl">
            <Image fill sizes="max-width:100%" src={image} alt="이미지 미리보기" priority style={{ objectFit: 'contain', borderRadius: '12px' }} />
            <button type="button" onClick={() => onClear(image)} className="absolute -right-2 -top-2 size-6 pc:-right-5 pc:-top-5 pc:size-10">
              <Image src={DeleteIcon} alt="삭제" />
            </button>
            {isPending}
          </div>
        ))}

        {isPending &&
          Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl">
              <div key={idx} className="absolute z-[1] flex size-full items-center justify-center rounded-xl bg-[rgba(255,255,255,0.4)]">
                <Lottie className="size-20" animationData={Loading} loop play />
              </div>
            </div>
          ))}

        {editImages?.map((image, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl">
            <Image fill sizes="max-width:100%" src={image.imageUrl} alt="이미지 미리보기" priority style={{ objectFit: 'contain', borderRadius: '12px' }} />
            <button
              type="button"
              onClick={() => onClear(image.imageUrl, image?.id)}
              className="absolute -right-2 -top-2 size-6 pc:-right-5 pc:-top-5 pc:size-10"
            >
              <Image src={DeleteIcon} alt="삭제" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
