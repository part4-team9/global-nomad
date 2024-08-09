import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { cn } from '@/_utils/classNames';

const CardFrameVariants = cva(
  'flex h-[204px] w-full min-w-[344px] max-w-[792px] cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] max-tablet:h-[156px]',
  {
    variants: {
      type: {
        reservation: '',
        experience: '',
      },
    },
  },
);

export enum ContentType {
  Experience = 'experience',
  Reservation = 'reservation',
}

interface ReservationContents {
  button: React.ReactNode;
  period: string;
  price: number;
  status: string;
  title: string;
  type: ContentType.Reservation;
}

interface ExperienceContents {
  button: React.ReactNode;
  price: number;
  rating: number;
  title: string;
  type: ContentType.Experience;
}

type ContentsType = ReservationContents | ExperienceContents;

interface CardFrameProps<T extends ContentsType> {
  contents: T;
  img: string;
}

function ReservationContent({ contents }: { contents: ReservationContents }) {
  return (
    <div>
      <h2>{contents.title}</h2>
      <p>Status: {contents.status}</p>
      <p>Period: {contents.period}</p>
      <p>Price: ${contents.price}</p>
      {contents.button}
    </div>
  );
}

function ExperienceContent({ contents }: { contents: ExperienceContents }) {
  return (
    <div>
      <h2>{contents.title}</h2>
      <p>Rating: {contents.rating} / 5</p>
      <p>Price: ${contents.price}</p>
      {contents.button}
    </div>
  );
}

function ContentWrapper({ contents }: { contents: ContentsType }) {
  switch (contents.type) {
    case ContentType.Reservation:
      return <ReservationContent contents={contents} />;
    case ContentType.Experience:
      return <ExperienceContent contents={contents} />;
    default:
      return <div>Invalid content type.</div>;
  }
}

export default function CardFrame<T extends ContentsType>({ contents, img }: CardFrameProps<T>) {
  return (
    <div className={cn(CardFrameVariants({ type: contents.type }))}>
      <div className="relative">
        <Image src={img} alt={`${contents.title} img`} layout="fill" objectFit="cover" />
      </div>
      <ContentWrapper contents={contents} />
    </div>
  );
}
