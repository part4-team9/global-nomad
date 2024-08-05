/* eslint-disable typescript-sort-keys/interface */
// 체험 수정 페이지
import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import ActivityEditForm from './_components/activity-edit-form';

function ActivityRegister({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <CommonLayout>
      <StickyLayout>
        <ActivityEditForm id={id} title="내 체험 수정" buttonTitle="수정하기" />
      </StickyLayout>
    </CommonLayout>
  );
}

export default ActivityRegister;
