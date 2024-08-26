'use client';

import Button from '@/_components/button';

interface ReservationSummaryProps {
  handleReservation: () => Promise<void>;
  peopleCount: number;
  selectedDate: string | null;
  selectedTime: string | null;
  totalPrice: number;
}

export default function ReservationSummary({ handleReservation, selectedDate, selectedTime, peopleCount, totalPrice }: ReservationSummaryProps) {
  return (
    <>
      <div className="px-[24px] tablet:px-0">
        <Button
          variant="black"
          className="my-[24px] h-[56px] w-full rounded font-bold"
          onClick={handleReservation}
          disabled={!selectedDate || !selectedTime || peopleCount <= 0}
        >
          예약하기
        </Button>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 px-[24px] py-[16px] tablet:px-0">
        <h3 className="text-xl font-bold text-black">총 합계</h3>
        <p className="text-xl font-bold">₩{totalPrice.toLocaleString()}</p>
      </div>
    </>
  );
}
