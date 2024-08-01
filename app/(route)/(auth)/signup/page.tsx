import Link from 'next/link';

import SignUpForm from './_components/sign-up-form';

function SignUP() {
  return (
    <>
      <SignUpForm />
      <nav className="mt-[23px] pb-[100px]">
        <span className="text-instruction text-base font-normal leading-5">회원이신가요?  </span>
        <Link href="/login" className="cursor-pointer text-green-200 underline">
          로그인하기
        </Link>
      </nav>
    </>
  );
}

export default SignUP;
