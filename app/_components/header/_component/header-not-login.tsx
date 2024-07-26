import Link from "next/link";

export function HeaderNotLogin() {
  return (
    <>
      <div className='text-m flex gap-[25px] pt-1'>
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </>
  );
}
