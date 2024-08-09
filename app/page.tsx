import NoticeCalender from './_components/calendar-notice';
import SideUserProfileCard from './_components/side-user-profile-card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SideUserProfileCard />
      <a href="/my">마이페이지 이동</a>
    </main>
  );
}
