// 체험 등록 페이지
import type { Metadata } from 'next';

import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import RegisterLayout from './_components/RegisterLayout';

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

export function generateMetadata(): Metadata {
  return {
    title: 'GlobalNomad | 체험 등록',
  };
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
