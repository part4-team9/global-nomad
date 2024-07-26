import Link from "next/link";

export function HeaderNotLogin() {
  return (
    <>
      <section className='text-m flex gap-[25px]'>
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </section>
    </>
  );
}
