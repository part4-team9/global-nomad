import type { ReservationContents } from '@/_types/card';
import { ContentType } from '@/_types/card';
import type { Reservations, ReservationStatus } from '@/_types/myReservations';

import CardFrame from '@/_components/card-frame';
import { toReservationStatus } from '@/_components/card-frame/_components/card-contents-wrapper';

import CancelButton from '../CancelButton';
import ReviewButton from '../ReviewButton';

interface TransformerProps {
  data: Reservations;
}

/**
 * CardDataTransformer 컴포넌트
 *
 * 원본 예약 데이터를 받아 CardFrame 컴포넌트에 적합한 데이터 구조로 변환하여 렌더링하는 컴포넌트입니다.
 * 예약 상태에 따라 적절한 버튼(취소 버튼 또는 리뷰 버튼)을 렌더링합니다.
 *
 * @param {Reservations} props.data - 원본 예약 데이터입니다.
 * @returns {JSX.Element} 변환된 데이터를 사용하여 CardFrame 컴포넌트를 렌더링합니다.
 */

function CardDataTransformer({ data }: TransformerProps) {
  const getStatusButton = (status: ReservationStatus) => {
    if (status === 'pending') {
      return <CancelButton id={data.id} />;
    }
    if (status === 'completed' && !data.reviewSubmitted) {
      return <ReviewButton id={data.id} />;
    }
    return undefined;
  };

  const cardFrameData: ReservationContents = {
    button: getStatusButton(data.status),
    reservationId: data.id,
    headCount: data.headCount,
    period: data.date,
    price: data.totalPrice,
    status: toReservationStatus(data.status),
    time1: data.startTime,
    time2: data.endTime,
    title: data.activity.title,
    type: ContentType.Reservation,
  };

  return <CardFrame img={data.activity.bannerImageUrl} contents={cardFrameData} />;
}

export default CardDataTransformer;
