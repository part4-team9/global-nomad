'use client';

import Image from 'next/image';

import google from 'public/assets/icons/logo-google.svg';
import kakao from 'public/assets/icons/logo-kakao.svg';

export default function SocialSignup() {
  return (
    <div className="flex w-full flex-col items-center gap-6 px-3 mobile:gap-10">
      <div className="flex w-full items-center justify-between">
        <div className="h-px w-20 bg-gray-200 mobile:w-[180px]" />
        <div className="text-md text-gray-600 mobile:text-lg">SNS 계정으로 회원가입하기</div>
        <div className="h-px w-20 bg-gray-200 mobile:w-[180px]" />
      </div>
      <div className="flex gap-4">
        <button type="button" className="focus:outline-none">
          <Image src={google} alt="구글 로그인" width={72} height={72} className="size-12 mobile:size-16 tablet:size-[78px]" />
        </button>
        <button type="button" className="focus:outline-none">
          <Image src={kakao} alt="카카오 로그인" width={72} height={72} className="size-12 mobile:size-16 tablet:size-[78px]" />
        </button>
      </div>
    </div>
  );
}
