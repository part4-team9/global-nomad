import Link from 'next/link';

import LogInForm from './_components/LogInForm';

function LogIn() {
  return (
    <>
      <LogInForm />
      <nav className="mt-[23px]">
        <span className="text-base font-normal leading-5">회원이 아니신가요? </span>
        <Link href="/signup" className="cursor-pointer text-green-200 underline">
          회원가입하기
        </Link>
      </nav>
    </>
  );
}

export default LogIn;
