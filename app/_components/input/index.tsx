'use client';

import { useState } from 'react';
import Image from 'next/image';

import EyeOffIcon from 'public/assets/icons/eye-off.svg';
import EyeOnIcon from 'public/assets/icons/eye-on.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Input 공통 컴포넌트
 * @error 로그인, 회원가입에서 유효성 검사 실패했을 때 true 전달 아니라면 false (기본값 false 설정 필요)
 */
function Input({ type, error, ...rest }: InputProps) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const isPassword = type === 'password';
  const newType = passwordToggle && isPassword ? 'text' : type;

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = () => {
    setPasswordToggle(!passwordToggle);
  };

  // 유효성 체크 여부에 따른 border style 변경
  const inputStatusClass = error ? 'border-red-500 focus:border-red-500' : 'border-gray-500 focus:border-green-200';

  return (
    <div className="relative">
      <input
        type={newType}
        className={`leading-1.6 w-full rounded border border-solid py-4 pl-5 ${type === 'password' ? 'pr-[54px]' : 'pr-5'} text-black outline-none placeholder:text-gray-500 ${inputStatusClass}`}
        {...rest}
      />
      {type === 'password' && (
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
  );
}

export default Input;
