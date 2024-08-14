/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { forwardRef, useCallback, useState } from 'react';
import Image from 'next/image';

import EyeOffIcon from 'public/assets/icons/eye-off.svg';
import EyeOnIcon from 'public/assets/icons/eye-on.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요) */
  error?: boolean;
  /** input 밑에 보여줄 에러 메세지 */
  errorMessage?: string;
}

export default forwardRef(function Input({ type, error, errorMessage, ...rest }: InputProps, ref: React.LegacyRef<HTMLInputElement>) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const isPassword = type === 'password';
  const newType = passwordToggle && isPassword ? 'text' : type;

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = useCallback(() => {
    setPasswordToggle((prev) => !prev);
  }, []);

  // 유효성 체크 여부에 따른 border style 변경
  const inputStatusClass = error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-green-200';

  return (
    <div className="grid">
      <div className="relative">
        <input
          type={newType}
          className={`leading-1.6 w-full rounded border border-solid py-4 pl-5 ${isPassword ? 'pr-[54px]' : 'pr-5'} text-black outline-none placeholder:text-gray-500 ${inputStatusClass}`}
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