import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import ReservationContainer from './_components/reservation-container';

function MyReservations() {
  return (
    <CommonLayout>
      <StickyLayout>
        <div className="flex items-center justify-between">
          <h1 className="break-keep text-3xl font-bold leading-[1.3] text-black">예약 내역</h1>
          {/* filter dropdown */}
        </div>
        <ReservationContainer />
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
