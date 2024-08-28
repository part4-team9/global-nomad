'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ActivitiesResponse, Activity } from '@/_types';
import type { ActivitiesContents } from '@/_types/card';
import { ContentType } from '@/_types/card';

import { deleteActivity, getMyActivities } from '@/_libs/myActivitiesService';

import CardFrame from '@/_components/card-frame';
import CommonLayout from '@/_components/CommonLayout';
import NoReservation from '@/_components/NoReservation';
import StickyLayout from '@/_components/SideStickyLayout';

export default function Page() {
  const { data: myActivities } = useQuery<ActivitiesResponse>({
    queryKey: ['myActivities'],
    queryFn: async () => getMyActivities({}),
  });
  return (
    <CommonLayout>
      <StickyLayout>
        <div className="mb-6 flex justify-between under-mobile:mb-4">
          <h2>내 체험 관리</h2>
          <Link href="/activity/register">
            <button type="button" className="rounded bg-nomad-black px-4 py-2 text-lg font-bold text-white">
              체험 등록하기
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-6 under-tablet:gap-4">
          {myActivities && myActivities.totalCount > 0 ? (
            myActivities?.activities.map((activity) => <CardDataTransfer key={activity.id} data={activity} />)
          ) : (
            <NoReservation />
          )}
        </div>
      </StickyLayout>
    </CommonLayout>
  );
}

function CardDataTransfer({ data }: { data: Activity }) {
  const cardFrameData: ActivitiesContents = {
    button: <Button id={data.id} />,
    price: data.price,
    rating: data.rating,
    title: data.title,
    reviewCount: data.reviewCount,
    type: ContentType.Activities,
  };

  return <CardFrame img={data.bannerImageUrl} contents={cardFrameData} activityId={data.id} />;
}
function Button({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (notificationId: number) => {
    try {
      await deleteActivity(notificationId);
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };
  return (
    <div className="flex flex-col justify-end">
      <button type="button" onClick={() => setOpen(!open)}>
        <Image src="/assets/icons/option-menu.svg" width={40} height={40} alt="option-btn" />
      </button>

      {open && (
        <div className="absolute right-0 top-[44px] z-50 rounded-md">
          <Link href={`/activity/edit/${id}`}>
            <button type="button" className="flex h-[58px] w-[160px] items-center justify-center border bg-white">
              수정하기
            </button>
          </Link>
          <button
            type="button"
            onClick={() => {
              handleDelete(id);
            }}
            className="flex h-[58px] w-[160px] items-center justify-center border bg-white"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
