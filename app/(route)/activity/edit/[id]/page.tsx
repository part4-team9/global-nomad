// 체험 수정 페이지
import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import EditLayout from './_components/edit-layout';

function ActivityEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <CommonLayout>
      <StickyLayout>
        <EditLayout id={id} />
      </StickyLayout>
    </CommonLayout>
  );
}

export default ActivityEdit;
