import { cva } from 'class-variance-authority';

import type { ContentsType, ExperienceContents, ReservationContents } from '@/_types/card';
import { ContentType } from '@/_types/card';

import { cn } from '@/_utils/classNames';

const ContentsWrapperVariants = cva('px-6 tablet:pl-3 tablet:pr-[18px] mobile:pl-2 mobile:pr-[14px]', {
  variants: {
    type: {
      reservation: 'pt-[25.5px] pb-[24.5px] tablet:py-3 mobile:py-[9px]',
      experience: 'pt-[21px] pb-5 tablet:py-3',
    },
  },
});

function ReservationContent({ contents }: { contents: ReservationContents }) {
  return (
    <div className={cn(ContentsWrapperVariants({ type: contents.type }))}>
      <p>{contents.title}</p>
      <p>Status: {contents.status}</p>
      <p>Period: {contents.period}</p>
      <p>Price: ${contents.price}</p>
      {contents.button}
    </div>
  );
}

function ExperienceContent({ contents }: { contents: ExperienceContents }) {
  return (
    <div className={cn(ContentsWrapperVariants({ type: contents.type }))}>
      <p>{contents.title}</p>
      <p>Rating: {contents.rating} / 5</p>
      <p>Price: ${contents.price}</p>
      {contents.button}
    </div>
  );
}

export default function ContentWrapper({ contents }: { contents: ContentsType }) {
  switch (contents.type) {
    case ContentType.Reservation:
      return <ReservationContent contents={contents} />;
    case ContentType.Experience:
      return <ExperienceContent contents={contents} />;
    default:
      return <div>Invalid content type</div>;
  }
}
