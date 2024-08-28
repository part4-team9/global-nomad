import React from 'react';

import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import RegisterStatusLayout from './_component/RegisterStatusLayout';


export default function RegisterStatus() {
  return (
    <CommonLayout>
      <StickyLayout>
        <RegisterStatusLayout />
      </StickyLayout>
    </CommonLayout>
  );
}
