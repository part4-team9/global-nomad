import { forwardRef } from 'react';
import Image from 'next/image';

import DeleteIcon from 'public/assets/icons/delete.svg';
import PlusIcon from 'public/assets/icons/plus.svg';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

/**
 * input file type 컴포넌트
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage 배너 이미지 미등록시 보여줄 에러 텍스트
 */
export default forwardRef(function FileInput({ error, errorMessage, ...rest }: FileInputProps, ref: React.LegacyRef<HTMLInputElement>) {
  // 유효성 체크 여부에 따른 border style 변경
  const inputStatusClass = error ? 'border-red-500 focus:border-red-500' : 'border-gray-700';

  return (
    <div className="grid">
      <div className="flex items-center gap-2 tablet:gap-6">
        <div
          className={`relative flex aspect-square w-1/2 flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed tablet:w-1/4 ${inputStatusClass}`}
        >
          <Image src={PlusIcon} alt="등록" />
          <span>이미지 등록</span>
          <input id="banner" type="file" ref={ref} {...rest} className="absolute left-0 top-0 h-full w-full opacity-0" />
        </div>
        <div className="relative aspect-square w-1/2 rounded-xl bg-slate-400 tablet:w-1/4">
          <button type="button" className="absolute -right-5 -top-5 h-10 w-10">
            <Image src={DeleteIcon} alt="삭제" />
          </button>
        </div>
      </div>
      {error && errorMessage && <span className="mt-2 block pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
    </div>
  );
});
