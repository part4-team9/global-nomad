import Image from 'next/image';

enum reservationStatus {
  COMPLETE,
  CANCELLED,
  DECLINED,
  EXPERIENCE_COMPLETED,
  CONFIRMATION,
}

interface CardFrameProps {
  date: {
    period: string;
    time: string;
  };
  img: string;
  imgSize?: number;
  isClicked?: boolean;
  participants: number;
  price: number;
  status: reservationStatus;
  title: string;
}

export default function CardFrame({ img, date, participants, price, status, title, imgSize = 204, isClicked = false }: CardFrameProps) {
  return (
    <div className="card flex h-[204px] w-full min-w-[344px] max-w-[792px] cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-md max-tablet:h-[156px]">
      <Image src={img} alt={`${title}-img`} width={imgSize} height={imgSize} />
      <div className="details flex w-full flex-col px-[24px] py-[25.5px] max-tablet:px-[16px] max-tablet:py-[12px] max-mobile:px-[14px]">
        <div className="status font-[16px]/[26px] font-bold">{status}</div>
        <div className="title font-[18px]/[26px] mt-[8px] font-bold">{title}</div>
        <div className="schedule font-[14px]/[24px] mt-[13px] font-normal">
          {date.period} · {date.time} · {participants}명
        </div>
        <div className="bottom-area h-[24px]h-full mt-[17px] flex items-center justify-between align-middle max-tablet:mt-[11px] max-mobile:mt-0">
          <div className="price font-[24px]/[28.64px] font-medium">₩{price}</div>
          <button
            type="button"
            className="font-[16px]/[26px] w-full max-w-[120px] rounded-[6px] border bg-[#112211] px-[12px] py-[8px] font-bold text-white hover:border-black hover:bg-white hover:text-black"
          >
            후기 작성
          </button>
        </div>
      </div>
    </div>
  );
}
