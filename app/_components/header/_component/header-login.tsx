import Image from 'next/image';
import alarm from 'public/assets/icons/alarm.svg';
import gnbProfileImg from 'public/assets/images/gnb-profile.png';

export default async function HeaderLogin() {
  return (
    <>
      <section className="flex gap-3 md:gap-[25px] text-m">
        <section className="py-[7px]">
          <Image src={alarm} alt="alarm" />
        </section>
        <section className="flex w-[104px] justify-between gap-[10px] border-l-[1px] border-gray-200 pl-3 md:pl-[25px]">
          <div className="w-8 overflow-hidden rounded-full">
            <Image src={gnbProfileImg} alt="profile image" />
          </div>
          <div className="py-[5px]">
            정만철
            {/* 추후 userName으로 변경 */}
          </div>
        </section>
      </section>
    </>
  );
}
