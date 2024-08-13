import React from 'react';

import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import RegisterStatusLayout from './_component/RegisterStatusLayout';

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

export default function RegisterStatus() {
  return (
    <CommonLayout>
      <StickyLayout>
        <RegisterStatusLayout />
      </StickyLayout>
    </CommonLayout>
  );
}
