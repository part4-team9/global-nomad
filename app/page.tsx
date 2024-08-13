import NoticeCalender from './_components/calendar-notice';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <NoticeCalender /> */}
      {/* <a href='/my'>마이페이지 이동</a> */}
      <a href='/reservation-status'>예약 현황 이동</a>
    </main>
  );
}
