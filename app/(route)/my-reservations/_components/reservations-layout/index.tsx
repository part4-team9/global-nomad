// api 세팅

'use client';

import Image from 'next/image';

import EmptyIcon from 'public/assets/icons/empty.svg';

function ReservationsLayout() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="break-keep text-3xl font-bold leading-[1.3] text-black">예약 내역</h1>
        {/* filter dropdown */}
      </div>
      {/* reservation list */}
      {/* empty message */}
      <section className="grid gap-3 pt-[60px] tablet:gap-5 tablet:pt-[86px]">
        <div className="mx-auto aspect-square w-full max-w-[200px] tablet:max-w-60">
          <Image src={EmptyIcon} alt="예약 내역 없음" />
        </div>
        <p className="break-keep text-center text-xl font-medium leading-[1.2] text-gray-600">아직 등록한 체험이 없어요</p>
      </section>
    </>
  );
}

export default ReservationsLayout;
