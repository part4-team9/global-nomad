'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import eyeOffIcon from 'public/assets/icons/eye-off.svg';
import eyeOnIcon from 'public/assets/icons/eye-on.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Input 공통 컴포넌트
 * @error 로그인, 회원가입에서 유효성 검사 실패했을 때 true 전달 아니라면 false (기본값 false 설정 필요)
 * @returns
 */
function Input({ id, type, placeholder, error }: InputProps) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [newType, setNewType] = useState(type);
  let inputStatusClass;

  // 유효성 체크 여부에 따른 border style 변경
  if (error) {
    inputStatusClass = `border-red-500 focus:border-red-500`;
  } else {
    inputStatusClass = `border-gray-500 focus:border-green-200`;
  }

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = () => {
    setPasswordToggle(!passwordToggle);
  };

  useEffect(() => {
    if (passwordToggle) {
      setNewType('text');
    } else {
      setNewType('password');
    }
  }, [passwordToggle]);

  return (
    <div className="relative">
      <input
        id={id}
        type={newType}
        placeholder={placeholder}
        className={`leading-1.6 w-full rounded-md border border-solid py-4 pl-5 ${type === 'password' ? 'pr-[54px]' : 'pr-5'} text-black outline-none placeholder:text-gray-500 ${inputStatusClass}`}
      />
      {type === 'password' && (
        <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2" onClick={handlePasswordToggle}>
          {passwordToggle ? <Image src={eyeOnIcon} alt="비밀번호 보기" /> : <Image src={eyeOffIcon} alt="비밀번호 보기" />}
        </button>
      )}
    </div>
  );
}

export default Input;
