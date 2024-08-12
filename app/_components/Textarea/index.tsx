'use client';

import { forwardRef } from 'react';

import { cn } from '@/_utils/classNames';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  size: 'small' | 'big';
}

/**
 * Textarea 공통 컴포넌트
 * @param size small: 후기 작성, big: 체험 등록
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage textarea 밑에 보여줄 에러 메세지
 */
export default forwardRef(function Textarea({ size, error, errorMessage, ...rest }: TextareaProps, ref: React.LegacyRef<HTMLTextAreaElement>) {
  return (
    <div className="grid">
      <textarea
        className={cn([
          'h-[346px] w-full resize-none rounded border border-solid border-gray-600 px-4 py-4 leading-[1.6] text-black outline-none placeholder:text-gray-500 focus:border-green-200',
          size === 'small' && 'mobile:h-[240px]',
        ])}
        ref={ref}
        {...rest}
      />
      {error && errorMessage && <span className="mt-2 block pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
    </div>
  );
});
