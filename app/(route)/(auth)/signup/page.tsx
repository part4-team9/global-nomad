import Link from 'next/link';

import SocialSignup from '@/_components/SocialAuth/SocialSignup';

import SignUpForm from './_components/sign-up-form';

function SignUP() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center">
        <SignUpForm />
        <nav className="mt-[23px]">
          <span className="text-base font-normal leading-5">회원이신가요? </span>
          <Link href="/login" className="cursor-pointer text-green-200 underline">
            로그인하기
          </Link>
        </nav>
      </div>
      <SocialSignup />
    </div>
  );
}

export default SignUP;
