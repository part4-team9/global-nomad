// api 세팅

import ReservationContainer from '../reservation-container';

function ReservationLayout() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="break-keep text-3xl font-bold leading-[1.3] text-black">예약 내역</h1>
        {/* filter dropdown */}
      </div>
      <ReservationContainer />
    </>
  );
}

export default ReservationLayout;
