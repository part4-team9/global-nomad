import type { SubImage } from '@/_apis/activities/getActivity';

import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import EditLayout from './_components/edit-layout';
import type { Schedule } from '../../register/page';

export interface EditSchedule {
  date: string;
  endTime: string;
  id?: number;
  startTime: string;
}

export interface EditDetail {
  schedules: EditSchedule[];
  subImages: SubImage[];
}

export interface ActivityEdit {
  address: string;
  bannerImageUrl: string;
  category: string;
  description: string;
  price: number | '';
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  title: string;
}

/**
 * 체험 수정 페이지
 */
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
