// 체험 등록 페이지
import CommonLayout from '@/_components/common-layout';

import ActivityForm from './_components/form';

interface Schedule {
  date: string;
  endTime: string;
  startTime: string;
}

export interface Activity {
  // address: string;
  // bannerImageUrl: string;
  category: string;
  // description: string;
  // price: number;
  // schedules: Schedule[];
  // subImageUrls?: string[];
  title: string;
}

function ActivityRegister() {
  return (
    <CommonLayout>
      <section>
        <ActivityForm title="내 체험 등록" buttonTitle="등록하기" />
      </section>
    </CommonLayout>
  );
}

export default ActivityRegister;
