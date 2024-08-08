import NoReservation from '@/_components/no-reservation';

import CancelModal from '../cancel-modal';

function ReservationContainer() {
  return (
    <>
      {/* reservation list */}
      <NoReservation />
      <CancelModal />
    </>
  );
}

export default ReservationContainer;
