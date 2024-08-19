import StickyLayout from './_components/side-sticky-layout';

export default function Home() {
  return (
    <main>
      <StickyLayout />
      <a href='/reservation-status'>예약 현황 이동</a>
    </main>
  );
}
