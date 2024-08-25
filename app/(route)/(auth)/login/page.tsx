import Link from 'next/link';

import SocialLogin from '@/_components/SocialAuth/SocialLogin';

import LogInForm from './_components/log-in-form';

function LogIn() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center">
        <LogInForm />
        <nav className="mt-[23px]">
          <span className="text-base font-normal leading-5">회원이 아니신가요? </span>
          <Link href="/signup" className="cursor-pointer text-green-200 underline">
            회원가입하기
          </Link>
        </nav>
      </div>
      <SocialLogin />
    </div>
  );
}

export default LogIn;
