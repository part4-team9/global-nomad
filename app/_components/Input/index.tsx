'use client';

import { forwardRef, useCallback, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import EyeOffIcon from 'public/assets/icons/eye-off.svg';
import EyeOnIcon from 'public/assets/icons/eye-on.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * input 공통 컴포넌트
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage input 밑에 보여줄 에러 메세지
 * @param className input 커스텀 className
 */
export default forwardRef(function Input({ type, error, errorMessage, className, ...rest }: InputProps, ref: React.LegacyRef<HTMLInputElement>) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const isPassword = type === 'password';
  const newType = passwordToggle && isPassword ? 'text' : type;

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = useCallback(() => {
    setPasswordToggle((prev) => !prev);
  }, []);

  return (
    <div className="grid">
      <div className="relative">
        <input
          type={newType}
          className={cn([
            `w-full rounded border border-solid px-5 py-4 leading-[1.6] text-black outline-none placeholder:text-gray-500 ${className}`,
            isPassword ? 'pr-[54px]' : 'pr-5',
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-green-200',
          ])}
          ref={ref}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-5 top-1/2 -translate-y-1/2"
            onClick={handlePasswordToggle}
            aria-label={passwordToggle ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <Image src={passwordToggle ? EyeOnIcon : EyeOffIcon} alt={passwordToggle ? '비밀번호 숨기기' : '비밀번호 보기'} />
          </button>
        )}
      </div>
      {error && errorMessage && <span className="mt-2 block pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
    </div>
  );
});
