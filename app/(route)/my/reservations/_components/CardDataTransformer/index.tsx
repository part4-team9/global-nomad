import type { ReservationContents } from '@/_types/card';
import { ContentType } from '@/_types/card';
import type { Reservations } from '@/_types/myReservations';

import CardFrame from '@/_components/card-frame';
import { toReservationStatus } from '@/_components/card-frame/_components/card-contents-wrapper';

interface TransformerProps {
  data: Reservations;
}

function CardDataTransformer({ data }: TransformerProps) {
  const cardFrameData: ReservationContents = {
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
