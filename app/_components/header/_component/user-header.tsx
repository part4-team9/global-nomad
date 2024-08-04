import Image from 'next/image';
import gnbProfileImg from 'public/assets/images/gnb-profile.png';

import alarm from 'public/assets/icons/alarm.svg';

export default function UserHeader() {
  return (
    <div className="flex text-m">
      <div className="my-[7px] border-r-[1px] border-gray-200 pr-3 md:pr-[25px]">
        <Image src={alarm} alt="alarm" />
      </div>
      <div className="ml-3 flex justify-between gap-[10px] md:ml-[25px]">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image src={gnbProfileImg} alt="profile image" />
        </div>
        <div className="py-[5px]">
          정만철
          {/* 로그인 상태에 따른 헤더 변경 기능 추가할 것 */}
        </div>
      </div>
    </div>
  );
}
