import { cva } from 'class-variance-authority';

import type { ActivitiesContents, ContentsType, ReservationContents } from '@/_types/card';
import { ContentType, ReservationStatus } from '@/_types/card';

import { cn } from '@/_utils/classNames';
import { formatDate, formatNumberWithCommas, formatTimeRange } from '@/_utils/format';

const contentsWrapperVariants = cva('w-full px-6 tablet:pl-3 tablet:pr-[18px] mobile:pl-2 mobile:pr-[14px]', {
  variants: {
    type: {
      reservation: 'pb-[24.5px] pt-[25.5px] tablet:py-3 mobile:py-[9px]',
      activities: 'flex flex-col justify-between pb-5 pt-[21px] tablet:py-3',
    },
  },
});

const statusVariants = cva('mb-2 text-base/6.5 font-bold tablet:mb-0 mobile:text-sm/6.5', {
  variants: {
    status: {
      [ReservationStatus.Approved]: 'text-orange-500', // 예약 승인
      [ReservationStatus.Canceled]: 'text-gray-600', // 예약 취소
      [ReservationStatus.Completed]: 'text-gray-600', // 체험 완료
      [ReservationStatus.Confirmed]: 'text-blue-200', // 예약 완료
      [ReservationStatus.Refusal]: 'text-red-500', // 예약 거절
    },
  },
});

const titleStyle = cn('mb-[13px] truncate text-xl/6.5 font-bold tablet:mb-[5px] tablet:text-lg/6 mobile:mb-0 mobile:text-sm/6');
const btnAreaStyle = cn('flex h-10 w-full items-center justify-between mobile:h-8');
const priceStyle = cn('text-2xl/[28.64px] font-medium tablet:text-xl/[23.87px] mobile:text-base/[19.09px]');

function toReservationStatus(status: string): ReservationStatus {
  switch (status) {
    case 'Approved':
      return ReservationStatus.Approved;
    case 'Canceled':
      return ReservationStatus.Canceled;
    case 'Completed':
      return ReservationStatus.Completed;
    case 'Confirmed':
      return ReservationStatus.Confirmed;
    case 'Refusal':
      return ReservationStatus.Refusal;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

/**
 * 예약 리스트 아이템 컴포넌트
 */
function ReservationContent({ contents }: { contents: Omit<ReservationContents, 'status'> & { status: string } }) {
  const status = toReservationStatus(contents.status);

  return (
    <div className={cn(contentsWrapperVariants({ type: contents.type }))}>
      <p className={cn(statusVariants({ status }))}>{status}</p>
      <p className={titleStyle}>{contents.title}</p>
      <div className="mb-[17px] flex items-center gap-2 whitespace-nowrap text-lg/6 font-normal tablet:mb-[10px] tablet:text-sm/6 mobile:mb-0 mobile:text-xs/6">
        <p>{formatDate(contents.period)}</p> · <p>{formatTimeRange(contents.time1, contents.time2)}</p> · <p>{contents.headCount}명</p>
      </div>
      <div className={btnAreaStyle}>
        <p className={priceStyle}>￦{formatNumberWithCommas(contents.price)}</p>
        {contents.button}
      </div>
    </div>
  );
}

/**
 * 내 체험 관리 리스트 아이템 컴포넌트
 */
function ActivitiesContent({ contents }: { contents: ActivitiesContents }) {
  return (
    <div className={cn(contentsWrapperVariants({ type: contents.type }))}>
      <div>
        {/* TODO rating 컴포넌트 적용 */}
        <p className="mb-[6px] mobile:mb-0">{contents.rating}</p>
        <p className={titleStyle}>{contents.title}</p>
      </div>

      <div className={btnAreaStyle}>
        <div className="flex items-center gap-[10px]">
          <p className={priceStyle}>￦{formatNumberWithCommas(contents.price)}</p>
          <p className="text-base/[19.09px] font-medium text-gray-700 tablet:hidden">/인</p>
        </div>
        {/* TODO button 공용 컴포넌트 적용 */}
        {contents.button}
      </div>
    </div>
  );
}

/**
 * contents type에 맞는 컨텐츠 컴포넌트를 렌더링합니다.
 * @param contents contents type (Reservation, Activities)
 * @returns contents component
 */
export default function ContentWrapper({ contents }: { contents: ContentsType }) {
  switch (contents.type) {
    case ContentType.Reservation:
      return <ReservationContent contents={contents} />;
    case ContentType.Activities:
      return <ActivitiesContent contents={contents} />;
    default:
      // TODO 에러 컴포넌트 적용
      return <div>Invalid content type</div>;
  }
}
