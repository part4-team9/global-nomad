import Image from 'next/image';
import alarm from 'public/assets/icons/alarm.svg';
import gnbProfileImg from 'public/assets/images/gnb-profile.png';

export default async function HeaderLogin() {
  return (
    <>
      <div className="text-m flex">
        <div className="my-[7px] pr-3 md:pr-[25px] border-r-[1px] border-gray-200">
          <Image src={alarm} alt="alarm" />
        </div>
        <div className="flex justify-between gap-[10px] ml-3 md:ml-[25px]">
          <div className="w-8 h-8 overflow-hidden rounded-full">
            <Image src={gnbProfileImg} alt="profile image" />
          </div>
          <div className="py-[5px]">
            정만철
            {/* 추후 userName으로 변경 */}
          </div>
        </div>
      </div>
    </>
  );
}
