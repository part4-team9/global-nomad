import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import ReservationsLayout from './_components/reservations-layout';

function MyReservations() {
  return (
    <CommonLayout>
      <StickyLayout>
        <ReservationsLayout />
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
