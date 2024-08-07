'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import type { SubImage } from '@/_apis/activities/getActivity';

import DeleteIcon from 'public/assets/icons/delete.svg';
import PlusIcon from 'public/assets/icons/plus.svg';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  editImages?: SubImage[];
  error?: boolean;
  errorMessage?: string;
  images?: string[];
  onClear: (image: string, id?: number) => void;
}

/**
 * input file type 컴포넌트
 * @param images 이미지 미리보기
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage 배너 이미지 미등록시 보여줄 에러 텍스트
 * @param onClear 삭제 버튼 클릭 이벤트 함수
 */
export default forwardRef(function FileInput(
  { images, editImages, error, errorMessage, onClear, ...rest }: FileInputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  // 유효성 체크 여부에 따른 border style 변경
  const inputStatusClass = error ? 'border-red-500 focus:border-red-500' : 'border-gray-700';

  return (
    <div className="grid">
      <div className="flex flex-wrap items-center gap-2 tablet:gap-4 lg:gap-6">
        <div
          className={`relative flex aspect-square w-[calc((100%-8px)/2)] flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed p-2 tablet:w-[calc((100%-16px)/2)] lg:w-[calc((100%-72px)/4)] ${inputStatusClass}`}
        >
          <Image src={PlusIcon} alt="등록" />
          <span className="text-xl leading-[1.1] text-gray-700">이미지 등록</span>
          <input type="file" ref={ref} {...rest} className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0" />
        </div>
        {images?.map((image, idx) => (
          <div key={idx} className="relative aspect-square w-[calc((100%-8px)/2)] rounded-xl tablet:w-[calc((100%-16px)/2)] lg:w-[calc((100%-72px)/4)]">
            <Image fill sizes="max-width:100%" src={image} alt="이미지 미리보기" priority style={{ objectFit: 'contain', borderRadius: '12px' }} />
            <button type="button" onClick={() => onClear(image)} className="absolute -right-2 -top-2 h-6 w-6 lg:-right-5 lg:-top-5 lg:h-10 lg:w-10">
              <Image src={DeleteIcon} alt="삭제" />
            </button>
          </div>
        ))}
        {editImages?.map((image, idx) => (
          <div key={idx} className="relative aspect-square w-[calc((100%-8px)/2)] rounded-xl tablet:w-[calc((100%-16px)/2)] lg:w-[calc((100%-72px)/4)]">
            <Image fill sizes="max-width:100%" src={image.imageUrl} alt="이미지 미리보기" priority style={{ objectFit: 'contain', borderRadius: '12px' }} />
            <button
              type="button"
              onClick={() => onClear(image.imageUrl, image?.id)}
              className="absolute -right-2 -top-2 h-6 w-6 lg:-right-5 lg:-top-5 lg:h-10 lg:w-10"
            >
              <Image src={DeleteIcon} alt="삭제" />
            </button>
          </div>
        ))}
      </div>
      {error && errorMessage && <span className="mt-2 block pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
    </div>
  );
});
