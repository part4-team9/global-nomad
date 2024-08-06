// 체험 등록 페이지
import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import RegisterLayout from './_components/register-layout';

export interface Schedule {
  date: string;
  endTime: string;
  startTime: string;
}

export interface Activity {
  address: string;
  bannerImageUrl: string;
  category: string;
  description: string;
  price: number | '';
  schedules: Schedule[];
  subImageUrls?: string[];
  title: string;
}

function ActivityRegister() {
  return (
    <CommonLayout>
      <StickyLayout>
        <RegisterLayout />
      </StickyLayout>
    </CommonLayout>
  );
}

export default ActivityRegister;
