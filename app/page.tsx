import NoticeCalender from './_components/calendar-notice';
import StickyLayout from './_components/side-sticky-layout';
import SideUserProfileCard from './_components/side-user-profile-card';

export default function Home() {
  return (
    <main>
      <StickyLayout />
      <a href="/my">마이페이지 이동</a>
    </main>
  );
}
