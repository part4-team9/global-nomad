/**
 * 체험 등록 페이지
 */
import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import RegisterLayout from './_components/RegisterLayout';

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
