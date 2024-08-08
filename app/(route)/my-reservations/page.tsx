import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import ReservationLayout from './_components/reservation-layout';

function MyReservations() {
  return (
    <CommonLayout>
      <StickyLayout>
        <ReservationLayout />
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
