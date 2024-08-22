'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

import type { SubImage } from '@/_types/activities/formTypes';

import DeleteIcon from 'public/assets/icons/delete.svg';
import PlusIcon from 'public/assets/icons/plus.svg';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  editImages?: SubImage[];
  images?: string[];
  onClear: (image: string, id?: number) => void;
}

/**
 * input file type 컴포넌트
 *
 * @param images 이미지 미리보기
 * @param onClear 삭제 버튼 클릭 이벤트 함수
 */
export default forwardRef(function FileInput({ images, editImages, onClear, ...rest }: FileInputProps, ref: React.LegacyRef<HTMLInputElement>) {
  return (
    <div className="grid">
      <div className="flex flex-wrap items-center gap-2 tablet:gap-4 pc:gap-6">
        <div className="relative flex aspect-square w-[calc((100%-8px)/2)] flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed border-gray-700 p-2 tablet:w-[calc((100%-16px)/2)] pc:w-[calc((100%-72px)/4)]">
          <Image src={PlusIcon} alt="등록" />
          <span className="text-center text-xl leading-[1.1] text-gray-700">이미지 등록</span>
          <input type="file" ref={ref} {...rest} className="absolute left-0 top-0 size-full cursor-pointer opacity-0" />
        </div>
        {images?.map((image, idx) => (
          <div key={idx} className="relative aspect-square w-[calc((100%-8px)/2)] rounded-xl tablet:w-[calc((100%-16px)/2)] pc:w-[calc((100%-72px)/4)]">
            <Image fill sizes="max-width:100%" src={image} alt="이미지 미리보기" priority style={{ objectFit: 'contain', borderRadius: '12px' }} />
            <button type="button" onClick={() => onClear(image)} className="absolute -right-2 -top-2 size-6 pc:-right-5 pc:-top-5 pc:size-10">
              <Image src={DeleteIcon} alt="삭제" />
            </button>
          </div>
        ))}
        {editImages?.map((image, idx) => (
          <div key={idx} className="relative aspect-square w-[calc((100%-8px)/2)] rounded-xl tablet:w-[calc((100%-16px)/2)] pc:w-[calc((100%-72px)/4)]">
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
