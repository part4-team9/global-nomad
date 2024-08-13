import Link from 'next/link';

export default function GuestHeader() {
  return (
    <div className="flex gap-[25px] text-m items-center">
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </div>
  );
}
