import Button from '@/_components/button';
import { ReservationCardProps } from '@/_types';

export default function CardPending({nickname, headCount}: ReservationCardProps) {
  return (
    <div className="mt-4 w-[381px] border p-4">
      <div className="flex gap-[10px]">
        <p className="text-lg text-gray-600">닉네임</p>
        <p className="text-lg">{nickname}</p>
      </div>
      <div className="flex gap-[10px]">
        <p className="text-lg text-gray-600">인원</p>
        <p className="text-lg">{headCount}명</p>
      </div>
      <div className="text-right font-SpoqaHanSans">
        <Button className="text-md px-[15px] py-[10px]" variant="black">
          승인하기
        </Button>
        <Button className="text-md ml-[6px] px-[15px] py-[10px]" variant="white">
          거절하기
        </Button>
      </div>
    </div>
  );
}
